import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Index from './pages/Index'
import About from './pages/About'
import AppStore from './pages/AppStore'
import AppDetail from './pages/AppDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import RequestSolution from './pages/RequestSolution'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ApplicationsManager from './pages/admin/ApplicationsManager'
import BlogManager from './pages/admin/BlogManager'
import CategoriesManager from './pages/admin/CategoriesManager'
import RequestsManager from './pages/admin/RequestsManager'
import UsersManager from './pages/admin/UsersManager'
import AnalyticsManager from './pages/admin/AnalyticsManager'

import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/AuthContext'
import { AdminProvider } from './contexts/AdminContext'

function App() {
  // No need for different basename on Netlify
  const basename = '/'
  
  return (
    <AuthProvider>
      <AdminProvider>
        <Router basename={basename}>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Routes>
              {/* Admin Routes - No Header/Footer */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/applications" element={<ApplicationsManager />} />
              <Route path="/admin/blog" element={<BlogManager />} />
              <Route path="/admin/categories" element={<CategoriesManager />} />
              <Route path="/admin/requests" element={<RequestsManager />} />
              <Route path="/admin/users" element={<UsersManager />} />
              <Route path="/admin/analytics" element={<AnalyticsManager />} />
              
              {/* Public Routes - With Header/Footer */}
              <Route path="/*" element={
                <>
                  <Header title="SiteSurveyor" subtitle="Professional Geomatics Solutions" />
                  <main className="flex-grow">
                    <Routes>
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
                </>
              } />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App