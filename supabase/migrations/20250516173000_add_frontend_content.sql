-- Create features table
CREATE TABLE IF NOT EXISTS frontend_features (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  icon text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  color text NOT NULL DEFAULT 'from-blue-600 to-blue-700',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE frontend_features ENABLE ROW LEVEL SECURITY;

-- Create benefits table
CREATE TABLE IF NOT EXISTS frontend_benefits (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  icon text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE frontend_benefits ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Anyone can view active features"
  ON frontend_features FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Anyone can view active benefits"
  ON frontend_benefits FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Add sample data
INSERT INTO frontend_features (icon, title, description, color, sort_order) VALUES
  ('Code', 'Open Source Foundation', 'Transparent, community-driven development with full source code access and no vendor lock-in.', 'from-emerald-600 to-emerald-700', 1),
  ('Crown', 'Professional Solutions', 'Enterprise-grade applications with advanced features, priority support, and commercial licensing.', 'from-blue-600 to-blue-700', 2),
  ('Globe', 'Global Standards', 'Built for African challenges while maintaining compatibility with international geomatics standards.', 'from-purple-600 to-purple-700', 3),
  ('Users', 'Expert Community', 'Developed by geomatics professionals for professionals, with continuous feedback and improvement.', 'from-orange-600 to-orange-700', 4);

INSERT INTO frontend_benefits (icon, title, description, sort_order) VALUES
  ('CheckCircle', 'Cost Effective', 'Reduce software licensing costs by up to 80% with our open-source alternatives', 1),
  ('Award', 'Industry Standard', 'Full compatibility with established geomatics workflows and data formats', 2);
