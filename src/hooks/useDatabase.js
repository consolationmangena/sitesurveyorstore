import { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (!id) return

    const fetchPost = async () => {
      setLoading(true)
      const { data, error } = await db.getBlogPost(id)
      
      if (error) {
        setError(error)
      } else {
        setPost(data)
        // Track view without user
        if (data) {
          await db.trackBlogView(data.id)
        }
      }
      setLoading(false)
    }

    fetchPost()
  }, [id])

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