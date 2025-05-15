import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, getCurrentUser, onAuthStateChange, getProfile, updateUserProfile } from '@/lib/auth'

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
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    getCurrentUser().then(({ user }) => {
      setUser(user)
      if (user) {
        getProfile(user.id).then(({ profile }) => {
          setProfile(profile)
        })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        const { profile } = await getProfile(session.user.id)
        setProfile(profile)
      } else {
        setProfile(null)
      }
      
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      await updateUserProfile(user, profileData);
      setUser({ ...user, ...profileData });
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    setProfile,
    signOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}