import { supabase } from './supabase'

// ==================== ADMIN APPLICATIONS ====================

export const createApplication = async (applicationData) => {
  const { data, error } = await supabase
    .from('applications')
    .insert(applicationData)
    .select()
    .single()
  
  return { data, error }
}

export const updateApplication = async (id, updates) => {
  const { data, error } = await supabase
    .from('applications')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export const deleteApplication = async (id) => {
  const { data, error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id)
  
  return { data, error }
}

// ==================== ADMIN BLOG POSTS ====================

export const createBlogPost = async (postData) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert(postData)
    .select()
    .single()
  
  return { data, error }
}

export const updateBlogPost = async (id, updates) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export const deleteBlogPost = async (id) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
  
  return { data, error }
}

export const getAllBlogPosts = async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// ==================== ADMIN CATEGORIES ====================

export const createCategory = async (categoryData) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(categoryData)
    .select()
    .single()
  
  return { data, error }
}

export const updateCategory = async (id, updates) => {
  const { data, error } = await supabase
    .from('categories')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export const deleteCategory = async (id) => {
  const { data, error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)
  
  return { data, error }
}

export const getAllCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  return { data, error }
}

// ==================== ADMIN SOLUTION REQUESTS ====================

export const getAllSolutionRequests = async () => {
  const { data, error } = await supabase
    .from('solution_requests')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const updateSolutionRequest = async (id, updates) => {
  const { data, error } = await supabase
    .from('solution_requests')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

export const deleteSolutionRequest = async (id) => {
  const { data, error } = await supabase
    .from('solution_requests')
    .delete()
    .eq('id', id)
  
  return { data, error }
}

// ==================== ADMIN USER MANAGEMENT ====================

export const getAllProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export const updateProfile = async (id, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  
  return { data, error }
}

// ==================== ADMIN ANALYTICS ====================

export const getDetailedAnalytics = async () => {
  try {
    // Get application stats
    const { data: appData, error: appError } = await supabase
      .from('applications')
      .select('app_type, download_count, price, created_at')

    // Get blog stats
    const { data: blogData, error: blogError } = await supabase
      .from('blog_posts')
      .select('view_count, like_count, comment_count, created_at, is_published')

    // Get download stats
    const { data: downloadData, error: downloadError } = await supabase
      .from('app_downloads')
      .select('downloaded_at, app_id')

    // Get user stats
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('created_at')

    if (appError || blogError || downloadError || userError) {
      throw new Error('Error fetching analytics data')
    }

    return {
      data: {
        applications: appData,
        blogPosts: blogData,
        downloads: downloadData,
        users: userData
      },
      error: null
    }
  } catch (error) {
    return { data: null, error }
  }
}

// ==================== ADMIN DASHBOARD STATS ====================

export const getDashboardStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_admin_dashboard_stats')
    return { data, error }
  } catch (error) {
    // Fallback to individual queries if RPC function doesn't exist
    const [appsResult, postsResult, usersResult, requestsResult] = await Promise.all([
      supabase.from('applications').select('id', { count: 'exact' }),
      supabase.from('blog_posts').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }),
      supabase.from('solution_requests').select('id', { count: 'exact' })
    ])

    return {
      data: {
        total_applications: appsResult.count || 0,
        total_posts: postsResult.count || 0,
        total_users: usersResult.count || 0,
        total_requests: requestsResult.count || 0
      },
      error: null
    }
  }
}