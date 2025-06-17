/*
  # Fix profile creation and RLS policies

  1. Changes
    - Fix username column constraints
    - Update RLS policies for proper signup flow
    - Add trigger for automatic profile creation
    - Handle existing constraints properly

  2. Security
    - Maintain RLS while allowing profile creation during signup
    - Ensure users can only manage their own profiles
*/

-- First, ensure the profiles table has the correct structure
DO $$
BEGIN
  -- Check if username column exists and handle constraints
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    -- Drop the unique constraint if it exists
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE table_name = 'profiles' AND constraint_name = 'profiles_username_key'
    ) THEN
      ALTER TABLE profiles DROP CONSTRAINT profiles_username_key;
    END IF;
    
    -- Make username nullable
    ALTER TABLE profiles ALTER COLUMN username DROP NOT NULL;
    ALTER TABLE profiles ALTER COLUMN username SET DEFAULT '';
  ELSE
    -- Add username column if it doesn't exist
    ALTER TABLE profiles ADD COLUMN username text DEFAULT '';
  END IF;
END $$;

-- Update any existing profiles that might have null usernames
UPDATE profiles 
SET username = COALESCE(username, '')
WHERE username IS NULL;

-- Create unique constraint on username only for non-empty values
CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_unique_idx ON profiles(username) WHERE username != '';

-- Add index for username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Allow profile creation during signup" ON profiles;

-- Create new policies that work better with signup flow
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can view all profiles" ON profiles
    FOR SELECT TO authenticated
    USING (true);

-- Create or replace the trigger function for automatic profile creation
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
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger and recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;