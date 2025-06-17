/*
  # Add username column to profiles table

  1. Changes
    - Add `username` column to `profiles` table
    - Make it unique and not null
    - Add index for performance
  
  2. Security
    - No changes to existing RLS policies needed
    - Username will be accessible through existing policies
*/

-- Add username column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'username'
  ) THEN
    ALTER TABLE profiles ADD COLUMN username text UNIQUE NOT NULL DEFAULT '';
  END IF;
END $$;

-- Add index for username lookups
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);