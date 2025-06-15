
-- Create a table to store app information and updates
CREATE TABLE public.apps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  repo_url TEXT NOT NULL,
  icon TEXT DEFAULT 'map',
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  version TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  author TEXT,
  license TEXT DEFAULT 'MIT',
  homepage_url TEXT,
  documentation_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  requirements TEXT,
  installation_notes TEXT
);

-- Create an index on name for faster searches
CREATE INDEX idx_apps_name ON public.apps(name);

-- Create an index on category for filtering
CREATE INDEX idx_apps_category ON public.apps(category);

-- Create an index on tags for tag-based searches
CREATE INDEX idx_apps_tags ON public.apps USING GIN(tags);

-- Create an index on is_active for filtering active apps
CREATE INDEX idx_apps_active ON public.apps(is_active);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at when a row is modified
CREATE TRIGGER update_apps_updated_at 
    BEFORE UPDATE ON public.apps
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data to get you started
INSERT INTO public.apps (name, description, repo_url, icon, tags, category, version, author) VALUES
('Site Survey Tool', 'A comprehensive tool for site surveying and mapping in the field', 'https://github.com/sitesurveyor/survey-tool', 'map', ARRAY['surveying', 'mapping', 'gis'], 'Field Tools', '1.0.0', 'SiteSurveyor Team'),
('GIS Data Viewer', 'View and analyze GIS data with this powerful viewer application', 'https://github.com/sitesurveyor/gis-viewer', 'database', ARRAY['gis', 'data', 'visualization'], 'Data Analysis', '2.1.0', 'SiteSurveyor Team'),
('Photo Mapper', 'Geo-tag and organize field photos with GPS coordinates', 'https://github.com/sitesurveyor/photo-mapper', 'camera', ARRAY['photography', 'gps', 'field-work'], 'Documentation', '1.5.0', 'SiteSurveyor Team');

-- Enable Row Level Security (RLS) - apps will be publicly readable but only admins can modify
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Apps are publicly readable" 
  ON public.apps 
  FOR SELECT 
  USING (is_active = true);

-- Create policy for authenticated users to insert/update (you can modify this based on your needs)
CREATE POLICY "Authenticated users can manage apps" 
  ON public.apps 
  FOR ALL 
  TO authenticated 
  USING (true);
