/*
  # Complete Database Schema Setup

  This migration creates all the necessary tables and relationships for the SiteSurveyor application.

  ## New Tables
  1. **profiles** - User profile information
  2. **categories** - Application categories
  3. **applications** - Main applications table
  4. **app_downloads** - Download tracking
  5. **app_favorites** - User favorites
  6. **blog_posts** - Blog content
  7. **blog_views** - Blog view tracking
  8. **blog_likes** - Blog likes
  9. **solution_requests** - User solution requests
  10. **user_activity** - User activity tracking

  ## Security
  - Enable RLS on all tables
  - Add appropriate policies for each table
  - Set up proper foreign key relationships

  ## Functions
  - Create update_updated_at_column function for automatic timestamp updates
*/

-- Create extension for UUID generation if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text,
    organization text,
    location text,
    bio text,
    avatar_url text,
    website text,
    linkedin_url text,
    github_url text,
    is_verified boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can view all profiles" ON profiles
    FOR SELECT TO authenticated
    USING (true);

-- Create trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text UNIQUE NOT NULL,
    description text,
    icon text DEFAULT 'folder',
    color text DEFAULT 'bg-blue-100 text-blue-800',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Create categories policies
CREATE POLICY "Anyone can view active categories" ON categories
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Create trigger for categories updated_at
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text NOT NULL,
    category_id uuid REFERENCES categories(id),
    app_type text DEFAULT 'open_source' CHECK (app_type IN ('open_source', 'pro')),
    price numeric(10,2) DEFAULT 0,
    currency text DEFAULT 'USD',
    trial_available boolean DEFAULT false,
    trial_days integer DEFAULT 0,
    version text DEFAULT '1.0.0',
    author_name text,
    author_email text,
    license text DEFAULT 'Apache-2.0',
    homepage_url text,
    repo_url text,
    documentation_url text,
    download_url text,
    icon text DEFAULT 'default',
    featured_image text,
    screenshots text[],
    tags text[],
    features text[],
    pro_features text[],
    requirements text,
    installation_notes text,
    download_count integer DEFAULT 0,
    view_count integer DEFAULT 0,
    like_count integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Create applications policies
