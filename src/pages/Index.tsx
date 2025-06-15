// Enhanced Landing page for SiteSurveyor with modern design

import AppGrid from "@/components/AppGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Database, Book, MapPin, Zap, Github } from "lucide-react";

const FEATURE_APPS = [
  {
    name: "Map Viewer",
    description:
      "Open-source interactive map for field data collection and visualization. Supports GeoJSON, shapefiles, satellite imagery, and more.",
    repoUrl: "https://github.com/sitesurveyor/geomap-viewer",
    icon: "map",
    tags: ["Map", "Visualization", "Field"],
  },
  {
    name: "DroneImage AI Annotator",
    description:
      "AI-powered photogrammetry toolkit for drone/image analysis. Detects features, classifies land cover, and generates survey plots.",
    repoUrl: "https://github.com/sitesurveyor/droneimage-annotator",
    icon: "camera",
    tags: ["AI", "Remote Sensing", "Photogrammetry"],
  },
  {
    name: "Spatial DB Manager",
    description:
      "Visual database manager for geospatial datasets. Import, export, edit in PostGIS, GeoPackage, CSV – all open standards.",
    repoUrl: "https://github.com/sitesurveyor/spatial-db-manager",
    icon: "database",
    tags: ["Database", "CSV", "PostGIS"],
  },
  {
    name: "Field Data Logger",
    description:
      "Simple offline/online survey logger for capturing spatial points, boundaries, and observations in any environment.",
    repoUrl: "https://github.com/sitesurveyor/field-logger",
    icon: "book",
    tags: ["Logging", "Offline", "Tracking"],
  },
  {
    name: "GeoTIFF Toolkit",
    description:
      "Tools for viewing, clipping, converting, and exporting GeoTIFF raster data for land use planning and mapping.",
    repoUrl: "https://github.com/sitesurveyor/geotiff-toolkit",
    icon: "map",
    tags: ["GeoTIFF", "Raster", "Processing"],
  },
  {
    name: "Open Land Parcel Designer",
    description:
      "Plan and manage land parcels visually, using open datasets with tools for drawing, annotation, and local coordination.",
    repoUrl: "https://github.com/sitesurveyor/land-parcel-designer",
    icon: "map",
    tags: ["Cadastral", "Planning", "OpenData"],
  },
];

const CATEGORIES = [
  "All",
  "Mapping",
  "AI",
  "Field",
  "Remote Sensing",
  "Database",
  "Photogrammetry",
  "Offline",
  "Raster",
  "Planning",
  "Tracking",
  "OpenData",
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header title="SiteSurveyor" subtitle="Geomatics Store" showSearch={true} />

      {/* Enhanced categories filter */}
      <nav className="border-b border-slate-200/50 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  idx === 0
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                }`}
                disabled={idx === 0}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero section with modern design */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200">
                <span className="text-sm font-medium text-blue-600">Built for Africa & Beyond</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Empowering</span><br />
                Geomatics <br />
                <span className="text-slate-800">Professionals</span>
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Access free, modern toolkit for surveyors, GIS practitioners, and planners. 
                No expensive licenses, just reliable open-source tools for field & office work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore Apps
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 hover:bg-slate-50" asChild>
                <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200">
                <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">Field Ready</h4>
                  <p className="text-xs text-slate-600">Works offline & online</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200">
                <Zap className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">Modern Tools</h4>
                  <p className="text-xs text-slate-600">Latest technology</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200">
                <Users className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">Community</h4>
                  <p className="text-xs text-slate-600">Open collaboration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 flex items-center justify-center">
                  <Book className="w-12 h-12 text-white" />
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 flex items-center justify-center">
                  <Database className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">6+ Tools</h3>
                <p className="text-slate-600">Ready to use, MIT licensed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Grid with enhanced styling */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">Featured Applications</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our collection of professional-grade geomatics tools, all open-source and ready for production use.
            </p>
          </div>
          <AppGrid apps={FEATURE_APPS as any} />
        </div>
      </main>

      {/* Enhanced CTA section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative space-y-6">
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Join Our Community</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Developers, students, and professionals are welcome! Help build the future of accessible geomatics tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="rounded-full px-8" asChild>
                <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Contribute Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
