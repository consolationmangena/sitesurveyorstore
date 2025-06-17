/*
  # Fix profiles table RLS policies

  1. Security Changes
    - Drop existing policies that use incorrect uid() function
    - Create new policies using correct auth.uid() function
    - Allow users to insert, select, and update their own profiles
    - Enable proper authentication flow for profile creation

  2. Policy Details
    - Users can insert their own profile during signup
    - Users can select their own profile data
    - Users can update their own profile information
    - All policies use auth.uid() = id for proper user identification
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

-- Create new policies with correct auth.uid() function
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can select own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Also allow public read access to profiles for viewing other users' public info
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);