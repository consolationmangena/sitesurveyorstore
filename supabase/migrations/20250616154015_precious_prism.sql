/*
  # Initial SiteSurveyor Database Schema

  1. New Tables
    - `profiles` - User profile information extending Supabase auth.users
    - `categories` - Application categories
    - `applications` - Geomatics applications (both open source and pro)
    - `app_downloads` - Track application downloads
    - `app_favorites` - User favorites for applications
    - `blog_posts` - Blog articles and insights
    - `blog_views` - Track blog post views
    - `blog_likes` - User likes for blog posts
    - `solution_requests` - User-submitted challenges and solution requests
    - `user_activity` - Track user activity across the platform

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for applications and blog posts
    - Admin policies for content management
*/

-- Create profiles table extending auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  organization text,
  location text,
  bio text,
  avatar_url text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'folder',
  color text DEFAULT 'blue',
  created_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  excerpt text,
  category_id uuid REFERENCES categories(id),
  app_type text NOT NULL CHECK (app_type IN ('open_source', 'pro')),
  price decimal(10,2) DEFAULT 0,
  currency text DEFAULT 'USD',
  trial_available boolean DEFAULT false,
  trial_days integer DEFAULT 0,
  version text DEFAULT '1.0.0',
  author text,
  license text DEFAULT 'Apache-2.0',
  homepage_url text,
  repo_url text,
  documentation_url text,
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  icon text DEFAULT 'default',
  tags text[] DEFAULT '{}',
  features text[] DEFAULT '{}',
  pro_features text[] DEFAULT '{}',
  screenshots text[] DEFAULT '{}',
  requirements text,
  installation_notes text,
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create app_downloads table
CREATE TABLE IF NOT EXISTS app_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  ip_address inet,
  user_agent text,
  downloaded_at timestamptz DEFAULT now(),
  UNIQUE(user_id, app_id, DATE(downloaded_at))
);

-- Create app_favorites table
CREATE TABLE IF NOT EXISTS app_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  app_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, app_id)
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  author_name text NOT NULL,
  author_role text,
  author_bio text,
  author_avatar text,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  featured_image text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT false,
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  read_time text DEFAULT '5 min read',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_views table
CREATE TABLE IF NOT EXISTS blog_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  ip_address inet,
  viewed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id, DATE(viewed_at))
);

-- Create blog_likes table
CREATE TABLE IF NOT EXISTS blog_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create solution_requests table
CREATE TABLE IF NOT EXISTS solution_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  problem text NOT NULL,
  category text NOT NULL,
  urgency text NOT NULL CHECK (urgency IN ('low', 'medium', 'high')),
  location text,
  organization text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewing', 'in_progress', 'completed', 'rejected')),
  admin_notes text,
  votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_activity table
CREATE TABLE IF NOT EXISTS user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type text NOT NULL,
  resource_type text,
  resource_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE solution_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Applications policies (public read)
CREATE POLICY "Anyone can view active applications"
  ON applications FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- App downloads policies
CREATE POLICY "Users can view own downloads"
  ON app_downloads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads"
  ON app_downloads FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- App favorites policies
CREATE POLICY "Users can manage own favorites"
  ON app_favorites FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Blog posts policies (public read for published)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Blog views policies
CREATE POLICY "Users can view own blog views"
  ON blog_views FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own blog views"
  ON blog_views FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Blog likes policies
CREATE POLICY "Users can manage own blog likes"
  ON blog_likes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Solution requests policies
CREATE POLICY "Users can view all solution requests"
  ON solution_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert solution requests"
  ON solution_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own solution requests"
  ON solution_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- User activity policies
CREATE POLICY "Users can view own activity"
  ON user_activity FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON user_activity FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at);
CREATE INDEX IF NOT EXISTS idx_applications_category ON applications(category_id);
CREATE INDEX IF NOT EXISTS idx_applications_type ON applications(app_type);
CREATE INDEX IF NOT EXISTS idx_applications_featured ON applications(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_active ON applications(is_active);
CREATE INDEX IF NOT EXISTS idx_app_downloads_user ON app_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_app_downloads_app ON app_downloads(app_id);
CREATE INDEX IF NOT EXISTS idx_app_favorites_user ON app_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_views_user ON blog_views(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user ON blog_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_solution_requests_status ON solution_requests(status);
CREATE INDEX IF NOT EXISTS idx_user_activity_user ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_solution_requests_updated_at
  BEFORE UPDATE ON solution_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();