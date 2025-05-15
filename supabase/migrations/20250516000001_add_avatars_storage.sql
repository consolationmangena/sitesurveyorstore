-- Create avatars bucket
INSERT INTO storage.buckets (id, name)
VALUES ('avatars', 'avatars')
ON CONFLICT DO NOTHING;

-- Set up storage policies for avatars bucket
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid() = (regexp_match(name, '^profiles/([^/]+)/'))[1]::uuid
  );

-- Only allow image file types
CREATE POLICY "Only allow image file types"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND (regexp_match(name, '.*\.(jpg|jpeg|png|gif)$'))[1] IS NOT NULL
  );
