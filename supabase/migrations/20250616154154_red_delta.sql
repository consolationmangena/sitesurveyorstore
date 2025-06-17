/*
  # Database Functions for SiteSurveyor

  1. Functions for incrementing counters
  2. Functions for statistics
  3. Functions for data aggregation
*/

-- Function to increment app download count
CREATE OR REPLACE FUNCTION increment_app_downloads(app_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE applications 
  SET download_count = download_count + 1,
      updated_at = now()
  WHERE id = app_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment blog view count
CREATE OR REPLACE FUNCTION increment_blog_views(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = view_count + 1,
      updated_at = now()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment blog like count
CREATE OR REPLACE FUNCTION increment_blog_likes(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET like_count = like_count + 1,
      updated_at = now()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement blog like count
CREATE OR REPLACE FUNCTION decrement_blog_likes(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET like_count = GREATEST(like_count - 1, 0),
      updated_at = now()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get app statistics
CREATE OR REPLACE FUNCTION get_app_statistics()
RETURNS TABLE (
  total_apps bigint,
  open_source_apps bigint,
  pro_apps bigint,
  total_downloads bigint,
  total_revenue numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_apps,
    COUNT(*) FILTER (WHERE app_type = 'open_source') as open_source_apps,
    COUNT(*) FILTER (WHERE app_type = 'pro') as pro_apps,
    COALESCE(SUM(download_count), 0) as total_downloads,
    COALESCE(SUM(CASE WHEN app_type = 'pro' THEN price * download_count ELSE 0 END), 0) as total_revenue
  FROM applications 
  WHERE is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get blog statistics
CREATE OR REPLACE FUNCTION get_blog_statistics()
RETURNS TABLE (
  total_posts bigint,
  total_views bigint,
  total_likes bigint,
  total_comments bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_posts,
    COALESCE(SUM(view_count), 0) as total_views,
    COALESCE(SUM(like_count), 0) as total_likes,
    COALESCE(SUM(comment_count), 0) as total_comments
  FROM blog_posts 
  WHERE is_published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user activity summary
CREATE OR REPLACE FUNCTION get_user_activity_summary(user_uuid uuid)
RETURNS TABLE (
  apps_downloaded bigint,
  blog_posts_viewed bigint,
  favorites_count bigint,
  solution_requests_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM app_downloads WHERE user_id = user_uuid) as apps_downloaded,
    (SELECT COUNT(*) FROM blog_views WHERE user_id = user_uuid) as blog_posts_viewed,
    (SELECT COUNT(*) FROM app_favorites WHERE user_id = user_uuid) as favorites_count,
    (SELECT COUNT(*) FROM solution_requests WHERE user_id = user_uuid) as solution_requests_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search applications
CREATE OR REPLACE FUNCTION search_applications(
  search_term text DEFAULT '',
  category_filter text DEFAULT '',
  app_type_filter text DEFAULT '',
  limit_count int DEFAULT 50
)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  category_name text,
  app_type text,
  price numeric,
  download_count int,
  is_featured boolean,
  tags text[],
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.name,
    a.description,
    c.name as category_name,
    a.app_type,
    a.price,
    a.download_count,
    a.is_featured,
    a.tags,
    a.created_at
  FROM applications a
  LEFT JOIN categories c ON a.category_id = c.id
  WHERE a.is_active = true
    AND (search_term = '' OR a.name ILIKE '%' || search_term || '%' OR a.description ILIKE '%' || search_term || '%')
    AND (category_filter = '' OR c.name = category_filter)
    AND (app_type_filter = '' OR a.app_type = app_type_filter)
  ORDER BY a.is_featured DESC, a.download_count DESC, a.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get trending applications
CREATE OR REPLACE FUNCTION get_trending_applications(days_back int DEFAULT 30, limit_count int DEFAULT 10)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  download_count int,
  recent_downloads bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.name,
    a.description,
    a.download_count,
    COUNT(ad.id) as recent_downloads
  FROM applications a
  LEFT JOIN app_downloads ad ON a.id = ad.app_id 
    AND ad.downloaded_at > (now() - interval '1 day' * days_back)
  WHERE a.is_active = true
  GROUP BY a.id, a.name, a.description, a.download_count
  ORDER BY recent_downloads DESC, a.download_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;