import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter,
  Users,
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Mail,
  Shield,
  Edit,
  Ban,
  CheckCircle,
  Globe,
  Github,
  Linkedin
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function UsersManager() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVerified, setFilterVerified] = useState('all')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  
  // Mock data - replace with actual data fetching
  const [users] = useState([
    {
      id: '1',
      full_name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      organization: 'GeoSurvey Ltd',
      location: 'Nairobi, Kenya',
      bio: 'Professional land surveyor with 10+ years experience',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      website: 'https://johndoe.com',
      linkedin_url: 'https://linkedin.com/in/johndoe',
      github_url: 'https://github.com/johndoe',
      is_verified: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-03-15T10:30:00Z'
    },
    {
      id: '2',
      full_name: 'Sarah Wilson',
      username: 'sarahw',
      email: 'sarah.wilson@university.edu',
      organization: 'University of Cape Town',
      location: 'Cape Town, South Africa',
      bio: 'GIS researcher and educator',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      website: null,
      linkedin_url: 'https://linkedin.com/in/sarahwilson',
      github_url: null,
      is_verified: false,
      created_at: '2024-02-20T14:20:00Z',
      updated_at: '2024-03-10T09:15:00Z'
    },
    {
      id: '3',
      full_name: 'Mike Chen',
      username: 'mikechen',
      email: 'mike.chen@consulting.com',
      organization: 'Chen Consulting',
      location: 'Lagos, Nigeria',
      bio: 'Geomatics consultant specializing in urban planning',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      website: 'https://chenconsulting.com',
      linkedin_url: null,
      github_url: 'https://github.com/mikechen',
      is_verified: true,
      created_at: '2024-01-05T08:45:00Z',
      updated_at: '2024-03-12T16:30:00Z'
    }
  ])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVerified = filterVerified === 'all' || 
                           (filterVerified === 'verified' && user.is_verified) ||
                           (filterVerified === 'unverified' && !user.is_verified)
    return matchesSearch && matchesVerified
  })

  const handleVerifyUser = async (userId) => {
    try {
      // Verify user logic here
      toast.success('User verified successfully!')
    } catch (error) {
      toast.error('Error verifying user')
    }
  }

  const handleSuspendUser = async (userId) => {
    if (window.confirm('Are you sure you want to suspend this user?')) {
      try {
        // Suspend user logic here
        toast.success('User suspended successfully!')
      } catch (error) {
        toast.error('Error suspending user')
      }
    }
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
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
              <h1 className="text-4xl font-black text-slate-800">Users Manager</h1>
              <p className="text-lg text-slate-600 font-medium">Manage user accounts and profiles</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border border-purple-200">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-purple-700 font-semibold text-sm">{users.length} Total Users</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-600" />
                <select
                  value={filterVerified}
                  onChange={(e) => setFilterVerified(e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg bg-white text-sm"
                >
                  <option value="all">All Users</option>
                  <option value="verified">Verified Only</option>
                  <option value="unverified">Unverified Only</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.username)}&background=random`}
                      alt={user.full_name || user.username}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {user.is_verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-slate-800 line-clamp-1">
                      {user.full_name || user.username}
                    </CardTitle>
                    <p className="text-sm text-slate-600">@{user.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={user.is_verified ? 'default' : 'secondary'} className="text-xs">
                        {user.is_verified ? 'Verified' : 'Unverified'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  
                  {user.organization && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{user.organization}</span>
                    </div>
                  )}
                  
                  {user.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{user.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  {user.bio && (
                    <p className="text-sm text-slate-600 line-clamp-2 mt-2">
                      {user.bio}
                    </p>
                  )}
                  
                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-2">
                    {user.website && (
                      <a 
                        href={user.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Globe className="w-4 h-4 text-slate-600" />
                      </a>
                    )}
                    {user.github_url && (
                      <a 
                        href={user.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Github className="w-4 h-4 text-slate-600" />
                      </a>
                    )}
                    {user.linkedin_url && (
                      <a 
                        href={user.linkedin_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-slate-600" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(user)}
                    className="flex-1 text-xs"
                  >
                    View Details
                  </Button>
                  {!user.is_verified && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerifyUser(user.id)}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Shield className="w-3 h-3" />
                      Verify
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuspendUser(user.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Ban className="w-3 h-3" />
                    Suspend
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No users found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* User Detail Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-2xl">
            {selectedUser && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <img 
                      src={selectedUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.full_name || selectedUser.username)}&background=random`}
                      alt={selectedUser.full_name || selectedUser.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        {selectedUser.full_name || selectedUser.username}
                        {selectedUser.is_verified && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 font-normal">@{selectedUser.username}</p>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    User account details and activity
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-500" />
                          <span>{selectedUser.email}</span>
                        </div>
                        {selectedUser.organization && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-slate-500" />
                            <span>{selectedUser.organization}</span>
                          </div>
                        )}
                        {selectedUser.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-500" />
                            <span>{selectedUser.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Account Status</h4>
                      <div className="space-y-2">
                        <Badge variant={selectedUser.is_verified ? 'default' : 'secondary'}>
                          {selectedUser.is_verified ? 'Verified Account' : 'Unverified Account'}
                        </Badge>
                        <div className="text-sm text-slate-600">
                          <p>Joined: {new Date(selectedUser.created_at).toLocaleDateString()}</p>
                          <p>Last updated: {new Date(selectedUser.updated_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {selectedUser.bio && (
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">Bio</h4>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                        {selectedUser.bio}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Social Links</h4>
                    <div className="flex items-center gap-4">
                      {selectedUser.website && (
                        <a 
                          href={selectedUser.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Globe className="w-4 h-4" />
                          Website
                        </a>
                      )}
                      {selectedUser.github_url && (
                        <a 
                          href={selectedUser.github_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {selectedUser.linkedin_url && (
                        <a 
                          href={selectedUser.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
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
                  {!selectedUser.is_verified && (
                    <Button
                      onClick={() => {
                        handleVerifyUser(selectedUser.id)
                        setIsDetailModalOpen(false)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Verify User
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}