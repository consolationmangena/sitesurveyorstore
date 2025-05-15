import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Loader2 } from 'lucide-react'

export default function EmailCallback() {
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Supabase automatically handles the email verification token
        // We just need to check if the session is established
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Verification error:', error)
          setError(error.message)
        } else if (session) {
          // Verification successful, redirect to home page
          setTimeout(() => {
            navigate('/', { replace: true })
          }, 2000)
        } else {
          setError('Verification link invalid or expired')
        }
      } catch (err) {
        console.error('Callback handler error:', err)
        setError('An unexpected error occurred')
      } finally {
        setVerifying(false)
      }
    }

    handleEmailVerification()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {verifying ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Verifying your email address...</p>
              </>
            ) : error ? (
              <>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => navigate('/')} variant="outline">
                  Return to Home
                </Button>
              </>
            ) : (
              <>
                <p className="text-green-600 mb-4">
                  Email verified successfully! Redirecting...
                </p>
                <div className="w-8 h-8 border-2 border-green-600 border-r-transparent rounded-full animate-spin mx-auto"></div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
