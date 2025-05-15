-- Remove admin-specific columns from solution_requests
ALTER TABLE solution_requests
DROP COLUMN admin_notes,
DROP COLUMN status;

-- Remove admin-specific policies for categories
DROP POLICY IF EXISTS "Admin can manage categories" ON categories;

-- Remove admin-specific policies for applications
DROP POLICY IF EXISTS "Admin can manage applications" ON applications;

-- Remove admin-specific policies for blog_posts
DROP POLICY IF EXISTS "Admin can manage blog posts" ON blog_posts;

-- Remove admin-specific policies for solution_requests
DROP POLICY IF EXISTS "Admin can view all requests" ON solution_requests;
DROP POLICY IF EXISTS "Admin can update requests" ON solution_requests;

-- Update solution_requests table schema
ALTER TABLE solution_requests
ALTER COLUMN status SET DEFAULT 'pending';

-- Remove admin functionality from user profiles
ALTER TABLE profiles
DROP COLUMN is_verified;
