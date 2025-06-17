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
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <Router basename="/sitesurveyor">
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App