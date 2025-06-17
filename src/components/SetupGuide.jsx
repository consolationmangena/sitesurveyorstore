import React from 'react'
import { AlertTriangle, ExternalLink, Copy, Check } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const SetupGuide = () => {
  const [copied, setCopied] = React.useState('')

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  const envTemplate = `# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google OAuth (optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-amber-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Setup Required</h1>
          </div>
          <p className="text-lg text-gray-600">
            SiteSurveyor needs to be configured with your Supabase credentials to work properly.
          </p>
        </div>

        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Supabase not configured:</strong> The application cannot connect to the database. 
            Please follow the setup steps below to get started.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                Create Supabase Project
              </CardTitle>
              <CardDescription>
                Set up a new Supabase project if you haven't already
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Go to Supabase and create a new project. This will give you the database and authentication services needed for SiteSurveyor.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Supabase Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                Get API Credentials
              </CardTitle>
              <CardDescription>
                Copy your project URL and anonymous key from Supabase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                In your Supabase project dashboard, go to Settings → API to find your project URL and anon public key.
              </p>
              <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <strong>Project URL:</strong> https://your-project.supabase.co<br />
                <strong>Anon Key:</strong> eyJ... (long string)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                Create Environment File
              </CardTitle>
              <CardDescription>
                Set up your local environment variables
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Create a <code className="bg-gray-100 px-1 rounded">.env</code> file in your project root with your Supabase credentials:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                  {envTemplate}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(envTemplate, 'env')}
                >
                  {copied === 'env' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
                Restart Development Server
              </CardTitle>
              <CardDescription>
                Apply your configuration changes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                After creating your .env file, restart the development server to apply the changes:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs">
                  npm run dev
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard('npm run dev', 'cmd')}
                >
                  {copied === 'cmd' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Additional resources and support options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button 
                variant="outline" 
                onClick={() => window.open('https://supabase.com/docs/guides/getting-started', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Supabase Docs
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://github.com/consolationmangena/sitesurveyor', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub Repository
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:support@sitesurveyor.store', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Get Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SetupGuide