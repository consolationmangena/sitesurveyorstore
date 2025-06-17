/*
  # Fix profiles table username column

  1. Changes
    - Make username column nullable initially
    - Add default value for existing records
    - Update the constraint to allow proper profile creation
  
  2. Security
    - Maintain existing RLS policies
    - Ensure username uniqueness where provided
*/

-- First, make username nullable and add default
DO $$
BEGIN
  -- Check if username column exists and modify it
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    -- Make username nullable and add default
    ALTER TABLE profiles ALTER COLUMN username DROP NOT NULL;
    ALTER TABLE profiles ALTER COLUMN username SET DEFAULT '';
  ELSE
    -- Add username column if it doesn't exist
    ALTER TABLE profiles ADD COLUMN username text UNIQUE DEFAULT '';
  END IF;
END $$;

-- Update any existing profiles that might have empty usernames
UPDATE profiles 
SET username = COALESCE(username, '')
WHERE username IS NULL OR username = '';

-- Add index for username lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Update the auth trigger function to handle profile creation properly
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();