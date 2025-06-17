import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  FileText, 
  Package, 
  MessageSquare, 
  BarChart3, 
  Settings,
  TrendingUp,
  Download,
  Eye,
  Heart,
  Shield,
  Database,
  Globe
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useApplications, useBlogPosts, useAppStats, useBlogStats } from '@/hooks/useDatabase'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { applications } = useApplications()
  const { posts } = useBlogPosts()
  const { stats: appStats } = useAppStats()
  const { stats: blogStats } = useBlogStats()

  // Check if user is admin
  React.useEffect(() => {
    const adminEmails = [
      'admin@sitesurveyor.store',
      'consolation@sitesurveyor.store',
      'support@sitesurveyor.store'
    ]
    
    if (!user || !adminEmails.includes(user.email?.toLowerCase())) {
      navigate('/admin/login')
    }
  }, [user, navigate])

  const dashboardCards = [
    {
      title: 'Applications',
      description: 'Manage apps and categories',
      icon: Package,
      value: applications?.length || 0,
      change: '+12%',
      color: 'from-blue-500 to-blue-600',
      route: '/admin/applications'
    },
    {
      title: 'Blog Posts',
      description: 'Content management',
      icon: FileText,
      value: posts?.length || 0,
      change: '+8%',
      color: 'from-green-500 to-green-600',
      route: '/admin/blog'
    },
    {
      title: 'Total Downloads',
      description: 'App downloads',
      icon: Download,
      value: appStats?.totalDownloads?.toLocaleString() || '0',
      change: '+23%',
      color: 'from-purple-500 to-purple-600',
      route: '/admin/analytics'
    },
    {
      title: 'Blog Views',
      description: 'Content engagement',
      icon: Eye,
      value: blogStats?.totalViews?.toLocaleString() || '0',
      change: '+15%',
      color: 'from-orange-500 to-orange-600',
      route: '/admin/analytics'
    }
  ]

  const quickActions = [
    {
      title: 'Manage Applications',
      description: 'Add, edit, or remove applications',
      icon: Package,
      color: 'bg-blue-500',
      route: '/admin/applications'
    },
    {
      title: 'Blog Management',
      description: 'Create and manage blog posts',
      icon: FileText,
      color: 'bg-green-500',
      route: '/admin/blog'
    },
    {
      title: 'User Management',
      description: 'View and manage user accounts',
      icon: Users,
      color: 'bg-purple-500',
      route: '/admin/users'
    },
    {
      title: 'Solution Requests',
      description: 'Review community requests',
      icon: MessageSquare,
      color: 'bg-orange-500',
      route: '/admin/requests'
    },
    {
      title: 'Categories',
      description: 'Manage app categories',
      icon: Database,
      color: 'bg-indigo-500',
      route: '/admin/categories'
    },
    {
      title: 'Analytics',
      description: 'View detailed statistics',
      icon: BarChart3,
      color: 'bg-pink-500',
      route: '/admin/analytics'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-slate-800 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Welcome back, {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-semibold text-sm">Admin Access</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm"
              onClick={() => navigate(card.route)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-800">
                      {card.value}
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                      {card.change}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardTitle className="text-lg font-bold text-slate-800 mb-1">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-slate-600 font-medium">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => navigate(action.route)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center shadow-lg`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-slate-600 font-medium text-sm">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications?.slice(0, 5).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div>
                      <h4 className="font-semibold text-slate-800">{app.name}</h4>
                      <p className="text-sm text-slate-600">{app.app_type === 'pro' ? 'Professional' : 'Open Source'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-800">
                        {app.download_count} downloads
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(app.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Recent Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts?.slice(0, 5).map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div>
                      <h4 className="font-semibold text-slate-800 line-clamp-1">{post.title}</h4>
                      <p className="text-sm text-slate-600">{post.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-800">
                        {post.view_count} views
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(post.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}