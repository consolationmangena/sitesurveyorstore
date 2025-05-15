import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from './components/ui/sonner'

// Layout Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Index from './pages/Index'
import About from './pages/About'
import AppStore from './pages/AppStore'
import AppDetail from './pages/AppDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import RequestSolution from './pages/RequestSolution'
import NotFound from './pages/NotFound'
import ProfilePage from './pages/ProfilePage'

// Auth Pages
import EmailCallback from './pages/auth/EmailCallback'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header title="SiteSurveyor" subtitle="Professional Geomatics Solutions" />
          <main className="flex-grow">
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/callback" element={<EmailCallback />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } />

              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/appstore" element={<AppStore />} />
              <Route path="/app/:id" element={<AppDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/request-solution" element={<RequestSolution />} />
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