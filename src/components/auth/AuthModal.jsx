import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { signIn, signUp } from '@/lib/auth'
import { Eye, EyeOff, Mail, User, Lock, UserPlus, LogIn } from 'lucide-react'

export default function AuthModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Basic validation
    if (!formData.email.trim() || !formData.password) {
      toast.error('Please enter both email and password')
      setLoading(false)
      return
    }

    try {
      const { user, error } = await signIn(formData.email.trim(), formData.password)
      
      if (error) {
        console.error('Sign in error:', error)
        toast.error('Sign in failed', {
          description: error.message || 'Please check your credentials and try again.'
        })
        return
      }

      if (user) {
        toast.success('Welcome back!', {
          description: 'You have successfully signed in.'
        })
        
        onClose()
        setFormData({
          email: '',
          password: '',
          username: '',
          fullName: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      console.error('Sign in catch error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.email.trim() || !formData.password) {
      toast.error('Email and password are required')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { user, error } = await signUp(
        formData.email.trim(),
        formData.password,
        formData.username || '',
        formData.fullName || ''
      )
      
      if (error) {
        console.error('Sign up error:', error)
        toast.error('Sign up failed', {
          description: error.message || 'Please try again.'
        })
        return
      }

      if (user) {
        toast.success('Account created successfully!', {
          description: 'Welcome to SiteSurveyor! You can now access all features.'
        })
        
        onClose()
        setFormData({
          email: '',
          password: '',
          username: '',
          fullName: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      console.error('Sign up catch error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to SiteSurveyor
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            {`Please enter your email and password to ${showPassword ? 'sign in' : 'create an account'}.`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10"
                required
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFormData({
                  email: '',
                  password: '',
                  username: '',
                  fullName: '',
                  confirmPassword: ''
                })
                setShowPassword(false)
                onClose()
              }}
            >
              Need an account? Sign up
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}