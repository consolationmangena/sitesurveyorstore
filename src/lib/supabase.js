import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if environment variables are properly configured
const isConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_project_url' && 
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  supabaseUrl.includes('supabase.co')

if (!isConfigured) {
  console.warn('⚠️ Supabase not configured properly!')
  console.warn('Please set up your environment variables:')
  console.warn('1. Copy .env.example to .env')
  console.warn('2. Replace placeholder values with your actual Supabase credentials')
  console.warn('3. Restart the development server')
}

// Create a mock client if not configured to prevent errors
const createMockClient = () => ({
  from: () => ({
    select: () => Promise.resolve({ data: [], error: { message: 'Supabase not configured' } }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    update: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    delete: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
  }),
  auth: {
    signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
})

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce'
      }
    })
  : createMockClient()

// Test connection function
export const testConnection = async () => {
  if (!isConfigured) {
    console.warn('⚠️ Skipping connection test - Supabase not configured')
    return false
  }

  try {
    const { data, error } = await supabase.from('categories').select('count').limit(1)
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message)
      return false
    }
    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection error:', error)
    return false
  }
}

// Export configuration status
export const isSupabaseConfigured = isConfigured

// Only test connection if properly configured
if (isConfigured) {
  testConnection()
}