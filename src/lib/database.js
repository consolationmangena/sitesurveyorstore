import { supabase } from './supabase'

// Cache storage
const cache = {
  features: null,
  benefits: null,
  featuredApps: null,
  lastFetch: {
    features: 0,
    benefits: 0,
    featuredApps: 0
  }
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const isCacheValid = (key) => {
  return cache[key] && (Date.now() - cache.lastFetch[key] < CACHE_DURATION);
};

// ==================== APPLICATIONS ====================

export const getApplications = async (filters = {}) => {
  let query = supabase
    .from('applications')
    .select(`
      *,
      categories (
        name,
        color,
        icon
      )
    `)
    .eq('is_active', true)
    .order('is_featured', { ascending: false })
    .order('download_count', { ascending: false })

  if (filters.category && filters.category !== 'all') {
    // Join with categories table to filter by category name
    query = query.eq('categories.name', filters.category)
  }

  if (filters.app_type && filters.app_type !== 'all') {
    query = query.eq('app_type', filters.app_type)
  }

  if (filters.featured) {
    query = query.eq('is_featured', true)
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
  return { data, error }
}

export const getApplication = async (id) => {
  const { data, error } = await supabase
    .from('applications')
    .select(`
      *,
      categories (
        name,
        color,
        icon
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()
  
  return { data, error }
}

export const incrementAppDownloads = async (appId) => {
  const { data, error } = await supabase.rpc('increment_app_downloads', {
    app_id: appId
  })
  
  return { data, error }
}

export const trackAppDownload = async (appId, userEmail = null) => {
  const downloadData = {
    app_id: appId,
    downloaded_at: new Date().toISOString()
  }

  if (userEmail) {
    downloadData.user_email = userEmail
  }

  const { data, error } = await supabase
    .from('app_downloads')
    .insert(downloadData)
  
  // Also increment the download count
  await incrementAppDownloads(appId)
  
  return { data, error }
}

export const getFeaturedApplications = async () => {
  try {
    // Check cache first
    if (isCacheValid('featuredApps')) {
      return { applications: cache.featuredApps, error: null };
    }

    const { data, error } = await supabase
      .from('applications')
      .select(`
        id,
        name,
        description,
        icon,
        tags,
        download_count,
        updated_at,
        app_type,
        price,
        trial_available,
        trial_days,
        repo_url,
        homepage_url,
        categories (
          name
        )
      `)
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(6); // Limit to 6 featured apps for better performance

    if (error) {
      console.error('Error fetching featured applications:', error);
      return { applications: [], error };
    }

    const applications = data.map(app => ({
      ...app,
      category: app.categories?.name || 'Uncategorized'
    }));

    // Update cache
    cache.featuredApps = applications;
    cache.lastFetch.featuredApps = Date.now();

    return { applications, error: null };
  } catch (error) {
    console.error('Error in getFeaturedApplications:', error);
    return { applications: [], error };
  }
}

// ==================== CATEGORIES ====================

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('name')
  
  return { data, error }
}

// ==================== BLOG POSTS ====================

export const getBlogPosts = async (filters = {}) => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('published_at', { ascending: false })

  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category)
  }

  if (filters.featured) {
    query = query.eq('is_featured', true)
  }

  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`)
  }

  const { data, error } = await query
  return { data, error }
}

export const getBlogPost = async (id) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()
  
  return { data, error }
}

export const getBlogPostBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  
  return { data, error }
}

export const incrementBlogViews = async (postId) => {
  const { data, error } = await supabase.rpc('increment_blog_views', {
    post_id: postId
  })
  
  return { data, error }
}

export const trackBlogView = async (postId, userEmail = null) => {
  const viewData = {
    post_id: postId,
    viewed_at: new Date().toISOString()
  }

  if (userEmail) {
    viewData.user_email = userEmail
  }

  const { data, error } = await supabase
    .from('blog_views')
    .insert(viewData)
  
  // Also increment the view count
  await incrementBlogViews(postId)
  
  return { data, error }
}

