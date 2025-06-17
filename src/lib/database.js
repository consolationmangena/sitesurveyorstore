// Mock database functions that return sample data instead of connecting to Supabase

// Sample data for development
const SAMPLE_CATEGORIES = [
  { id: '1', name: 'Field Tools', color: 'blue', icon: 'map' },
  { id: '2', name: 'Data Analysis', color: 'green', icon: 'database' },
  { id: '3', name: 'Documentation', color: 'purple', icon: 'camera' },
  { id: '4', name: 'Utilities', color: 'orange', icon: 'tool' },
  { id: '5', name: 'Land Management', color: 'red', icon: 'home' },
  { id: '6', name: 'Remote Sensing', color: 'indigo', icon: 'satellite' }
]

const SAMPLE_APPLICATIONS = [
  {
    id: '1',
    name: 'Site Survey Tool',
    description: 'A comprehensive tool for site surveying and mapping in the field with GPS integration and offline capabilities.',
    categories: { name: 'Field Tools', color: 'blue', icon: 'map' },
    app_type: 'open_source',
    price: 0,
    version: '1.0.0',
    author_name: 'SiteSurveyor Team',
    license: 'Apache-2.0',
    homepage_url: 'https://sitesurveyor.com/survey-tool',
    repo_url: 'https://github.com/sitesurveyor/survey-tool',
    download_count: 1250,
    icon: 'map',
    tags: ['surveying', 'mapping', 'gis', 'field-work'],
    features: ['GPS Integration', 'Offline Mapping', 'Data Export', 'Basic Reporting'],
    is_featured: true,
    updated_at: '2024-06-10T00:00:00Z'
  },
  {
    id: '2',
    name: 'GIS Data Viewer',
    description: 'View and analyze GIS data with this powerful viewer application supporting multiple file formats.',
    categories: { name: 'Data Analysis', color: 'green', icon: 'database' },
    app_type: 'open_source',
    price: 0,
    version: '2.1.0',
    author_name: 'SiteSurveyor Team',
    license: 'Apache-2.0',
    homepage_url: 'https://sitesurveyor.com/gis-viewer',
    repo_url: 'https://github.com/sitesurveyor/gis-viewer',
    download_count: 890,
    icon: 'database',
    tags: ['gis', 'data', 'visualization', 'analysis'],
    features: ['Multiple Format Support', 'Basic Visualization', 'Data Import/Export', 'Layer Management'],
    is_featured: false,
    updated_at: '2024-06-08T00:00:00Z'
  },
  {
    id: '3',
    name: 'Coordinate Converter Pro',
    description: 'Professional-grade coordinate system converter with advanced precision calculations and batch processing capabilities.',
    categories: { name: 'Utilities', color: 'orange', icon: 'tool' },
    app_type: 'pro',
    price: 149.99,
    version: '2.5.1',
    author_name: 'GeoTools Africa',
    license: 'Commercial',
    homepage_url: 'https://geotools.africa/coord-converter-pro',
    repo_url: null,
    download_count: 156,
    icon: 'database',
    tags: ['coordinates', 'conversion', 'precision', 'surveying', 'professional'],
    features: ['Basic Coordinate Conversion', 'Standard Datum Support', 'Single Point Processing'],
    pro_features: ['Batch Processing (1000+ points)', 'Custom Datum Creation', 'Advanced Precision Algorithms', 'API Integration', 'Priority Support'],
    trial_available: true,
    trial_days: 14,
    is_featured: true,
    updated_at: '2024-06-12T00:00:00Z'
  }
]

const SAMPLE_BLOG_POSTS = [
  {
    id: '1',
    title: 'The Future of AI in African Geomatics: Transforming Surveying with Machine Learning',
    excerpt: 'Discover how artificial intelligence is revolutionizing geomatics workflows across Africa, from automated feature detection to predictive terrain modeling.',
    content: '<h2>Introduction</h2><p>Artificial Intelligence is reshaping the geomatics landscape across Africa...</p>',
    author_name: 'Consolation Mangena',
    author_role: 'Founder & Lead Developer',
    author_avatar: '/profile.jpg',
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Surveying', 'Innovation'],
    featured_image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    is_featured: true,
    view_count: 2847,
    like_count: 156,
    read_time: '8 min read',
    published_at: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Open Source vs Premium: Choosing the Right Geomatics Tools',
    excerpt: 'A comprehensive comparison of open-source and premium geomatics solutions, helping you make informed decisions for your surveying projects.',
    content: '<h2>Introduction</h2><p>The choice between open-source and premium geomatics tools...</p>',
    author_name: 'Dr. Sarah Mukamuri',
    author_role: 'GIS Specialist',
    author_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    category: 'Guide',
    tags: ['Open Source', 'Premium', 'Tools', 'Decision Making'],
    featured_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
    is_featured: false,
    view_count: 1923,
    like_count: 89,
    read_time: '6 min read',
    published_at: '2024-03-12T09:00:00Z'
  }
]

