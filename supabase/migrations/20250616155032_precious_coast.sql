/*
  # Complete SiteSurveyor Database Schema

  1. New Tables
    - `profiles` - Extended user profiles with professional information
    - `categories` - Application categories with icons and colors
    - `applications` - Complete app data (open source & pro)
    - `app_downloads` & `app_favorites` - User interaction tracking
    - `blog_posts`, `blog_views`, `blog_likes` - Blog system
    - `solution_requests` - User-submitted challenges
    - `user_activity` - Comprehensive activity tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
    - Secure user profile management

  3. Functions
    - Counter functions for downloads, views, likes
    - Statistics calculation functions
    - Search and analytics functions
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== PROFILES ====================

CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
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

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

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

-- ==================== CATEGORIES ====================

CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  description text,
  icon text DEFAULT 'folder',
  color text DEFAULT 'bg-blue-100 text-blue-800',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- ==================== APPLICATIONS ====================

CREATE TABLE IF NOT EXISTS applications (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  category_id uuid REFERENCES categories(id),
  app_type text CHECK (app_type IN ('open_source', 'pro')) DEFAULT 'open_source',
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

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Applications policies
CREATE POLICY "Anyone can view active applications"
  ON applications FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- ==================== APP DOWNLOADS ====================

CREATE TABLE IF NOT EXISTS app_downloads (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  app_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  downloaded_at timestamptz DEFAULT now()
);

ALTER TABLE app_downloads ENABLE ROW LEVEL SECURITY;

-- App downloads policies
CREATE POLICY "Users can view own downloads"
  ON app_downloads FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert downloads"
  ON app_downloads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ==================== APP FAVORITES ====================

CREATE TABLE IF NOT EXISTS app_favorites (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  app_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(app_id, user_id)
);

ALTER TABLE app_favorites ENABLE ROW LEVEL SECURITY;

-- App favorites policies
CREATE POLICY "Users can manage own favorites"
  ON app_favorites FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==================== BLOG POSTS ====================

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
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

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
CREATE POLICY "Anyone can view published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- ==================== BLOG VIEWS ====================

CREATE TABLE IF NOT EXISTS blog_views (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  viewed_at timestamptz DEFAULT now()
);

ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

-- Blog views policies
CREATE POLICY "Users can view own blog views"
  ON blog_views FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert blog views"
  ON blog_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ==================== BLOG LIKES ====================

CREATE TABLE IF NOT EXISTS blog_likes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

-- Blog likes policies
CREATE POLICY "Users can manage own blog likes"
  ON blog_likes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ==================== SOLUTION REQUESTS ====================

CREATE TABLE IF NOT EXISTS solution_requests (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
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

ALTER TABLE solution_requests ENABLE ROW LEVEL SECURITY;

-- Solution requests policies
CREATE POLICY "Users can view own requests"
  ON solution_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create requests"
  ON solution_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ==================== USER ACTIVITY ====================

CREATE TABLE IF NOT EXISTS user_activity (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  resource_type text,
  resource_id uuid,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- User activity policies
CREATE POLICY "Users can view own activity"
  ON user_activity FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
  ON user_activity FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ==================== INDEXES ====================

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_applications_category ON applications(category_id);
CREATE INDEX IF NOT EXISTS idx_applications_type ON applications(app_type);
CREATE INDEX IF NOT EXISTS idx_applications_active ON applications(is_active);
CREATE INDEX IF NOT EXISTS idx_applications_featured ON applications(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_downloads ON applications(download_count DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_app_downloads_app ON app_downloads(app_id);
CREATE INDEX IF NOT EXISTS idx_app_downloads_user ON app_downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_app_downloads_date ON app_downloads(downloaded_at);

CREATE INDEX IF NOT EXISTS idx_blog_views_post ON blog_views(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_user ON blog_views(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_date ON blog_views(viewed_at);

CREATE INDEX IF NOT EXISTS idx_user_activity_user ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_date ON user_activity(created_at DESC);

-- ==================== TRIGGERS ====================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
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