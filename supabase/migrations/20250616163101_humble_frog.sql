/*
  # Insert sample data for SiteSurveyor platform

  1. Categories
    - Insert predefined application categories with icons and colors
  
  2. Applications
    - Insert sample applications (both open source and pro)
    - Set up proper relationships with categories
    - Configure pricing, features, and metadata
  
  3. Blog Posts
    - Insert sample blog posts with authors and content
    - Set up featured posts and engagement metrics
*/

-- Insert categories
INSERT INTO categories (name, description, icon, color) VALUES
  ('Field Tools', 'Mobile and field data collection tools', 'map', 'blue'),
  ('Data Analysis', 'GIS and spatial analysis applications', 'database', 'green'),
  ('Documentation', 'Photo mapping and documentation tools', 'camera', 'purple'),
  ('Utilities', 'Coordinate conversion and utility tools', 'tool', 'orange'),
  ('Land Management', 'Property and land management solutions', 'home', 'red'),
  ('Remote Sensing', 'Drone and satellite imagery processing', 'satellite', 'indigo')
ON CONFLICT (name) DO NOTHING;

-- Insert sample applications
DO $$
DECLARE
  field_tools_id uuid;
  data_analysis_id uuid;
  documentation_id uuid;
  utilities_id uuid;
  land_mgmt_id uuid;
  remote_sensing_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO field_tools_id FROM categories WHERE name = 'Field Tools';
  SELECT id INTO data_analysis_id FROM categories WHERE name = 'Data Analysis';
  SELECT id INTO documentation_id FROM categories WHERE name = 'Documentation';
  SELECT id INTO utilities_id FROM categories WHERE name = 'Utilities';
  SELECT id INTO land_mgmt_id FROM categories WHERE name = 'Land Management';
  SELECT id INTO remote_sensing_id FROM categories WHERE name = 'Remote Sensing';

  -- Insert applications
  INSERT INTO applications (
    name, description, category_id, app_type, price, version, author_name, 
    homepage_url, repo_url, download_count, icon, tags, features, 
    is_active, is_featured
  ) VALUES
  (
    'Site Survey Tool',
    'A comprehensive tool for site surveying and mapping in the field with GPS integration and offline capabilities.',
    field_tools_id,
    'open_source',
    0,
    '1.0.0',
    'SiteSurveyor Team',
    'https://sitesurveyor.com/survey-tool',
    'https://github.com/sitesurveyor/survey-tool',
    245,
    'map',
    ARRAY['surveying', 'mapping', 'gis', 'field-work'],
    ARRAY['GPS Integration', 'Offline Mapping', 'Data Export', 'Basic Reporting'],
    true,
    true
  ),
  (
    'GIS Data Viewer',
    'View and analyze GIS data with this powerful viewer application supporting multiple file formats.',
    data_analysis_id,
    'open_source',
    0,
    '2.1.0',
    'SiteSurveyor Team',
    'https://sitesurveyor.com/gis-viewer',
    'https://github.com/sitesurveyor/gis-viewer',
    189,
    'database',
    ARRAY['gis', 'data', 'visualization', 'analysis'],
    ARRAY['Multiple Format Support', 'Basic Visualization', 'Data Import/Export', 'Layer Management'],
    true,
    false
  ),
  (
    'Photo Mapper',
    'Geo-tag and organize field photos with GPS coordinates for better documentation and analysis.',
    documentation_id,
    'open_source',
    0,
    '1.5.0',
    'SiteSurveyor Team',
    'https://sitesurveyor.com/photo-mapper',
    'https://github.com/sitesurveyor/photo-mapper',
    312,
    'camera',
    ARRAY['photography', 'gps', 'field-work', 'documentation'],
    ARRAY['GPS Geotagging', 'Photo Organization', 'Basic Metadata', 'Export Options'],
    true,
    false
  ),
  (
    'Coordinate Converter Pro',
    'Professional-grade coordinate system converter with advanced precision calculations and batch processing capabilities.',
    utilities_id,
    'pro',
    149.99,
    '2.5.1',
    'GeoTools Africa',
    'https://geotools.africa/coord-converter-pro',
    null,
    89,
    'database',
    ARRAY['coordinates', 'conversion', 'precision', 'surveying', 'professional'],
    ARRAY['Basic Coordinate Conversion', 'Standard Datum Support', 'Single Point Processing'],
    true,
    true
  ),
  (
    'Land Parcel Manager Pro',
    'Enterprise land management solution with advanced boundary mapping, ownership tracking, and legal documentation features.',
    land_mgmt_id,
    'pro',
    299.99,
    '4.2.0',
    'LandTech Solutions',
    'https://landtech.solutions/parcel-manager-pro',
    null,
    156,
    'map',
    ARRAY['land-management', 'parcels', 'boundaries', 'property', 'enterprise'],
    ARRAY['Basic Parcel Mapping', 'Simple Boundary Tools', 'Basic Reporting'],
    true,
    false
  ),
  (
    'DroneView Analytics Pro',
    'AI-powered drone image analysis with machine learning algorithms for advanced photogrammetry and automated feature detection.',
    remote_sensing_id,
    'pro',
    499.99,
    '3.1.2',
    'AeroTech Solutions',
    'https://aerotech.solutions/droneview-pro',
    null,
    67,
    'camera',
    ARRAY['ai', 'drones', 'photogrammetry', 'machine-learning', 'professional'],
    ARRAY['Basic Image Processing', 'Simple Orthomosaic Generation', 'Standard 3D Models'],
    true,
    true
  );

  -- Update pro features for pro applications
  UPDATE applications SET pro_features = ARRAY[
    'Batch Processing (1000+ points)',
    'Custom Datum Creation',
    'Advanced Precision Algorithms',
    'API Integration',
    'Priority Support',
    'Advanced Reporting',
    'Cloud Sync',
    'Team Collaboration'
  ] WHERE name = 'Coordinate Converter Pro';

  UPDATE applications SET pro_features = ARRAY[
    'Advanced CAD Integration',
    'Legal Document Generation',
    'Multi-user Collaboration',
    'Advanced Analytics',
    'Custom Workflows',
    'API Access',
    'Priority Support',
    'Data Migration Tools',
    'Compliance Reporting',
    'Cloud Backup'
  ] WHERE name = 'Land Parcel Manager Pro';

  UPDATE applications SET pro_features = ARRAY[
    'AI-Powered Feature Detection',
    'Advanced Machine Learning Models',
    'Automated Quality Control',
    'High-Resolution Processing',
    'Custom AI Training',
    'Batch Processing',
    'Cloud Processing',
    'Advanced Analytics',
    'API Integration',
    'Priority Support'
  ] WHERE name = 'DroneView Analytics Pro';

  -- Set trial availability for pro apps
  UPDATE applications SET trial_available = true, trial_days = 14 WHERE name = 'Coordinate Converter Pro';
  UPDATE applications SET trial_available = true, trial_days = 30 WHERE name = 'Land Parcel Manager Pro';
  UPDATE applications SET trial_available = true, trial_days = 7 WHERE name = 'DroneView Analytics Pro';
