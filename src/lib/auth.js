import { supabase } from './supabase'

// ==================== AUTHENTICATION ====================

export const signUp = async (email, password, username, fullName) => {
  try {
    // First, sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username || '',
          full_name: fullName || ''
        }
      }
    })

    if (authError) {
      console.error('Signup auth error:', authError)
      return { user: null, error: authError }
    }

    // The profile should be created automatically by the database trigger
    // But let's add a small delay and check if it was created
    if (authData.user) {
      // Wait a moment for the trigger to execute
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Check if profile exists, if not create it manually
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', authData.user.id)
        .single()

      if (profileCheckError && profileCheckError.code === 'PGRST116') {
        // Profile doesn't exist, create it manually
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: fullName || '',
            username: username || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (profileError) {
          console.error('Manual profile creation error:', profileError)
          // Don't return error here as auth was successful
        }
      }
    }

    return { user: authData.user, error: null }
  } catch (error) {
    console.error('Signup error:', error)
    return { user: null, error }
  }
}

export const signIn = async (email, password) => {
  try {
    // Validate inputs
    if (!email || !password) {
      return { 
        user: null, 
        error: { message: 'Email and password are required' }
      }
    }

    // Trim whitespace from email
    const trimmedEmail = email.trim()

    console.log('Attempting sign in for:', trimmedEmail)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: password
    })

    if (error) {
      console.error('Sign in error:', error)
      
      // Provide more user-friendly error messages
      let userMessage = error.message
      if (error.message.includes('Invalid login credentials')) {
        userMessage = 'Invalid email or password. Please check your credentials and try again.'
      } else if (error.message.includes('Email not confirmed')) {
        userMessage = 'Please check your email and click the confirmation link before signing in.'
      } else if (error.message.includes('Too many requests')) {
        userMessage = 'Too many sign-in attempts. Please wait a moment and try again.'
      }
      
      return { 
        user: null, 
        error: { ...error, message: userMessage }
      }
    }

    // Ensure profile exists for existing users
    if (data.user) {
      try {
        const { data: existingProfile, error: profileCheckError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (profileCheckError && profileCheckError.code === 'PGRST116') {
          // Profile doesn't exist, create it for existing user
          await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              username: '',
              full_name: '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
        }
      } catch (profileError) {
        console.error('Profile check/creation error:', profileError)
        // Don't fail sign-in if profile creation fails
      }
    }

    return { user: data.user, error: null }
  } catch (error) {
    console.error('Sign in catch error:', error)
    return { 
      user: null, 
      error: { message: 'An unexpected error occurred. Please try again.' }
    }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  } catch (error) {
    return { user: null, error }
  }
}

export const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { profile: data, error }
  } catch (error) {
    return { profile: null, error }
  }
}

export const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    return { profile: data, error }
  } catch (error) {
    return { profile: null, error }
  }
}

export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    return { error }
  } catch (error) {
    return { error }
  }
}

// ==================== AUTH STATE MANAGEMENT ====================

export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}

// Only email/password authentication is supported. No Google OAuth or provider login.