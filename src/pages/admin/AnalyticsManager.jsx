import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3,
  TrendingUp,
  Download,
  Eye,
  Users,
  Package,
  FileText,
  MessageSquare,
  ArrowLeft,
  Calendar,
  Globe,
  Star,
  Heart
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApplications, useBlogPosts, useAppStats, useBlogStats } from '@/hooks/useDatabase'

export default function AnalyticsManager() {
  const navigate = useNavigate()
  const { applications } = useApplications()
  const { posts } = useBlogPosts()
  const { stats: appStats } = useAppStats()
  const { stats: blogStats } = useBlogStats()

  // Mock analytics data - replace with real data
  const analyticsData = {
    totalUsers: 2847,
    totalDownloads: appStats?.totalDownloads || 25420,
    totalViews: blogStats?.totalViews || 156789,
    totalApps: applications?.length || 23,
    totalPosts: posts?.length || 47,
    monthlyGrowth: {
      users: 12.5,
      downloads: 23.8,
      views: 15.2
    },
    topApps: applications?.slice(0, 5) || [],
    topPosts: posts?.slice(0, 5) || [],
    recentActivity: [
      { type: 'download', app: 'QGIS', count: 45, time: '2 hours ago' },
      { type: 'view', post: 'AI in Geomatics', count: 23, time: '3 hours ago' },
      { type: 'signup', user: 'john.doe@example.com', time: '5 hours ago' },
      { type: 'download', app: 'FieldMapper', count: 12, time: '6 hours ago' }
    ]
  }

  const statCards = [
    {
      title: 'Total Users',
      value: analyticsData.totalUsers.toLocaleString(),
      change: `+${analyticsData.monthlyGrowth.users}%`,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Registered users'
    },
    {
      title: 'Total Downloads',
      value: analyticsData.totalDownloads.toLocaleString(),
      change: `+${analyticsData.monthlyGrowth.downloads}%`,
      icon: Download,
      color: 'from-green-500 to-green-600',
      description: 'App downloads'
    },
    {
      title: 'Blog Views',
      value: analyticsData.totalViews.toLocaleString(),
      change: `+${analyticsData.monthlyGrowth.views}%`,
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      description: 'Total blog views'
    },
    {
      title: 'Applications',
      value: analyticsData.totalApps,
      change: '+3 this month',
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      description: 'Published apps'
    },
    {
      title: 'Blog Posts',
      value: analyticsData.totalPosts,
      change: '+5 this month',
      icon: FileText,
      color: 'from-pink-500 to-pink-600',
      description: 'Published posts'
    },
    {
      title: 'Engagement Rate',
      value: '68.5%',
      change: '+4.2%',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      description: 'User engagement'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-4xl font-black text-slate-800">Analytics Dashboard</h1>
              <p className="text-lg text-slate-600 font-medium">Comprehensive platform analytics and insights</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-semibold text-sm">All metrics trending up</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-black text-slate-800 mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.description}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="text-sm font-semibold text-green-600">{stat.change}</div>
                  <div className="text-xs text-slate-500">vs last month</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Applications */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Top Applications
              </CardTitle>
              <CardDescription>Most downloaded applications this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topApps.map((app, index) => (
                  <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{app.name}</h4>
                        <p className="text-sm text-slate-600">{app.app_type === 'pro' ? 'Professional' : 'Open Source'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-800">
                        {app.download_count?.toLocaleString()} downloads
                      </div>
                      <div className="text-xs text-green-600">
                        +{Math.floor(Math.random() * 20 + 5)}% this month
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Blog Posts */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Top Blog Posts
              </CardTitle>
              <CardDescription>Most viewed blog posts this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 line-clamp-1">{post.title}</h4>
                        <p className="text-sm text-slate-600">{post.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-800">
                        {post.view_count?.toLocaleString()} views
                      </div>
                      <div className="text-xs text-green-600">
                        +{Math.floor(Math.random() * 30 + 10)}% this month
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activity and user interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'download' ? 'bg-blue-100' :
                      activity.type === 'view' ? 'bg-green-100' :
                      activity.type === 'signup' ? 'bg-purple-100' : 'bg-orange-100'
                    }`}>
                      {activity.type === 'download' && <Download className="w-5 h-5 text-blue-600" />}
                      {activity.type === 'view' && <Eye className="w-5 h-5 text-green-600" />}
                      {activity.type === 'signup' && <Users className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {activity.type === 'download' && `${activity.app} downloaded`}
                        {activity.type === 'view' && `${activity.post} viewed`}
                        {activity.type === 'signup' && `New user registered`}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {activity.type === 'download' && `${activity.count} downloads`}
                        {activity.type === 'view' && `${activity.count} views`}
                        {activity.type === 'signup' && activity.user}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>User distribution by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { country: 'Zimbabwe', users: 847, percentage: 29.8 },
                  { country: 'South Africa', users: 623, percentage: 21.9 },
                  { country: 'Kenya', users: 456, percentage: 16.0 },
                  { country: 'Nigeria', users: 389, percentage: 13.7 },
                  { country: 'Ghana', users: 234, percentage: 8.2 },
                  { country: 'Others', users: 298, percentage: 10.4 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                        {item.country.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-800">{item.country}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-slate-800">{item.users} users</div>
                      <div className="text-xs text-slate-500">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                Platform Health
              </CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">User Retention</span>
                    <span className="text-sm font-semibold text-green-600">85.2%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85.2%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">App Success Rate</span>
                    <span className="text-sm font-semibold text-blue-600">92.7%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92.7%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Content Engagement</span>
                    <span className="text-sm font-semibold text-purple-600">78.9%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78.9%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">Platform Uptime</span>
                    <span className="text-sm font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}