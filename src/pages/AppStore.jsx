import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppGrid from "@/components/AppGrid";
import { Search, Filter, Grid, List, Star, Download, Clock, TrendingUp, Sparkles, Package, Users, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplications, useCategories, useAppStats } from "@/hooks/useDatabase";

export default function AppStore() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [appTypeFilter, setAppTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Database hooks
  const { categories } = useCategories();
  const { stats } = useAppStats();
  
  // Build filters for applications
  const filters = {
    ...(searchTerm && { search: searchTerm }),
    ...(selectedCategory !== "all" && { category: selectedCategory }),
    ...(appTypeFilter !== "all" && { app_type: appTypeFilter })
  };
  
  const { applications, loading, error } = useApplications(filters);

  // Sort applications
  const sortedApplications = [...(applications || [])].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "downloads":
        return (b.download_count || 0) - (a.download_count || 0);
      case "updated":
        return new Date(b.updated_at) - new Date(a.updated_at);
      case "price":
        if (a.app_type === 'open_source' && b.app_type === 'pro') return -1;
        if (a.app_type === 'pro' && b.app_type === 'open_source') return 1;
        if (a.app_type === 'pro' && b.app_type === 'pro') {
          return (a.price || 0) - (b.price || 0);
        }
        return 0;
      default:
        return 0;
    }
  });

  // Handle search from header
  const handleHeaderSearch = (term) => {
    setSearchTerm(term);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header title="SiteSurveyor" subtitle="Professional Geomatics Solutions" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-4">Error Loading Applications</h1>
          <p className="text-lg text-slate-600 mb-8">There was a problem loading the applications. Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header 
        title="SiteSurveyor" 
        subtitle="Professional Geomatics Solutions" 
        showSearch={true} 
        onSearch={handleHeaderSearch} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          </div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-600 flex items-center justify-center shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Professional App Store
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
              Discover our comprehensive collection of geomatics applications. 
              From free open-source tools to premium professional solutions - everything you need for modern surveying and GIS work.
            </p>
            
            {stats && (
              <div className="flex items-center justify-center gap-8 text-lg flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-blue-800">{stats.total}</span>
                  <span className="text-blue-600 font-medium">Total Apps</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-800">{stats.openSource}</span>
                  <span className="text-green-600 font-medium">Free & Open</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200">
                  <Crown className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800">{stats.pro}</span>
                  <span className="text-purple-600 font-medium">Pro Apps</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200">
                  <Download className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-yellow-800">{stats.totalDownloads?.toLocaleString()}</span>
                  <span className="text-yellow-600 font-medium">Downloads</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Search and Filter Controls */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Enhanced Search Input */}
              <div className="relative flex-1 w-full lg:w-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6 group-hover:text-blue-600 transition-colors" />
                  <Input
                    className="pl-14 pr-8 py-4 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl"
                    type="search"
                    placeholder="Search apps, descriptions, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Enhanced Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* App Type Filter */}
                <div className="flex gap-3 items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200">
                  <Zap className="w-5 h-5 text-slate-600" />
                  <Select value={appTypeFilter} onValueChange={setAppTypeFilter}>
                    <SelectTrigger className="w-44 rounded-xl border-0 bg-transparent focus:ring-0 font-medium">
                      <SelectValue placeholder="App Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate-200 shadow-2xl">
                      <SelectItem value="all" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          All Apps ({stats?.total || 0})
                        </div>
                      </SelectItem>
                      <SelectItem value="open_source" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Free & Open Source ({stats?.openSource || 0})
                        </div>
                      </SelectItem>
                      <SelectItem value="pro" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          Professional ({stats?.pro || 0})
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200">
                  <Filter className="w-5 h-5 text-slate-600" />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-52 rounded-xl border-0 bg-transparent focus:ring-0 font-medium">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate-200 shadow-2xl">
                      <SelectItem value="all" className="rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          All Categories
                        </div>
                      </SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name} className="rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-200">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 rounded-xl border-0 bg-transparent focus:ring-0 font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-2 border-slate-200 shadow-2xl">
                      <SelectItem value="name" className="rounded-lg">Name A-Z</SelectItem>
                      <SelectItem value="downloads" className="rounded-lg">Most Downloaded</SelectItem>
                      <SelectItem value="updated" className="rounded-lg">Recently Updated</SelectItem>
                      <SelectItem value="price" className="rounded-lg">Price: Low to High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Enhanced View Mode Toggle */}
                <div className="flex gap-2 bg-slate-100 rounded-2xl p-2 border border-slate-200">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl transition-all duration-200 ${
                      viewMode === "grid" 
                        ? "bg-white shadow-lg hover:shadow-xl scale-105" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl transition-all duration-200 ${
                      viewMode === "list" 
                        ? "bg-white shadow-lg hover:shadow-xl scale-105" 
                        : "hover:bg-white/50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 animate-pulse"></div>
              <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 shadow-lg"></div>
            </div>
            <p className="mt-6 text-xl text-slate-600 animate-pulse font-medium">Loading professional apps...</p>
          </div>
        )}

        {/* Enhanced Results Summary */}
        {!loading && (
          <div className="mb-8 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg text-slate-700 font-medium">
                    Showing <span className="font-black text-blue-600 text-xl">{sortedApplications.length}</span> of <span className="font-bold text-slate-800">{stats?.total || 0}</span> apps
                    {searchTerm && (
                      <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        for "{searchTerm}"
                      </span>
                    )}
                    {selectedCategory !== "all" && (
                      <span className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
                        in {selectedCategory}
                      </span>
                    )}
                    {appTypeFilter !== "all" && (
                      <span className="ml-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                        {appTypeFilter === 'open_source' ? 'Free & Open Source' : 'Professional'}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>Curated & Verified</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Apps Grid/List */}
        {!loading && (
          <div className="animate-fade-in">
            <AppGrid apps={sortedApplications} viewMode={viewMode} />
          </div>
        )}

        {/* Enhanced No Results */}
        {!loading && sortedApplications.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative bg-white/90 backdrop-blur-sm border-2 border-slate-200 rounded-3xl p-12 shadow-2xl hover:shadow-3xl transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">No apps found</h3>
                <p className="text-slate-600 font-medium mb-8 leading-relaxed">
                  We couldn't find any apps matching your criteria. Try adjusting your search or filter settings.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setAppTypeFilter("all");
                  }}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Section */}
        {!loading && stats && (
          <div className="mt-20 animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-slate-800 mb-4">Platform Statistics</h2>
              <p className="text-lg text-slate-600 font-medium">Real-time insights into our growing ecosystem</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Grid className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-800 mb-2">{stats.total}</h3>
                  <p className="text-slate-600 font-semibold text-lg">Total Apps</p>
                  <div className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-800 mb-2">{stats.openSource}</h3>
                  <p className="text-slate-600 font-semibold text-lg">Free & Open Source</p>
                  <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-yellow-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-800 mb-2">{stats.pro}</h3>
                  <p className="text-slate-600 font-semibold text-lg">Professional Apps</p>
                  <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-yellow-500 rounded-full"></div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 text-center hover:scale-105 transition-all duration-300 group-hover:shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-slate-800 mb-2">
                    {stats.totalDownloads?.toLocaleString()}
                  </h3>
                  <p className="text-slate-600 font-semibold text-lg">Total Downloads</p>
                  <div className="mt-4 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}