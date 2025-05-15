// Admin email configuration for SiteSurveyor
export const ADMIN_EMAILS = [
  'admin@sitesurveyor.co.zw'
]

export const isAdminUser = (email) => {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export const getAdminRole = (email) => {
  if (!isAdminUser(email)) return null
  
  const emailMap = {
    'admin@sitesurveyor.co.zw': 'Super Admin'
  }
  
  return emailMap[email.toLowerCase()] || 'Admin'
}

// Admin credentials for reference
export const ADMIN_CREDENTIALS = {
  email: 'admin@sitesurveyor.co.zw',
  // Password: consolation09. (set during account creation)
}