// Admin email configuration for SiteSurveyor
export const ADMIN_EMAILS = [
  'admin@sitesurveyor.store',
  'consolation@sitesurveyor.store', 
  'support@sitesurveyor.store'
]

export const isAdminUser = (email) => {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase())
}

export const getAdminRole = (email) => {
  if (!isAdminUser(email)) return null
  
  const emailMap = {
    'admin@sitesurveyor.store': 'Super Admin',
    'consolation@sitesurveyor.store': 'Founder & Lead Developer', 
    'support@sitesurveyor.store': 'Support Admin'
  }
  
  return emailMap[email.toLowerCase()] || 'Admin'
}