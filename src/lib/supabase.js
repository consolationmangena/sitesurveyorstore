import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Provide fallback values for development
const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-key'

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id') || supabaseAnonKey.includes('your-anon-key')) {
  console.warn('⚠️ Supabase credentials not configured properly!')
  console.warn('Please update your .env file with your actual Supabase project URL and anon key.')
  console.warn('You can find these in your Supabase project settings: https://supabase.com/dashboard')
}

export const supabase = createClient(
  supabaseUrl || defaultUrl, 
  supabaseAnonKey || defaultKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('categories').select('count').limit(1)
    if (error) {
      console.error('Supabase connection test failed:', error.message)
      return false
    }
    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('Supabase connection error:', error)
    return false
  }
}