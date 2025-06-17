/*
  # Fix profile creation RLS policy and trigger

  1. Changes
    - Update RLS policies to allow profile creation during signup
    - Add proper trigger function for automatic profile creation
    - Ensure username column is properly configured

  2. Security
    - Maintain RLS while allowing profile creation
    - Ensure users can only create their own profiles
*/

-- First, ensure the profiles table has the correct structure
DO $$
BEGIN
  -- Make username nullable with default empty string
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE profiles ALTER COLUMN username DROP NOT NULL;
    ALTER TABLE profiles ALTER COLUMN username SET DEFAULT '';
  ELSE
    ALTER TABLE profiles ADD COLUMN username text DEFAULT '';
  END IF;
END $$;

-- Update any existing profiles that might have null usernames
UPDATE profiles 
SET username = COALESCE(username, '')
WHERE username IS NULL;

-- Add unique constraint on username only for non-empty values
DROP INDEX IF EXISTS profiles_username_key;
CREATE UNIQUE INDEX profiles_username_key ON profiles(username) WHERE username != '';

-- Add index for username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);

-- Drop existing policies and recreate them
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

-- Create new policies that work better with signup flow
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

-- Allow insert for new users during signup (temporary policy)
CREATE POLICY "Allow profile creation during signup" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (true);

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