// Mock Supabase client for development without actual Supabase connection
const createMockClient = () => ({
  from: (table) => ({
    select: (columns) => ({
      eq: () => ({ data: [], error: null }),
      single: () => ({ data: null, error: { message: 'No Supabase connection' } }),
      limit: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
      filter: () => ({ data: [], error: null }),
      or: () => ({ data: [], error: null })
    }),
    insert: () => ({ data: null, error: { message: 'No Supabase connection' } }),
    update: () => ({ data: null, error: { message: 'No Supabase connection' } }),
    delete: () => ({ data: null, error: { message: 'No Supabase connection' } })
  }),
  rpc: () => ({ data: null, error: { message: 'No Supabase connection' } })
})

// Export mock client
export const supabase = createMockClient()

// Mock functions for compatibility
export const testConnection = async () => {
  console.log('📝 Using mock data - no Supabase connection required')
  return false
}

export const isSupabaseConfigured = false