// ==================== APPLICATIONS ====================

export const getApplications = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let filteredApps = [...SAMPLE_APPLICATIONS]
  
  if (filters.category && filters.category !== 'all') {
    filteredApps = filteredApps.filter(app => app.categories.name === filters.category)
  }
  
  if (filters.app_type && filters.app_type !== 'all') {
    filteredApps = filteredApps.filter(app => app.app_type === filters.app_type)
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredApps = filteredApps.filter(app => 
      app.name.toLowerCase().includes(searchLower) || 
      app.description.toLowerCase().includes(searchLower)
    )
  }
  
  return { data: filteredApps, error: null }
}

export const getApplication = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const app = SAMPLE_APPLICATIONS.find(app => app.id === id)
  if (!app) {
    return { data: null, error: { message: 'Application not found' } }
  }
  
  return { data: app, error: null }
}

export const incrementAppDownloads = async (appId) => {
  // Mock function - in real app this would update the database
  return { data: null, error: null }
}

export const trackAppDownload = async (appId, userEmail = null) => {
  // Mock function - in real app this would track downloads
  return { data: null, error: null }
}

// ==================== CATEGORIES ====================

export const getCategories = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  return { data: SAMPLE_CATEGORIES, error: null }
}

// ==================== BLOG POSTS ====================

export const getBlogPosts = async (filters = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400))
  
  let filteredPosts = [...SAMPLE_BLOG_POSTS]
  
  if (filters.category && filters.category !== 'All') {
    filteredPosts = filteredPosts.filter(post => post.category === filters.category)
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) || 
      post.excerpt.toLowerCase().includes(searchLower)
    )
  }
  
  return { data: filteredPosts, error: null }
}

export const getBlogPost = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const post = SAMPLE_BLOG_POSTS.find(post => post.id === id)
  if (!post) {
    return { data: null, error: { message: 'Blog post not found' } }
  }
  
  return { data: post, error: null }
}

export const getBlogPostBySlug = async (slug) => {
  // Mock function - would normally find by slug
  return { data: null, error: { message: 'Blog post not found' } }
}

export const incrementBlogViews = async (postId) => {
  // Mock function
  return { data: null, error: null }
}

export const trackBlogView = async (postId, userEmail = null) => {
  // Mock function
  return { data: null, error: null }
}

// ==================== SOLUTION REQUESTS ====================

export const createSolutionRequest = async (request) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock successful creation
  const mockRequest = {
    id: Date.now().toString(),
    ...request,
    status: 'submitted',
    created_at: new Date().toISOString()
  }
  
  console.log('📝 Solution request submitted (mock):', mockRequest)
  
  return { data: mockRequest, error: null }
}

export const getSolutionRequests = async (filters = {}) => {
  // Mock function
  return { data: [], error: null }
}

// ==================== STATISTICS ====================

export const getAppStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const stats = {
    total: SAMPLE_APPLICATIONS.length,
    openSource: SAMPLE_APPLICATIONS.filter(app => app.app_type === 'open_source').length,
    pro: SAMPLE_APPLICATIONS.filter(app => app.app_type === 'pro').length,
    totalDownloads: SAMPLE_APPLICATIONS.reduce((sum, app) => sum + app.download_count, 0)
  }
  
  return { data: stats, error: null }
}

export const getBlogStats = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const stats = {
    totalPosts: SAMPLE_BLOG_POSTS.length,
    totalViews: SAMPLE_BLOG_POSTS.reduce((sum, post) => sum + post.view_count, 0),
    totalLikes: SAMPLE_BLOG_POSTS.reduce((sum, post) => sum + post.like_count, 0),
    totalComments: 0
  }
  
  return { data: stats, error: null }
}