import React, { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'

const AdminContext = createContext({})

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export const AdminProvider = ({ children }) => {
  const { user } = useAuth()

  const isAdmin = () => {
    const adminEmails = [
      'admin@sitesurveyor.store'
    ]
    return user && adminEmails.includes(user.email?.toLowerCase())
  }

  const value = {
    isAdmin: isAdmin(),
    user
  }

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}