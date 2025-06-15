
// Enhanced Landing page for SiteSurveyor with modern design

import AppGrid from "@/components/AppGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Database, Book, Search, Globe, MapPin, Zap } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Modern header with glassmorphism effect */}
      <header className="sticky top-0 z-50 glass-effect shadow-xl border-b border-green-200/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced logo and brand section */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=80&h=80&fit=crop&crop=center"
                  alt="SiteSurveyor Logo"
                  className="relative w-12 h-12 rounded-xl shadow-lg object-cover border-2 border-white"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-black gradient-text">
                  SiteSurveyor
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                  Geomatics Store
                </p>
              </div>
            </div>

            {/* Enhanced search bar */}
            <form className="hidden md:flex flex-1 mx-8 max-w-lg relative">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  className="w-full rounded-full glass-effect pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                  type="search"
                  placeholder="Search apps and tools..."
                  aria-label="Search for apps"
                  disabled
                />
              </div>
            </form>

            {/* Enhanced navigation */}
            <div className="flex items-center gap-4">
              <nav className="hidden sm:flex items-center gap-2">
                <a
                  href="/about"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                >
                  About
                </a>
                <a
                  href="/request-solution"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                >
                  Request
                </a>
              </nav>
              
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-sm font-medium">
                <Database className="w-4 h-4 text-primary" />
                <span className="text-primary">Open Source</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary">MIT Licensed</span>
              </div>
            </div>
          </div>

          {/* Mobile search and nav */}
          <div className="md:hidden mt-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                className="w-full rounded-full glass-effect pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
                type="search"
                placeholder="Search apps and tools..."
                aria-label="Search for apps"
                disabled
              />
            </div>
            <nav className="flex items-center justify-center gap-4 sm:hidden">
              <a
                href="/about"
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                About
              </a>
              <a
                href="/request-solution"
                className="px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all"
              >
                Request
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced categories filter */}
      <nav className="border-b border-border/50 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  idx === 0
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "glass-effect hover:bg-primary/10 hover:text-primary hover:shadow-md"
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/20">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Built for Africa & Beyond</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                <span className="gradient-text">Empowering</span><br />
                Geomatics <br />
                <span className="text-foreground">Professionals</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Access free, modern toolkit for surveyors, GIS practitioners, and planners. 
                No expensive licenses, just reliable open-source tools for field & office work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 shadow-lg hover:shadow-xl transition-shadow">
                <ArrowRight className="w-5 h-5 mr-2" />
                Explore Apps
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 rounded-xl glass-effect">
                <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Field Ready</h4>
                  <p className="text-xs text-muted-foreground">Works offline & online</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl glass-effect">
                <Zap className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Modern Tools</h4>
                  <p className="text-xs text-muted-foreground">Latest technology</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl glass-effect">
                <Users className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Community</h4>
                  <p className="text-xs text-muted-foreground">Open collaboration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <div className="relative glass-effect rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-6 flex items-center justify-center">
                  <Book className="w-12 h-12 text-white" />
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent to-primary p-6 flex items-center justify-center">
                  <Database className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold gradient-text">6+ Tools</h3>
                <p className="text-muted-foreground">Ready to use, MIT licensed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Grid with enhanced styling */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Applications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our collection of professional-grade geomatics tools, all open-source and ready for production use.
            </p>
          </div>
          <AppGrid apps={FEATURE_APPS as any} />
        </div>
      </main>

      {/* Enhanced CTA section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-12 text-center shadow-2xl">
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

      {/* Enhanced footer */}
      <footer className="border-t border-border/50 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} SiteSurveyor – Africa's Open-Source Geomatics Appstore
              </span>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm">
              <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors">
                GitHub
              </a>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">MIT License</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Open Source</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
