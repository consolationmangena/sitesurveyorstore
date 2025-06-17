import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import * as db from '@/lib/database'

// Hook for applications
export const useApplications = (filters = {}) => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true)
      const { data, error } = await db.getApplications(filters)
      
      if (error) {
        setError(error)
      } else {
        setApplications(data || [])
      }
      setLoading(false)
    }

    fetchApplications()
  }, [JSON.stringify(filters)])

  return { applications, loading, error, refetch: () => fetchApplications() }
}

// Hook for single application
export const useApplication = (id) => {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchApplication = async () => {
      setLoading(true)
      const { data, error } = await db.getApplication(id)
      
      if (error) {
        setError(error)
      } else {
        setApplication(data)
      }
      setLoading(false)
    }

    fetchApplication()
  }, [id])

  return { application, loading, error }
}

// Hook for blog posts
export const useBlogPosts = (filters = {}) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const { data, error } = await db.getBlogPosts(filters)
      
      if (error) {
        setError(error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [JSON.stringify(filters)])

  return { posts, loading, error }
}

// Hook for single blog post
export const useBlogPost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      setLoading(true)
      const { data, error } = await db.getBlogPost(id)
      
      if (error) {
        setError(error)
      } else {
        setPost(data)
        // Track view
        if (data) {
          await db.trackBlogView(data.id, user?.id)
        }
      }
      setLoading(false)
    }

    fetchPost()
  }, [id, user?.id])

  return { post, loading, error }
}

// Hook for categories
export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      const { data, error } = await db.getCategories()
      
      if (error) {
        setError(error)
      } else {
        setCategories(data || [])
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

// Hook for user profile
export const useProfile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      setLoading(true)
      const { data, error } = await db.getProfile(user.id)
      
      if (error && error.code !== 'PGRST116') { // Not found error
        setError(error)
      } else {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user?.id])

  const updateProfile = async (updates) => {
    if (!user?.id) return { error: 'No user logged in' }

    const { data, error } = await db.updateProfile(user.id, updates)
    if (!error) {
      setProfile(data)
    }
    return { data, error }
  }

  return { profile, loading, error, updateProfile }
}

// Hook for user favorites
export const useFavorites = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    const fetchFavorites = async () => {
      setLoading(true)
      const { data, error } = await db.getUserFavorites(user.id)
      
      if (error) {
        setError(error)
      } else {
        setFavorites(data || [])
      }
      setLoading(false)
    }

    fetchFavorites()
  }, [user?.id])

  const toggleFavorite = async (appId) => {
    if (!user?.id) return { error: 'Not authenticated' }

    const { favorited, error } = await db.toggleAppFavorite(appId, user.id)
    if (!error) {
      // Refresh favorites
      const { data } = await db.getUserFavorites(user.id)
      setFavorites(data || [])
    }
    return { favorited, error }
  }

  return { favorites, loading, error, toggleFavorite }
}

// Hook for app statistics
export const useAppStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const { data, error } = await db.getAppStats()
      
      if (error) {
        setError(error)
      } else {
        setStats(data)
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}

// Hook for blog statistics
export const useBlogStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const { data, error } = await db.getBlogStats()
      
      if (error) {
        setError(error)
      } else {
        setStats(data)
      }
      setLoading(false)
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}