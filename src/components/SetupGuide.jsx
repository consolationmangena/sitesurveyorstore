import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, ExternalLink, Copy, Database, Key, Globe } from 'lucide-react'
import { testConnection } from '@/lib/supabase'

export default function SetupGuide({ onComplete }) {
  const [connectionStatus, setConnectionStatus] = useState('checking')
  const [showGuide, setShowGuide] = useState(true)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    setConnectionStatus('checking')
    const isConnected = await testConnection()
    setConnectionStatus(isConnected ? 'connected' : 'disconnected')
    
    if (isConnected && onComplete) {
      setTimeout(() => {
        setShowGuide(false)
        onComplete()
      }, 2000)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  if (!showGuide) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">Setup Supabase Database</CardTitle>
              <CardDescription>
                Connect your Supabase database to enable all features
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Connection Status */}
          <Alert className={connectionStatus === 'connected' ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}>
            <div className="flex items-center gap-2">
              {connectionStatus === 'checking' && (
                <>
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Checking connection...</span>
                </>
              )}
              {connectionStatus === 'connected' && (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-800 font-medium">Database connected successfully!</span>
                </>
              )}
              {connectionStatus === 'disconnected' && (
                <>
                  <XCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-800 font-medium">Database not connected</span>
                </>
              )}
            </div>
          </Alert>

          {connectionStatus === 'disconnected' && (
            <>
              {/* Step 1: Create Supabase Project */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 text-white">Step 1</Badge>
                  <h3 className="text-lg font-semibold">Create Supabase Project</h3>
                </div>
                
                <div className="pl-6 space-y-3">
                  <p className="text-slate-600">
                    First, you need to create a free Supabase project to store your data.
                  </p>
                  
                  <Button asChild className="w-full">
                    <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                      <Globe className="w-4 h-4 mr-2" />
                      Create Supabase Project
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  
                  <div className="text-sm text-slate-500 space-y-1">
                    <p>• Sign up for a free account at supabase.com</p>
                    <p>• Click "New Project" and choose your organization</p>
                    <p>• Give your project a name (e.g., "SiteSurveyor")</p>
                    <p>• Choose a secure database password</p>
                    <p>• Select a region close to your users</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Get Credentials */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600 text-white">Step 2</Badge>
                  <h3 className="text-lg font-semibold">Get Your Credentials</h3>
                </div>
                
                <div className="pl-6 space-y-3">
                  <p className="text-slate-600">
                    Once your project is created, get your API credentials:
                  </p>
                  
                  <div className="text-sm text-slate-500 space-y-1">
                    <p>• Go to Settings → API in your Supabase dashboard</p>
                    <p>• Copy your "Project URL"</p>
                    <p>• Copy your "anon public" key</p>
                  </div>
                </div>
              </div>

              {/* Step 3: Update Environment */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-white">Step 3</Badge>
                  <h3 className="text-lg font-semibold">Update Environment Variables</h3>
                </div>
                
                <div className="pl-6 space-y-3">
                  <p className="text-slate-600">
                    Update your .env file with your Supabase credentials:
                  </p>
                  
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">.env file:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`)}
                        className="text-slate-400 hover:text-white"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div>VITE_SUPABASE_URL=https://your-project-id.supabase.co</div>
                      <div>VITE_SUPABASE_ANON_KEY=your-anon-key-here</div>
                    </div>
                  </div>
                  
                  <Alert>
                    <Key className="w-4 h-4" />
                    <AlertDescription>
                      Replace "your-project-id" and "your-anon-key-here" with your actual Supabase credentials.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* Step 4: Run Migrations */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-600 text-white">Step 4</Badge>
                  <h3 className="text-lg font-semibold">Set Up Database Schema</h3>
                </div>
                
                <div className="pl-6 space-y-3">
                  <p className="text-slate-600">
                    Run the database migrations in your Supabase SQL editor:
                  </p>
                  
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://supabase.com/dashboard/project/_/sql" target="_blank" rel="noopener noreferrer">
                      <Database className="w-4 h-4 mr-2" />
                      Open SQL Editor
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  
                  <div className="text-sm text-slate-500 space-y-1">
                    <p>• Go to the SQL Editor in your Supabase dashboard</p>
                    <p>• Copy and run the migration files from supabase/migrations/</p>
                    <p>• Run them in order: schema first, then sample data</p>
                  </div>
                </div>
              </div>

              {/* Test Connection Button */}
              <div className="pt-4 border-t">
                <Button onClick={checkConnection} className="w-full" disabled={connectionStatus === 'checking'}>
                  {connectionStatus === 'checking' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Testing Connection...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Test Connection
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {connectionStatus === 'connected' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">All Set!</h3>
              <p className="text-green-600">Your database is connected and ready to use.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}