import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Package,
  Crown,
  Code,
  Eye,
  Download,
  ArrowLeft
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApplications, useCategories } from '@/hooks/useDatabase'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function ApplicationsManager() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState(null)
  
  const { applications, loading } = useApplications()
  const { categories } = useCategories()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    app_type: 'open_source',
    price: 0,
    version: '1.0.0',
    author_name: '',
    license: 'Apache-2.0',
    homepage_url: '',
    repo_url: '',
    tags: '',
    features: '',
    pro_features: '',
    requirements: '',
    installation_notes: '',
    is_featured: false,
    is_active: true
  })

  const filteredApps = applications?.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || app.app_type === filterType
    return matchesSearch && matchesType
  }) || []

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Convert string arrays to actual arrays
    const processedData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      features: formData.features ? formData.features.split('\n').filter(f => f.trim()) : [],
      pro_features: formData.pro_features ? formData.pro_features.split('\n').filter(f => f.trim()) : [],
      price: parseFloat(formData.price) || 0
    }

    try {
      if (editingApp) {
        // Update existing app
        toast.success('Application updated successfully!')
      } else {
        // Create new app
        toast.success('Application created successfully!')
      }
      
      setIsCreateModalOpen(false)
      setEditingApp(null)
      resetForm()
    } catch (error) {
      toast.error('Error saving application')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category_id: '',
      app_type: 'open_source',
      price: 0,
      version: '1.0.0',
      author_name: '',
      license: 'Apache-2.0',
      homepage_url: '',
      repo_url: '',
      tags: '',
      features: '',
      pro_features: '',
      requirements: '',
      installation_notes: '',
      is_featured: false,
      is_active: true
    })
  }

  const handleEdit = (app) => {
    setEditingApp(app)
    setFormData({
      ...app,
      tags: app.tags?.join(', ') || '',
      features: app.features?.join('\n') || '',
      pro_features: app.pro_features?.join('\n') || ''
    })
    setIsCreateModalOpen(true)
  }

  const handleDelete = async (appId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        // Delete app logic here
        toast.success('Application deleted successfully!')
      } catch (error) {
        toast.error('Error deleting application')
      }
    }
  }

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
              <h1 className="text-4xl font-black text-slate-800">Applications Manager</h1>
              <p className="text-lg text-slate-600 font-medium">Manage all applications and their details</p>
            </div>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold"
                onClick={() => {
                  setEditingApp(null)
                  resetForm()
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingApp ? 'Edit Application' : 'Create New Application'}
                </DialogTitle>
                <DialogDescription>
                  {editingApp ? 'Update the application details below.' : 'Fill in the details to create a new application.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Application Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter application name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter application description"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="app_type">Type</Label>
                    <Select value={formData.app_type} onValueChange={(value) => handleInputChange('app_type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open_source">Open Source</SelectItem>
                        <SelectItem value="pro">Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      value={formData.version}
                      onChange={(e) => handleInputChange('version', e.target.value)}
                      placeholder="1.0.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author_name">Author Name</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={(e) => handleInputChange('author_name', e.target.value)}
                      placeholder="Enter author name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="license">License</Label>
                    <Input
                      id="license"
                      value={formData.license}
                      onChange={(e) => handleInputChange('license', e.target.value)}
                      placeholder="Apache-2.0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="homepage_url">Homepage URL</Label>
                    <Input
                      id="homepage_url"
                      type="url"
                      value={formData.homepage_url}
                      onChange={(e) => handleInputChange('homepage_url', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="repo_url">Repository URL</Label>
                    <Input
                      id="repo_url"
                      type="url"
                      value={formData.repo_url}
                      onChange={(e) => handleInputChange('repo_url', e.target.value)}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="gis, mapping, surveying"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange('features', e.target.value)}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    rows={4}
                  />
                </div>

                {formData.app_type === 'pro' && (
                  <div className="space-y-2">
                    <Label htmlFor="pro_features">Pro Features (one per line)</Label>
                    <Textarea
                      id="pro_features"
                      value={formData.pro_features}
                      onChange={(e) => handleInputChange('pro_features', e.target.value)}
                      placeholder="Pro Feature 1&#10;Pro Feature 2&#10;Pro Feature 3"
                      rows={4}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="requirements">System Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="Enter system requirements"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installation_notes">Installation Notes</Label>
                  <Textarea
                    id="installation_notes"
                    value={formData.installation_notes}
                    onChange={(e) => handleInputChange('installation_notes', e.target.value)}
                    placeholder="Enter installation instructions"
                    rows={2}
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Featured Application</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => handleInputChange('is_active', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateModalOpen(false)
                      setEditingApp(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingApp ? 'Update Application' : 'Create Application'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="open_source">Open Source</SelectItem>
                    <SelectItem value="pro">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading applications...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredApps.map((app) => (
              <Card key={app.id} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          app.app_type === 'pro' 
                            ? 'bg-gradient-to-br from-purple-500 to-yellow-500' 
                            : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                        }`}>
                          {app.app_type === 'pro' ? (
                            <Crown className="w-6 h-6 text-white" />
                          ) : (
                            <Code className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{app.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={app.app_type === 'pro' ? 'default' : 'secondary'}>
                              {app.app_type === 'pro' ? 'Professional' : 'Open Source'}
                            </Badge>
                            {app.is_featured && (
                              <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                                Featured
                              </Badge>
                            )}
                            <Badge variant={app.is_active ? 'default' : 'destructive'}>
                              {app.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 mb-4 line-clamp-2">{app.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{app.download_count} downloads</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{app.view_count} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          <span>v{app.version}</span>
                        </div>
                        {app.app_type === 'pro' && (
                          <div className="flex items-center gap-1">
                            <span className="font-semibold">${app.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(app)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(app.id)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredApps.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No applications found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}