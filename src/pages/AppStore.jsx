
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppGrid from "@/components/AppGrid";
import { Search, Filter, Grid, List, Star, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import appsData from "@/data/apps.json";

export default function AppStore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load apps from JSON file
  useEffect(() => {
    console.log('Loading apps from JSON file...');
    setApps(appsData.apps);
    setIsLoading(false);
    console.log('Apps loaded successfully:', appsData.apps);
  }, []);

  // Get unique categories for filter
  const categories = [...new Set(apps.map(app => app.category).filter(Boolean))];

  // Filter and sort apps
  const filteredApps = apps
    .filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "downloads":
          return (b.download_count || 0) - (a.download_count || 0);
        case "updated":
          return new Date(b.updated_at) - new Date(a.updated_at);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header title="SiteSurveyor" subtitle="Open-Source Geomatics Tools" showSearch={true} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            App Store
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">
            Discover open-source geomatics applications built for professionals across Africa and beyond.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <Input
                className="pl-12 pr-6 py-3 text-base rounded-full border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                type="search"
                placeholder="Search apps, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 items-center">
              <Filter className="w-5 h-5 text-slate-600" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 rounded-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="flex gap-3 items-center">
              <Clock className="w-5 h-5 text-slate-600" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="updated">Last Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-full"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-full"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading apps...</p>
          </div>
        )}

        {/* Results Summary */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-slate-600 font-medium">
              Showing {filteredApps.length} of {apps.length} apps
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
          </div>
        )}

        {/* Apps Grid/List */}
        {!isLoading && (
          <AppGrid apps={filteredApps} viewMode={viewMode} />
        )}

        {/* No Results */}
        {!isLoading && filteredApps.length === 0 && apps.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 max-w-md mx-auto">
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 font-medium mb-2">No apps found</p>
              <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {!isLoading && apps.length > 0 && (
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Grid className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">{apps.length}</h3>
              <p className="text-slate-600 font-medium">Available Apps</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">
                {apps.reduce((sum, app) => sum + (app.download_count || 0), 0)}
              </h3>
              <p className="text-slate-600 font-medium">Total Downloads</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">{categories.length}</h3>
              <p className="text-slate-600 font-medium">Categories</p>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
