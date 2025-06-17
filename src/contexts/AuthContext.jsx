import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'
import * as db from '@/lib/database'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          console.error('Error getting session:', error)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
          
          // Create profile if user exists but no profile
          if (session?.user) {
            await ensureProfile(session.user)
          }
        }
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === 'SIGNED_IN') {
          // Create profile if it doesn't exist
          if (session?.user) {
            await ensureProfile(session.user)
          }
          
          toast({
            title: "Welcome!",
            description: "You have been successfully signed in.",
          })
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Ensure user profile exists
  const ensureProfile = async (user) => {
    try {
      const { data: existingProfile, error } = await db.getProfile(user.id)
      
      if (error && error.code !== 'PGRST116') {
        // Error other than "not found"
        console.error('Error checking profile:', error)
        return
      }
      
      if (!existingProfile) {
        // Create profile from user metadata
        const profileData = {
          id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          organization: user.user_metadata?.organization || '',
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || ''
        }
        
        const { error: createError } = await db.createProfile(profileData)
        if (createError) {
          console.error('Error creating profile:', createError)
        }
      }
    } catch (error) {
      console.error('Error ensuring profile:', error)
    }
  }

  // Sign up with email and password
  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })

      if (error) throw error

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      })

      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      console.error('Google sign in error:', error)
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      })

      if (error) throw error

      toast({
        title: "Password reset email sent",
        description: "Please check your email for password reset instructions.",
      })

      return { data, error: null }
    } catch (error) {
      console.error('Password reset error:', error)
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    }
  }

  // Update password
  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      })

      return { data, error: null }
    } catch (error) {
      console.error('Password update error:', error)
      toast({
        title: "Password update failed",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    }
  }

  // Update profile
  const updateProfile = async (updates) => {
    try {
      // Update auth user metadata
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: updates
      })

      if (authError) throw authError

      // Update profile in database
      if (user?.id) {
        const { data: profileData, error: profileError } = await db.updateProfile(user.id, updates)
        
        if (profileError) throw profileError

        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        })

        return { data: profileData, error: null }
      }

      return { data: authData, error: null }
    } catch (error) {
      console.error('Profile update error:', error)
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive"
      })
      return { data: null, error }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}