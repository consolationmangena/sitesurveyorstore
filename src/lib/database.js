import { supabase } from './supabase'

// ==================== PROFILES ====================

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

export const createProfile = async (profile) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()
  
  return { data, error }
}

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
    .order('created_at', { ascending: false })

  if (filters.category) {
    query = query.eq('categories.name', filters.category)
  }

  if (filters.app_type) {
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

export const trackAppDownload = async (appId, userId = null) => {
  const downloadData = {
    app_id: appId,
    downloaded_at: new Date().toISOString()
  }

  if (userId) {
    downloadData.user_id = userId
  }

  const { data, error } = await supabase
    .from('app_downloads')
    .insert(downloadData)
  
  // Also increment the download count
  await incrementAppDownloads(appId)
  
  return { data, error }
}

// ==================== CATEGORIES ====================

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  return { data, error }
}

// ==================== BLOG POSTS ====================

export const getBlogPosts = async (filters = {}) => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
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

export const trackBlogView = async (postId, userId = null) => {
  const viewData = {
    post_id: postId,
    viewed_at: new Date().toISOString()
  }

  if (userId) {
    viewData.user_id = userId
  }

  const { data, error } = await supabase
    .from('blog_views')
    .insert(viewData)
  
  // Also increment the view count
  await incrementBlogViews(postId)
  
  return { data, error }
}

export const toggleBlogLike = async (postId, userId) => {
  // Check if user already liked this post
  const { data: existingLike } = await supabase
    .from('blog_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .single()

  if (existingLike) {
    // Unlike the post
    const { error } = await supabase
      .from('blog_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId)
    
    if (!error) {
      await supabase.rpc('decrement_blog_likes', { post_id: postId })
    }
    
    return { liked: false, error }
  } else {
    // Like the post
    const { error } = await supabase
      .from('blog_likes')
      .insert({ post_id: postId, user_id: userId })
    
    if (!error) {
      await supabase.rpc('increment_blog_likes', { post_id: postId })
    }
    
    return { liked: true, error }
  }
}

export const getUserBlogLikes = async (userId) => {
  const { data, error } = await supabase
    .from('blog_likes')
    .select('post_id')
    .eq('user_id', userId)
  
  return { data: data?.map(like => like.post_id) || [], error }
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

// ==================== USER ACTIVITY ====================

export const trackUserActivity = async (userId, activityType, resourceType = null, resourceId = null, metadata = {}) => {
  const { data, error } = await supabase
    .from('user_activity')
    .insert({
      user_id: userId,
      activity_type: activityType,
      resource_type: resourceType,
      resource_id: resourceId,
      metadata
    })
  
  return { data, error }
}

export const getUserActivity = async (userId, limit = 50) => {
  const { data, error } = await supabase
    .from('user_activity')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  return { data, error }
}

// ==================== FAVORITES ====================

export const toggleAppFavorite = async (appId, userId) => {
  // Check if user already favorited this app
  const { data: existingFavorite } = await supabase
    .from('app_favorites')
    .select('id')
    .eq('app_id', appId)
    .eq('user_id', userId)
    .single()

  if (existingFavorite) {
    // Remove from favorites
    const { error } = await supabase
      .from('app_favorites')
      .delete()
      .eq('app_id', appId)
      .eq('user_id', userId)
    
    return { favorited: false, error }
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('app_favorites')
      .insert({ app_id: appId, user_id: userId })
    
    return { favorited: true, error }
  }
}

export const getUserFavorites = async (userId) => {
  const { data, error } = await supabase
    .from('app_favorites')
    .select(`
      app_id,
      applications (*)
    `)
    .eq('user_id', userId)
  
  return { data: data?.map(fav => fav.applications) || [], error }
}

// ==================== STATISTICS ====================

export const getAppStats = async () => {
  const { data, error } = await supabase
    .from('applications')
    .select('app_type, download_count, price')
    .eq('is_active', true)

  if (error) return { data: null, error }

  const stats = {
    total: data.length,
    openSource: data.filter(app => app.app_type === 'open_source').length,
    pro: data.filter(app => app.app_type === 'pro').length,
    totalDownloads: data.reduce((sum, app) => sum + (app.download_count || 0), 0),
    totalRevenue: data
      .filter(app => app.app_type === 'pro')
      .reduce((sum, app) => sum + (app.price * app.download_count), 0)
  }

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