END $$;

-- Insert sample blog posts
INSERT INTO blog_posts (
  title, slug, excerpt, content, author_name, author_role, author_bio,
  category, tags, featured_image, is_featured, is_published, 
  view_count, like_count, comment_count, read_time, published_at
) VALUES
(
  'The Future of AI in African Geomatics: Transforming Surveying with Machine Learning',
  'future-ai-african-geomatics',
  'Discover how artificial intelligence is revolutionizing geomatics workflows across Africa, from automated feature detection to predictive terrain modeling.',
  '<h2>Introduction</h2><p>Artificial Intelligence is reshaping the geomatics landscape across Africa, offering unprecedented opportunities to automate complex surveying tasks and improve accuracy...</p>',
  'Consolation Mangena',
  'Founder & Lead Developer',
  'Consolation is a geomatics student at Midlands State University and the founder of SiteSurveyor.',
  'Technology',
  ARRAY['AI', 'Machine Learning', 'Surveying', 'Innovation'],
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
  true,
  true,
  2847,
  156,
  23,
  '8 min read',
  '2024-03-15T10:00:00Z'
),
(
  'Open Source vs Premium: Choosing the Right Geomatics Tools for Your Project',
  'open-source-vs-premium-geomatics-tools',
  'A comprehensive comparison of open-source and premium geomatics solutions, helping you make informed decisions for your surveying projects.',
  '<h2>Introduction</h2><p>The choice between open-source and premium geomatics tools can significantly impact your project success and budget...</p>',
  'Dr. Sarah Mukamuri',
  'GIS Specialist',
  'Dr. Mukamuri is a GIS specialist with over 15 years of experience in both open source and commercial geomatics solutions.',
  'Guide',
  ARRAY['Open Source', 'Premium', 'Tools', 'Decision Making'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  false,
  true,
  1923,
  89,
  15,
  '6 min read',
  '2024-03-12T09:00:00Z'
),
(
  'Blockchain Technology in Land Management: Securing Property Rights in Zimbabwe',
  'blockchain-land-management-zimbabwe',
  'Exploring how blockchain technology is being used to create transparent, tamper-proof land registry systems across Zimbabwe and Africa.',
  '<h2>Introduction</h2><p>Blockchain technology offers a revolutionary approach to land management, providing immutable records and transparent transactions...</p>',
  'James Chikwanha',
  'Blockchain Developer',
  'James specializes in blockchain applications for land management and has worked on several pilot projects across Africa.',
  'Innovation',
  ARRAY['Blockchain', 'Land Management', 'Security', 'Zimbabwe'],
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop',
  true,
  true,
  3156,
  201,
  34,
  '10 min read',
  '2024-03-10T14:00:00Z'
);