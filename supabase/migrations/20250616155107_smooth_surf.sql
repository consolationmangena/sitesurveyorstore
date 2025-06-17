/*
  # Seed Sample Data for SiteSurveyor

  This migration adds sample data to test the application:
  - Categories for applications
  - Sample applications (open source and pro)
  - Sample blog posts
  - Test data for development
*/

-- ==================== CATEGORIES ====================

INSERT INTO categories (name, description, icon, color) VALUES
  ('Field Tools', 'Mobile and field data collection tools', 'map-pin', 'bg-green-100 text-green-800'),
  ('Data Analysis', 'GIS and spatial analysis applications', 'bar-chart', 'bg-blue-100 text-blue-800'),
  ('Documentation', 'Photo mapping and documentation tools', 'camera', 'bg-purple-100 text-purple-800'),
  ('Utilities', 'Coordinate conversion and utility tools', 'settings', 'bg-orange-100 text-orange-800'),
  ('Land Management', 'Property and land management systems', 'home', 'bg-indigo-100 text-indigo-800'),
  ('Remote Sensing', 'Drone and satellite imagery processing', 'satellite', 'bg-pink-100 text-pink-800')
ON CONFLICT (name) DO NOTHING;

-- ==================== APPLICATIONS ====================

-- Get category IDs for reference
DO $$
DECLARE
  field_tools_id uuid;
  data_analysis_id uuid;
  documentation_id uuid;
  utilities_id uuid;
  land_mgmt_id uuid;
  remote_sensing_id uuid;
BEGIN
  SELECT id INTO field_tools_id FROM categories WHERE name = 'Field Tools';
  SELECT id INTO data_analysis_id FROM categories WHERE name = 'Data Analysis';
  SELECT id INTO documentation_id FROM categories WHERE name = 'Documentation';
  SELECT id INTO utilities_id FROM categories WHERE name = 'Utilities';
  SELECT id INTO land_mgmt_id FROM categories WHERE name = 'Land Management';
  SELECT id INTO remote_sensing_id FROM categories WHERE name = 'Remote Sensing';

  -- Open Source Applications
  INSERT INTO applications (
    name, description, category_id, app_type, author_name, license, 
    homepage_url, repo_url, icon, tags, features, download_count, is_featured
  ) VALUES
  (
    'Site Survey Tool',
    'A comprehensive tool for site surveying and mapping in the field with GPS integration and offline capabilities.',
    field_tools_id,
    'open_source',
    'SiteSurveyor Team',
    'Apache-2.0',
    'https://sitesurveyor.com/survey-tool',
    'https://github.com/sitesurveyor/survey-tool',
    'map',
    ARRAY['surveying', 'mapping', 'gis', 'field-work'],
    ARRAY['GPS Integration', 'Offline Mapping', 'Data Export', 'Basic Reporting'],
    1250,
    true
  ),
  (
    'GIS Data Viewer',
    'View and analyze GIS data with this powerful viewer application supporting multiple file formats.',
    data_analysis_id,
    'open_source',
    'SiteSurveyor Team',
    'Apache-2.0',
    'https://sitesurveyor.com/gis-viewer',
    'https://github.com/sitesurveyor/gis-viewer',
    'database',
    ARRAY['gis', 'data', 'visualization', 'analysis'],
    ARRAY['Multiple Format Support', 'Basic Visualization', 'Data Import/Export', 'Layer Management'],
    890,
    false
  ),
  (
    'Photo Mapper',
    'Geo-tag and organize field photos with GPS coordinates for better documentation and analysis.',
    documentation_id,
    'open_source',
    'SiteSurveyor Team',
    'Apache-2.0',
    'https://sitesurveyor.com/photo-mapper',
    'https://github.com/sitesurveyor/photo-mapper',
    'camera',
    ARRAY['photography', 'gps', 'field-work', 'documentation'],
    ARRAY['GPS Geotagging', 'Photo Organization', 'Basic Metadata', 'Export Options'],
    1560,
    false
  );

  -- Professional Applications
  INSERT INTO applications (
    name, description, category_id, app_type, price, trial_available, trial_days,
    author_name, license, homepage_url, icon, tags, features, pro_features, 
    download_count, is_featured
  ) VALUES
  (
    'Coordinate Converter Pro',
    'Professional-grade coordinate system converter with advanced precision calculations and batch processing capabilities.',
    utilities_id,
    'pro',
    149.99,
    true,
    14,
    'GeoTools Africa',
    'Commercial',
    'https://geotools.africa/coord-converter-pro',
    'database',
    ARRAY['coordinates', 'conversion', 'precision', 'surveying', 'professional'],
    ARRAY['Basic Coordinate Conversion', 'Standard Datum Support', 'Single Point Processing'],
    ARRAY['Batch Processing (1000+ points)', 'Custom Datum Creation', 'Advanced Precision Algorithms', 'API Integration', 'Priority Support', 'Advanced Reporting', 'Cloud Sync', 'Team Collaboration'],
    156,
    true
  ),
  (
    'Land Parcel Manager Pro',
    'Enterprise land management solution with advanced boundary mapping, ownership tracking, and legal documentation features.',
    land_mgmt_id,
    'pro',
    299.99,
    true,
    30,
    'LandTech Solutions',
    'Commercial',
    'https://landtech.solutions/parcel-manager-pro',
    'map',
    ARRAY['land-management', 'parcels', 'boundaries', 'property', 'enterprise'],
    ARRAY['Basic Parcel Mapping', 'Simple Boundary Tools', 'Basic Reporting'],
    ARRAY['Advanced CAD Integration', 'Legal Document Generation', 'Multi-user Collaboration', 'Advanced Analytics', 'Custom Workflows', 'API Access', 'Priority Support', 'Data Migration Tools', 'Compliance Reporting', 'Cloud Backup'],
    89,
    false
  ),
  (
    'DroneView Analytics Pro',
    'AI-powered drone image analysis with machine learning algorithms for advanced photogrammetry and automated feature detection.',
    remote_sensing_id,
    'pro',
    499.99,
    true,
    7,
    'AeroTech Solutions',
    'Commercial',
    'https://aerotech.solutions/droneview-pro',
    'camera',
    ARRAY['ai', 'drones', 'photogrammetry', 'machine-learning', 'professional'],
    ARRAY['Basic Image Processing', 'Simple Orthomosaic Generation', 'Standard 3D Models'],
    ARRAY['AI-Powered Feature Detection', 'Advanced Machine Learning Models', 'Automated Quality Control', 'High-Resolution Processing', 'Custom AI Training', 'Batch Processing', 'Cloud Processing', 'Advanced Analytics', 'API Integration', 'Priority Support'],
    67,
    true
  );
