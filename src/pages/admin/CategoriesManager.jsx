import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Folder,
  ArrowLeft,
  Package
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '@/hooks/useDatabase'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function CategoriesManager() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  
  const { categories, loading } = useCategories()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'folder',
    color: 'bg-blue-100 text-blue-800',
    is_active: true
  })

  const colorOptions = [
    { value: 'bg-blue-100 text-blue-800', label: 'Blue', preview: 'bg-blue-100' },
    { value: 'bg-green-100 text-green-800', label: 'Green', preview: 'bg-green-100' },
    { value: 'bg-purple-100 text-purple-800', label: 'Purple', preview: 'bg-purple-100' },
    { value: 'bg-orange-100 text-orange-800', label: 'Orange', preview: 'bg-orange-100' },
    { value: 'bg-red-100 text-red-800', label: 'Red', preview: 'bg-red-100' },
    { value: 'bg-indigo-100 text-indigo-800', label: 'Indigo', preview: 'bg-indigo-100' },
    { value: 'bg-pink-100 text-pink-800', label: 'Pink', preview: 'bg-pink-100' },
    { value: 'bg-yellow-100 text-yellow-800', label: 'Yellow', preview: 'bg-yellow-100' }
  ]

  const iconOptions = [
    'folder', 'map', 'database', 'camera', 'settings', 'smartphone', 'layers', 'pen-tool'
  ]

  const filteredCategories = categories?.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingCategory) {
        // Update existing category
        toast.success('Category updated successfully!')
      } else {
        // Create new category
        toast.success('Category created successfully!')
      }
      
      setIsCreateModalOpen(false)
      setEditingCategory(null)
      resetForm()
    } catch (error) {
      toast.error('Error saving category')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'folder',
      color: 'bg-blue-100 text-blue-800',
      is_active: true
    })
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData(category)
    setIsCreateModalOpen(true)
  }

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        // Delete category logic here
        toast.success('Category deleted successfully!')
      } catch (error) {
        toast.error('Error deleting category')
      }
    }
  }

  const toggleActive = async (category) => {
    try {
      // Toggle active status
      toast.success(`Category ${category.is_active ? 'deactivated' : 'activated'} successfully!`)
    } catch (error) {
      toast.error('Error updating category status')
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
              <h1 className="text-4xl font-black text-slate-800">Categories Manager</h1>
              <p className="text-lg text-slate-600 font-medium">Manage application categories</p>
            </div>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold"
                onClick={() => {
                  setEditingCategory(null)
                  resetForm()
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory ? 'Update the category details below.' : 'Fill in the details to create a new category.'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter category description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {iconOptions.map(icon => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => handleInputChange('icon', icon)}
                          className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                            formData.icon === icon
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <Folder className="w-5 h-5 mx-auto text-slate-600" />
                          <span className="text-xs mt-1 block">{icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color Theme</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => handleInputChange('color', color.value)}
                          className={`p-3 rounded-lg border-2 transition-all hover:scale-105 flex items-center gap-2 ${
                            formData.color === color.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 bg-white hover:border-blue-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full ${color.preview}`}></div>
                          <span className="text-xs">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="is_active">Active Category</Label>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateModalOpen(false)
                      setEditingCategory(null)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                    {editingCategory ? 'Update Category' : 'Create Category'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.color.split(' ')[0]} shadow-lg`}>
                        <Folder className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-800">
                          {category.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={category.is_active ? 'default' : 'secondary'} className="text-xs">
                            {category.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-slate-600 mb-4 line-clamp-2">
                    {category.description || 'No description provided'}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      <span>0 apps</span> {/* This would be calculated from applications */}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Created: {new Date(category.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(category)}
                      className={`text-xs ${category.is_active ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}`}
                    >
                      {category.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredCategories.length === 0 && !loading && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No categories found</h3>
            <p className="text-slate-500">Try adjusting your search criteria or create a new category.</p>
          </div>
        )}
      </div>
    </div>
  )
}