// ==================== SOLUTION REQUESTS ====================

export const createSolutionRequest = async (request) => {
  const { data, error } = await supabase
    .from('solution_requests')
    .insert(request)
    .select()
    .single()
  
  return { data, error }
}

export const getSolutionRequests = async (filters = {}) => {
  let query = supabase
    .from('solution_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.status) {
    query = query.eq('status', filters.status)
  }

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  const { data, error } = await query
  return { data, error }
}

// ==================== STATISTICS ====================

export const getAppStats = async () => {
  // Use aggregate functions for efficiency
  const { data, error } = await supabase
    .from('applications')
    .select(`
      count:count,
      openSource:count(app_type),
      pro:count(app_type),
      totalDownloads:sum(download_count)
    `)
    .eq('is_active', true)
    // Apply filters for counts
    .eq('app_type', 'open_source', { foreignTable: 'openSource' })
    .eq('app_type', 'pro', { foreignTable: 'pro' })
    .single(); // Get a single result with the aggregates

  if (error) return { data: null, error }

  // Data directly contains the aggregated stats
  const stats = data;

  return { data: stats, error: null }
}

export const getBlogStats = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('view_count, like_count, comment_count')
    .eq('is_published', true)

  if (error) return { data: null, error }

  const stats = {
    totalPosts: data.length,
    totalViews: data.reduce((sum, post) => sum + (post.view_count || 0), 0),
    totalLikes: data.reduce((sum, post) => sum + (post.like_count || 0), 0),
    totalComments: data.reduce((sum, post) => sum + (post.comment_count || 0), 0)
  }

  return { data: stats, error: null }
}

// ==================== FRONTEND CONTENT ====================

export const getFrontendStats = async () => {
  try {
    // Check cache for static content
    const needFeatures = !isCacheValid('features');
    const needBenefits = !isCacheValid('benefits');

    // Fetch only what we need
    const queries = [getAppStats()];

    if (needFeatures) {
      queries.push(
        supabase
          .from('frontend_features')
          .select('*')
          .eq('is_active', true)
          .order('sort_order')
      );
    }

    if (needBenefits) {
      queries.push(
        supabase
          .from('frontend_benefits')
          .select('*')
          .eq('is_active', true)
          .order('sort_order')
      );
    }

    const [
      appStats,
      ...rest
    ] = await Promise.all(queries);

    // Update caches if needed
    if (needFeatures && rest[0]) {
      cache.features = rest[0].data;
      cache.lastFetch.features = Date.now();
    }

    if (needBenefits && rest[1]) {
      cache.benefits = rest[1].data;
      cache.lastFetch.benefits = Date.now();
    }

    // Get country count from a separate function to avoid blocking
    const countryCount = await getCountryCount();

    return {
      stats: [
        { 
          label: "Open Source Tools", 
          value: `${appStats.data?.openSource || 0}+`, 
          color: "text-emerald-600", 
          icon: "Code" 
        },
        { 
          label: "Professional Apps", 
          value: `${appStats.data?.pro || 0}+`, 
          color: "text-blue-600", 
          icon: "Crown" 
        },
        { 
          label: "Total Downloads", 
          value: `${Math.floor((appStats.data?.totalDownloads || 0) / 1000)}K+`, 
          color: "text-purple-600", 
          icon: "TrendingUp" 
        },
        { 
          label: "Countries Served", 
          value: `${countryCount}+`, 
          color: "text-orange-600", 
          icon: "Globe" 
        }
      ],
      features: cache.features || [],
      benefits: cache.benefits || []
    };
  } catch (error) {
    console.error('Error getting frontend stats:', error);
    return null;
  }
};

// Helper function to get country count without blocking main data load
const getCountryCount = async () => {
  try {
    const { data: countries } = await supabase
      .from('profiles')
      .select('location')
      .not('location', 'is', null);

    const distinctCountries = new Set(countries?.map(p => p.location.trim()) || []);
    return distinctCountries.size;
  } catch (error) {
    console.error('Error getting country count:', error);
    return 0;
  }
};