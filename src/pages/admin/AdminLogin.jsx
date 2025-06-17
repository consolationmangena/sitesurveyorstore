import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { signIn } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  // Redirect if already logged in as admin
  React.useEffect(() => {
    if (user && isAdminUser(user.email)) {
      navigate('/admin/dashboard')
    }
  }, [user, navigate])

  const isAdminUser = (email) => {
    // Define admin emails - in production, this should be stored in database
    const adminEmails = [
      'admin@sitesurveyor.store',
      'consolation@sitesurveyor.store',
      'support@sitesurveyor.store'
    ]
    return adminEmails.includes(email?.toLowerCase())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check if email is admin
      if (!isAdminUser(email)) {
        toast.error('Access Denied', {
          description: 'You do not have admin privileges.'
        })
        setLoading(false)
        return
      }

      const { user, error } = await signIn(email, password)
      
      if (error) {
        toast.error('Login Failed', {
          description: error.message
        })
        return
      }

      if (user) {
        toast.success('Welcome Admin!', {
          description: 'Successfully logged into admin panel.'
        })
        navigate('/admin/dashboard')
      }
    } catch (error) {
      toast.error('An error occurred', {
        description: 'Please try again later.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-black text-slate-800">
              SiteSurveyor Admin
            </CardTitle>
            <CardDescription className="text-slate-600 font-medium">
              Secure access to admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <Shield className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 font-medium">
                This area is restricted to authorized administrators only.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold">
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@sitesurveyor.store"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-2 border-slate-200 focus:border-blue-500 rounded-xl pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Access Admin Panel
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Authorized personnel only. All access is logged and monitored.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}