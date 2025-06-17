import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter,
  MessageSquare,
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Mail,
  AlertCircle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function RequestsManager() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  
  // Mock data - replace with actual data fetching
  const [requests] = useState([
    {
      id: '1',
      email: 'john.doe@example.com',
      problem: 'Need a tool for automated boundary detection from drone imagery. Current manual process takes too long and is prone to errors.',
      category: 'field-tools',
      urgency: 'high',
      location: 'Nairobi, Kenya',
      organization: 'GeoSurvey Ltd',
      status: 'pending',
      admin_notes: '',
      created_at: '2024-03-15T10:30:00Z',
      updated_at: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      email: 'sarah.wilson@university.edu',
      problem: 'Looking for an open-source alternative to expensive GIS software for teaching purposes. Need basic analysis tools.',
      category: 'software',
      urgency: 'medium',
      location: 'Cape Town, South Africa',
      organization: 'University of Cape Town',
      status: 'reviewing',
      admin_notes: 'Reviewing existing open-source options',
      created_at: '2024-03-14T14:20:00Z',
      updated_at: '2024-03-15T09:15:00Z'
    },
    {
      id: '3',
      email: 'mike.chen@consulting.com',
      problem: 'Need better coordinate conversion tools that work offline. Current tools require internet connection.',
      category: 'utilities',
      urgency: 'low',
      location: 'Lagos, Nigeria',
      organization: 'Chen Consulting',
      status: 'completed',
      admin_notes: 'Developed Coordinate Converter Pro - available in app store',
      created_at: '2024-03-10T08:45:00Z',
      updated_at: '2024-03-12T16:30:00Z'
    }
  ])

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'reviewing', label: 'Reviewing', color: 'bg-blue-100 text-blue-800' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
  ]

  const categoryOptions = [
    { value: 'field-tools', label: 'Field Tools & Equipment', icon: '🏗️' },
    { value: 'software', label: 'Software & Applications', icon: '💻' },
    { value: 'data-processing', label: 'Data Processing & Analysis', icon: '📊' },
    { value: 'collaboration', label: 'Team Collaboration', icon: '🤝' },
    { value: 'education', label: 'Education & Training', icon: '🎓' },
    { value: 'other', label: 'Other', icon: '💡' }
  ]

  const urgencyOptions = [
    { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ]

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus
    const matchesCategory = filterCategory === 'all' || request.category === filterCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleStatusUpdate = async (requestId, newStatus, adminNotes = '') => {
    try {
      // Update request status logic here
      toast.success('Request status updated successfully!')
      setIsDetailModalOpen(false)
    } catch (error) {
      toast.error('Error updating request status')
    }
  }

  const handleViewDetails = (request) => {
    setSelectedRequest(request)
    setIsDetailModalOpen(true)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'reviewing':
        return <AlertCircle className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'rejected':
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(opt => opt.value === status)
    return statusOption?.color || 'bg-gray-100 text-gray-800'
  }

  const getCategoryLabel = (category) => {
    const categoryOption = categoryOptions.find(opt => opt.value === category)
    return categoryOption?.label || category
  }

  const getCategoryIcon = (category) => {
    const categoryOption = categoryOptions.find(opt => opt.value === category)
    return categoryOption?.icon || '💡'
  }

  const getUrgencyColor = (urgency) => {
    const urgencyOption = urgencyOptions.find(opt => opt.value === urgency)
    return urgencyOption?.color || 'bg-gray-100 text-gray-800'
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
              <h1 className="text-4xl font-black text-slate-800">Solution Requests</h1>
              <p className="text-lg text-slate-600 font-medium">Manage community solution requests</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">{requests.length} Total Requests</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryOptions.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="grid gap-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{getCategoryIcon(request.category)}</div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {getCategoryLabel(request.category)}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">{statusOptions.find(s => s.value === request.status)?.label}</span>
                          </Badge>
                          <Badge className={getUrgencyColor(request.urgency)}>
                            {urgencyOptions.find(u => u.value === request.urgency)?.label} Priority
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">{request.problem}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{request.email}</span>
                      </div>
                      {request.organization && (
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          <span className="truncate">{request.organization}</span>
                        </div>
                      )}
                      {request.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{request.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(request.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {request.admin_notes && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Admin Notes:</strong> {request.admin_notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(request)}
                      className="flex items-center gap-1"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No requests found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Request Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedRequest && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(selectedRequest.category)}</span>
                    Solution Request Details
                  </DialogTitle>
                  <DialogDescription>
                    Submitted on {new Date(selectedRequest.created_at).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Request Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-semibold text-slate-700">Contact Email</Label>
                        <p className="text-slate-800">{selectedRequest.email}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-semibold text-slate-700">Category</Label>
                        <p className="text-slate-800">{getCategoryLabel(selectedRequest.category)}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-semibold text-slate-700">Priority</Label>
                        <Badge className={getUrgencyColor(selectedRequest.urgency)}>
                          {urgencyOptions.find(u => u.value === selectedRequest.urgency)?.label}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedRequest.organization && (
                        <div>
                          <Label className="text-sm font-semibold text-slate-700">Organization</Label>
                          <p className="text-slate-800">{selectedRequest.organization}</p>
                        </div>
                      )}
                      
                      {selectedRequest.location && (
                        <div>
                          <Label className="text-sm font-semibold text-slate-700">Location</Label>
                          <p className="text-slate-800">{selectedRequest.location}</p>
                        </div>
                      )}
                      
                      <div>
                        <Label className="text-sm font-semibold text-slate-700">Current Status</Label>
                        <Badge className={getStatusColor(selectedRequest.status)}>
                          {getStatusIcon(selectedRequest.status)}
                          <span className="ml-1">{statusOptions.find(s => s.value === selectedRequest.status)?.label}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Problem Description */}
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">Problem Description</Label>
                    <div className="mt-2 p-4 bg-slate-50 rounded-lg border">
                      <p className="text-slate-800 whitespace-pre-wrap">{selectedRequest.problem}</p>
                    </div>
                  </div>
                  
                  {/* Admin Notes */}
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">Admin Notes</Label>
                    <Textarea
                      placeholder="Add notes about this request..."
                      defaultValue={selectedRequest.admin_notes}
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                  
                  {/* Status Update */}
                  <div>
                    <Label className="text-sm font-semibold text-slate-700">Update Status</Label>
                    <div className="flex items-center gap-4 mt-2">
                      {statusOptions.map(status => (
                        <Button
                          key={status.value}
                          variant={selectedRequest.status === status.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleStatusUpdate(selectedRequest.id, status.value)}
                          className="flex items-center gap-1"
                        >
                          {getStatusIcon(status.value)}
                          {status.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setIsDetailModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(selectedRequest.id, selectedRequest.status)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}