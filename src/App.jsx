import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { isSupabaseConfigured } from './lib/supabase'
import Header from './components/Header'
import Footer from './components/Footer'
import Index from './pages/Index'
import About from './pages/About'
import AppStore from './pages/AppStore'
import AppDetail from './pages/AppDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import RequestSolution from './pages/RequestSolution'
import Profile from './pages/Profile'
import AuthCallback from './pages/AuthCallback'
import NotFound from './pages/NotFound'
import SetupGuide from './components/SetupGuide'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { Toaster } from './components/ui/sonner'

function App() {
  // Show setup guide if Supabase is not configured
  if (!isSupabaseConfigured) {
    return <SetupGuide />
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/appstore" element={<AppStore />} />
              <Route path="/app/:id" element={<AppDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/request-solution" element={<RequestSolution />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App