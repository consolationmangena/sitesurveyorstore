
import { useState } from "react";
import { Search, Filter, Star, Download, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface App {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  rating: number;
  downloads: string;
  version: string;
  developer: string;
  screenshots: string[];
  features: string[];
  repoUrl: string;
  demoUrl?: string;
  icon: string;
  tags: string[];
}

const SAMPLE_APPS: App[] = [
  {
    id: "1",
    name: "GeoMapper Pro",
    description: "Professional mapping and surveying application for field work",
    longDescription: "A comprehensive mapping solution designed for surveyors, engineers, and GIS professionals. Features real-time GPS tracking, offline map support, and advanced measurement tools.",
    category: "Mapping",
    rating: 4.8,
    downloads: "12.5K",
    version: "2.1.0",
    developer: "SiteSurveyor Team",
    screenshots: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"],
    features: ["Real-time GPS", "Offline Maps", "CAD Integration", "Export to Multiple Formats"],
    repoUrl: "https://github.com/sitesurveyor/geomapper-pro",
    demoUrl: "https://demo.geomapper.com",
    icon: "🗺️",
    tags: ["GPS", "Surveying", "CAD", "Professional"]
  },
  {
    id: "2",
    name: "DroneView Analytics",
    description: "AI-powered drone image analysis and photogrammetry toolkit",
    longDescription: "Advanced photogrammetry software that processes drone imagery to create accurate 3D models, orthomosaics, and detailed survey reports using machine learning algorithms.",
    category: "Remote Sensing",
    rating: 4.7,
    downloads: "8.2K",
    version: "1.8.3",
    developer: "AeroTech Solutions",
    screenshots: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop"],
    features: ["AI-Powered Analysis", "3D Modeling", "Orthomosaic Generation", "Volume Calculations"],
    repoUrl: "https://github.com/sitesurveyor/droneview-analytics",
    icon: "🚁",
    tags: ["AI", "Drones", "3D Modeling", "Analysis"]
  },
  {
    id: "3",
    name: "FieldLogger Mobile",
    description: "Comprehensive field data collection and management system",
    longDescription: "Mobile-first application for collecting, organizing, and managing field data. Works seamlessly offline and syncs when connected to ensure no data loss during field operations.",
    category: "Data Collection",
    rating: 4.9,
    downloads: "15.7K",
    version: "3.2.1",
    developer: "FieldTech Inc",
    screenshots: ["https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"],
    features: ["Offline Sync", "Photo Attachment", "GPS Coordinates", "Custom Forms"],
    repoUrl: "https://github.com/sitesurveyor/fieldlogger-mobile",
    demoUrl: "https://demo.fieldlogger.com",
    icon: "📋",
    tags: ["Mobile", "Offline", "Forms", "GPS"]
  },
  {
    id: "4",
    name: "SpatialDB Manager",
    description: "Visual database management for geospatial datasets",
    longDescription: "Intuitive database management tool specifically designed for geospatial data. Supports PostGIS, GeoPackage, and various spatial formats with advanced querying capabilities.",
    category: "Database",
    rating: 4.6,
    downloads: "6.3K",
    version: "1.5.2",
    developer: "DataSpatial Corp",
    screenshots: ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"],
    features: ["PostGIS Support", "Visual Query Builder", "Data Import/Export", "Schema Management"],
    repoUrl: "https://github.com/sitesurveyor/spatialdb-manager",
    icon: "🗄️",
    tags: ["Database", "PostGIS", "SQL", "Management"]
  },
  {
    id: "5",
    name: "LandParcel Designer",
    description: "Interactive land parcel planning and visualization tool",
    longDescription: "Professional tool for land developers and planners to design, visualize, and manage land parcels. Includes zoning compliance checks and automated area calculations.",
    category: "Planning",
    rating: 4.5,
    downloads: "4.1K",
    version: "2.0.0",
    developer: "UrbanPlan Studio",
    screenshots: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"],
    features: ["Zoning Compliance", "Area Calculations", "3D Visualization", "Regulatory Reports"],
    repoUrl: "https://github.com/sitesurveyor/landparcel-designer",
    demoUrl: "https://demo.landparcel.com",
    icon: "🏘️",
    tags: ["Planning", "Zoning", "3D", "Compliance"]
  },
  {
    id: "6",
    name: "TopoSurveyor",
    description: "Advanced topographic surveying and contour generation",
    longDescription: "Professional-grade topographic surveying software that generates accurate contour maps, cross-sections, and elevation profiles from survey data points.",
    category: "Surveying",
    rating: 4.8,
    downloads: "9.8K",
    version: "1.9.5",
    developer: "TopoTech Solutions",
    screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"],
    features: ["Contour Generation", "Cross-Sections", "Elevation Profiles", "TIN Creation"],
    repoUrl: "https://github.com/sitesurveyor/toposurveyor",
    icon: "⛰️",
    tags: ["Surveying", "Topography", "Contours", "TIN"]
  }
];

const CATEGORIES = ["All", "Mapping", "Remote Sensing", "Data Collection", "Database", "Planning", "Surveying"];

export default function AppStore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const filteredApps = SAMPLE_APPS.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-black">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-800">App Store</h1>
                <p className="text-sm font-semibold text-slate-600">Professional Geomatics Tools</p>
              </div>
            </a>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/about" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="/request-solution" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Request
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search apps, features, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-lg font-medium rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="text-lg font-semibold text-slate-700">Filter:</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-xl font-bold text-slate-800">
            {filteredApps.length} {filteredApps.length === 1 ? 'App' : 'Apps'} Found
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app) => (
            <Card key={app.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-2 border-slate-200 hover:border-blue-300">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg">
                    {app.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl font-black text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {app.name}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-slate-600 mt-1">
                      v{app.version} • {app.developer}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-base font-medium text-slate-700 leading-relaxed line-clamp-3">
                  {app.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm font-bold">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-slate-800">{app.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-800">{app.downloads}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                    {app.category}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {app.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold border border-slate-200">
                      {tag}
                    </span>
                  ))}
                  {app.tags.length > 3 && (
                    <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-sm font-semibold">
                      +{app.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold">
                    <a href={app.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  {app.demoUrl && (
                    <Button variant="outline" asChild className="rounded-full border-2 border-slate-300 hover:bg-slate-50 font-bold">
                      <a href={app.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Apps Found</h3>
            <p className="text-lg text-slate-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