CREATE POLICY "Anyone can view active applications" ON applications
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- Create indexes for applications
CREATE INDEX IF NOT EXISTS idx_applications_active ON applications(is_active);
CREATE INDEX IF NOT EXISTS idx_applications_category ON applications(category_id);
CREATE INDEX IF NOT EXISTS idx_applications_downloads ON applications(download_count DESC);
CREATE INDEX IF NOT EXISTS idx_applications_featured ON applications(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_type ON applications(app_type);

-- Create trigger for applications updated_at
CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create app_downloads table
CREATE TABLE IF NOT EXISTS app_downloads (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address inet,
    user_agent text,
    downloaded_at timestamptz DEFAULT now()
);

-- Enable RLS on app_downloads
ALTER TABLE app_downloads ENABLE ROW LEVEL SECURITY;

-- Create app_downloads policies
CREATE POLICY "Anyone can insert downloads" ON app_downloads
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Users can view own downloads" ON app_downloads
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Create indexes for app_downloads
CREATE INDEX IF NOT EXISTS idx_app_downloads_app ON app_downloads(app_id);
CREATE INDEX IF NOT EXISTS idx_app_downloads_date ON app_downloads(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_app_downloads_user ON app_downloads(user_id);

-- Create app_favorites table
CREATE TABLE IF NOT EXISTS app_favorites (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    app_id uuid NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(app_id, user_id)
);

-- Enable RLS on app_favorites
ALTER TABLE app_favorites ENABLE ROW LEVEL SECURITY;

-- Create app_favorites policies
CREATE POLICY "Users can manage own favorites" ON app_favorites
    FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    featured_image text,
    category text NOT NULL,
    tags text[],
    author_name text NOT NULL,
    author_role text,
    author_bio text,
    author_avatar text,
    read_time text DEFAULT '5 min read',
    view_count integer DEFAULT 0,
    like_count integer DEFAULT 0,
    comment_count integer DEFAULT 0,
    is_featured boolean DEFAULT false,
    is_published boolean DEFAULT false,
    published_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create blog_posts policies
CREATE POLICY "Anyone can view published posts" ON blog_posts
    FOR SELECT TO anon, authenticated
    USING (is_published = true);

-- Create indexes for blog_posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Create trigger for blog_posts updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create blog_views table
CREATE TABLE IF NOT EXISTS blog_views (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address inet,
    user_agent text,
    viewed_at timestamptz DEFAULT now()
);

-- Enable RLS on blog_views
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- Create blog_views policies
CREATE POLICY "Anyone can insert blog views" ON blog_views
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Users can view own blog views" ON blog_views
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Create indexes for blog_views
CREATE INDEX IF NOT EXISTS idx_blog_views_date ON blog_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_blog_views_post ON blog_views(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_user ON blog_views(user_id);

-- Create blog_likes table
CREATE TABLE IF NOT EXISTS blog_likes (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Enable RLS on blog_likes
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- Create blog_likes policies
CREATE POLICY "Users can manage own blog likes" ON blog_likes
    FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create solution_requests table
CREATE TABLE IF NOT EXISTS solution_requests (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    email text,
    problem text NOT NULL,
    category text NOT NULL,
    urgency text CHECK (urgency IN ('low', 'medium', 'high')),
    location text,
    organization text,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'in_progress', 'completed', 'rejected')),
    admin_notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS on solution_requests
ALTER TABLE solution_requests ENABLE ROW LEVEL SECURITY;

-- Create solution_requests policies
CREATE POLICY "Anyone can create requests" ON solution_requests
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Users can view own requests" ON solution_requests
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Create trigger for solution_requests updated_at
CREATE TRIGGER update_solution_requests_updated_at
    BEFORE UPDATE ON solution_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create user_activity table
CREATE TABLE IF NOT EXISTS user_activity (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type text NOT NULL,
    resource_type text,
    resource_id uuid,
    metadata jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
);

-- Enable RLS on user_activity
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Create user_activity policies
CREATE POLICY "Users can insert own activity" ON user_activity
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own activity" ON user_activity
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Create indexes for user_activity
CREATE INDEX IF NOT EXISTS idx_user_activity_date ON user_activity(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_user ON user_activity(user_id);

-- Insert sample categories
INSERT INTO categories (name, description, icon, color) VALUES
    ('Survey & Mapping', 'Professional surveying and mapping applications', 'map', 'bg-blue-100 text-blue-800'),
    ('GIS & Analysis', 'Geographic Information Systems and spatial analysis tools', 'layers', 'bg-green-100 text-green-800'),
    ('CAD & Design', 'Computer-Aided Design and drafting software', 'pen-tool', 'bg-purple-100 text-purple-800'),
    ('Data Processing', 'Tools for processing and converting geospatial data', 'database', 'bg-orange-100 text-orange-800'),
    ('Field Collection', 'Mobile and field data collection applications', 'smartphone', 'bg-red-100 text-red-800'),
    ('Utilities', 'General utilities and helper applications', 'wrench', 'bg-gray-100 text-gray-800')
ON CONFLICT (name) DO NOTHING;

-- Insert sample applications
INSERT INTO applications (
    name, description, category_id, app_type, price, 
    author_name, license, homepage_url, repo_url,
    tags, features, download_count, is_featured, is_active
) VALUES
    (
        'QGIS',
        'A free and open source Geographic Information System',
        (SELECT id FROM categories WHERE name = 'GIS & Analysis'),
        'open_source',
        0,
        'QGIS Development Team',
        'GPL-2.0',
        'https://qgis.org',
        'https://github.com/qgis/QGIS',
        ARRAY['GIS', 'mapping', 'analysis', 'open-source'],
        ARRAY['Vector and raster analysis', 'Map composition', 'Plugin ecosystem', 'Cross-platform'],
        15420,
        true,
        true
    ),
    (
        'SurveyPro',
        'Professional land surveying software with advanced calculation tools',
        (SELECT id FROM categories WHERE name = 'Survey & Mapping'),
        'pro',
        299.99,
        'GeoTech Solutions',
        'Commercial',
        'https://example.com/surveypro',
        null,
        ARRAY['surveying', 'calculations', 'professional'],
        ARRAY['Traverse calculations', 'Coordinate geometry', 'Report generation', 'CAD integration'],
        892,
        true,
        true
    ),
    (
        'FieldMapper',
        'Mobile GIS data collection application for field work',
        (SELECT id FROM categories WHERE name = 'Field Collection'),
        'open_source',
        0,
        'OpenGIS Community',
        'MIT',
        'https://fieldmapper.org',
        'https://github.com/opengis/fieldmapper',
        ARRAY['mobile', 'field-work', 'data-collection'],
        ARRAY['Offline mapping', 'GPS tracking', 'Form-based data entry', 'Sync capabilities'],
        3247,
        false,
        true
    )
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (
    title, slug, excerpt, content, category, tags,
    author_name, author_role, read_time, is_featured, is_published, published_at
) VALUES
    (
        'Getting Started with Open Source GIS',
        'getting-started-open-source-gis',
        'Learn how to begin your journey with free and open source GIS software',
        'Geographic Information Systems (GIS) have become essential tools in many industries. This comprehensive guide will help you get started with open source GIS solutions...',
        'GIS',
        ARRAY['GIS', 'open-source', 'tutorial', 'beginner'],
        'Sarah Johnson',
        'GIS Specialist',
        '8 min read',
        true,
        true,
        now() - interval '2 days'
    ),
    (
        'Modern Surveying Techniques',
        'modern-surveying-techniques',
        'Explore the latest technologies and methods in professional surveying',
        'The field of surveying has evolved dramatically with new technologies. From drone mapping to laser scanning, modern surveyors have powerful tools at their disposal...',
        'Surveying',
        ARRAY['surveying', 'technology', 'drones', 'laser-scanning'],
        'Mike Chen',
        'Licensed Surveyor',
        '12 min read',
        false,
        true,
        now() - interval '5 days'
    )
ON CONFLICT (slug) DO NOTHING;