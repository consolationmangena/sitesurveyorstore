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

  const refreshProfile = async (userId) => {
    if (!userId) return;
    const { profile: newProfile } = await getProfile(userId)
    setProfile(newProfile)
  }

  useEffect(() => {
    // Get initial user
    getCurrentUser().then(({ user }) => {
      setUser(user)
      if (user) {
        refreshProfile(user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await refreshProfile(session.user.id)
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
      setProfile(null);
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const { profile: updatedProfile, error } = await updateUserProfile(user.id, profileData);
      if (error) throw error;
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signOut,
    updateProfile,
    refreshProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}