END $$;

-- ==================== BLOG POSTS ====================

INSERT INTO blog_posts (
  title, slug, excerpt, content, featured_image, category, tags, 
  author_name, author_role, author_bio, author_avatar, read_time,
  is_featured, is_published, published_at
) VALUES
(
  'The Future of AI in African Geomatics: Transforming Surveying with Machine Learning',
  'ai-african-geomatics-machine-learning',
  'Discover how artificial intelligence is revolutionizing geomatics workflows across Africa, from automated feature detection to predictive terrain modeling.',
  '<h2>Introduction</h2><p>Artificial Intelligence is reshaping the geomatics landscape across Africa, offering unprecedented opportunities to automate complex surveying tasks and improve accuracy. In this comprehensive guide, we explore how machine learning algorithms are being integrated into modern surveying workflows.</p><h2>The Current State of AI in Geomatics</h2><p>The integration of AI in geomatics has accelerated dramatically over the past five years. From automated feature detection in satellite imagery to predictive modeling for terrain analysis, AI is transforming how we collect, process, and analyze spatial data.</p>',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
  'Technology',
  ARRAY['AI', 'Machine Learning', 'Surveying', 'Innovation'],
  'Consolation Mangena',
  'Founder & Lead Developer',
  'Consolation is a geomatics student at Midlands State University and the founder of SiteSurveyor.',
  '/profile.jpg',
  '8 min read',
  true,
  true,
  '2024-03-15T10:00:00Z'
),
(
  'Open Source vs Premium: Choosing the Right Geomatics Tools',
  'open-source-vs-premium-geomatics-tools',
  'A comprehensive comparison of open-source and premium geomatics solutions, helping you make informed decisions for your surveying projects.',
  '<h2>Introduction</h2><p>The choice between open-source and premium geomatics tools can significantly impact your project success and budget. This detailed analysis examines the pros and cons of each approach.</p><h2>Understanding the Landscape</h2><p>The geomatics software landscape has evolved dramatically over the past decade. Traditional proprietary solutions now compete with sophisticated open-source alternatives.</p>',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
  'Guide',
  ARRAY['Open Source', 'Premium', 'Tools', 'Decision Making'],
  'Dr. Sarah Mukamuri',
  'GIS Specialist',
  'Dr. Mukamuri is a GIS specialist with over 15 years of experience in both open source and commercial geomatics solutions.',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  '6 min read',
  false,
  true,
  '2024-03-12T09:00:00Z'
),
(
  'Blockchain Technology in Land Management: Securing Property Rights',
  'blockchain-land-management-property-rights',
  'Exploring how blockchain technology is being used to create transparent, tamper-proof land registry systems across Zimbabwe and Africa.',
  '<h2>Introduction</h2><p>Blockchain technology offers a revolutionary approach to land management, providing immutable records and transparent transactions. In Zimbabwe, where land rights have been a complex issue, blockchain presents new opportunities.</p><h2>Current Challenges</h2><p>Traditional land registry systems face numerous challenges including corruption, data loss, and lack of transparency.</p>',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop',
  'Innovation',
  ARRAY['Blockchain', 'Land Management', 'Security', 'Zimbabwe'],
  'James Chikwanha',
  'Blockchain Developer',
  'James specializes in blockchain applications for land management and has worked on several pilot projects across Africa.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  '10 min read',
  true,
  true,
  '2024-03-10T14:00:00Z'
);

-- Update view counts and like counts for sample data
UPDATE blog_posts SET view_count = 2847, like_count = 156 WHERE slug = 'ai-african-geomatics-machine-learning';
UPDATE blog_posts SET view_count = 1923, like_count = 89 WHERE slug = 'open-source-vs-premium-geomatics-tools';
UPDATE blog_posts SET view_count = 3156, like_count = 201 WHERE slug = 'blockchain-land-management-property-rights';