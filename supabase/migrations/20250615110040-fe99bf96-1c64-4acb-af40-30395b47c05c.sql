
-- Create a table to store solution requests
CREATE TABLE public.solution_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  problem TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.solution_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read all solution requests
CREATE POLICY "Public can read solution requests" 
  ON public.solution_requests
  FOR SELECT
  USING (true);

-- Allow anyone to insert new solution requests
CREATE POLICY "Public can insert solution requests"
  ON public.solution_requests
  FOR INSERT
  WITH CHECK (true);

