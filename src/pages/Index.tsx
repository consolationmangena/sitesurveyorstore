
// Landing page for SiteSurveyor Open-Source Geomatics Appstore in Play Store style

import AppGrid from "@/components/AppGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Database, Book, Search } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-accent/40 to-primary/10 w-full">
      {/* Enhanced header with better logo and styling */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-2xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo and brand section */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=80&h=80&fit=crop&crop=center"
                  alt="SiteSurveyor Logo"
                  className="w-12 h-12 rounded-2xl shadow-lg border-2 border-white/30 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-black tracking-tight drop-shadow-lg">
                  SiteSurveyor
                </h1>
                <p className="text-emerald-100 text-xs font-medium tracking-wide hidden sm:block">
                  Geomatics Store
                </p>
              </div>
            </div>

            {/* Search bar - hidden on small screens */}
            <form className="hidden md:flex flex-1 mx-6 max-w-md relative">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  className="w-full rounded-full bg-white/95 backdrop-blur-sm pl-12 pr-4 py-3 text-base border border-white/20 shadow-lg focus:ring-2 ring-emerald-300 focus:bg-white transition-all placeholder:text-gray-500"
                  type="search"
                  placeholder="Search apps and tools..."
                  aria-label="Search for apps"
                  disabled
                />
              </div>
            </form>

            {/* Navigation and info */}
            <div className="flex items-center gap-2 lg:gap-4">
              <nav className="flex items-center gap-1">
                <a
                  href="/about"
                  className="text-white/90 hover:text-white font-semibold px-3 py-2 rounded-xl transition-all bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sm"
                >
                  About
                </a>
                <a
                  href="/request-solution"
                  className="text-white/90 hover:text-white font-semibold px-3 py-2 rounded-xl transition-all bg-white/10 hover:bg-white/20 backdrop-blur-sm text-sm"
                >
                  Request
                </a>
              </nav>
              
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white font-medium text-sm border border-white/20 backdrop-blur-sm">
                <Database className="w-4 h-4 text-emerald-200" />
                <span className="text-emerald-100">MIT Licensed</span>
                <span className="text-white/60">•</span>
                <span className="text-emerald-100">Open Source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              className="w-full rounded-full bg-white/95 backdrop-blur-sm pl-12 pr-4 py-3 text-base border border-white/20 shadow-lg focus:ring-2 ring-emerald-300 focus:bg-white transition-all placeholder:text-gray-500"
              type="search"
              placeholder="Search apps and tools..."
              aria-label="Search for apps"
              disabled
            />
          </div>
        </div>
      </header>

      {/* Categories filter bar */}
      <nav className="flex flex-wrap gap-2 px-6 py-4 bg-gradient-to-r from-green-100/70 to-accent/10 border-b border-green-200">
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat}
            className={`px-4 py-1.5 rounded-full font-medium text-sm transition shadow-sm border hover:bg-green-600/90 hover:text-white
            ${
              idx === 0
                ? "bg-primary text-white border-primary"
                : "bg-white/80 border-green-200 text-primary hover:border-primary"
            }`}
            disabled={idx === 0}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Hero / vision */}
      <section className="max-w-7xl mx-auto px-6 pt-7 pb-5 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
        <div className="flex-1 mb-6 md:mb-0">
          <div className="rounded-3xl overflow-hidden w-full bg-gradient-to-tr from-primary via-green-200 to-accent shadow-2xl p-7 border border-accent mb-8 min-h-32 flex items-center justify-center relative">
            <Book className="w-16 h-16 text-accent-foreground opacity-80 absolute left-6 top-6" />
            <Users className="w-16 h-16 text-accent-foreground opacity-60 absolute right-6 bottom-4" />
            <span className="block text-xl font-bold z-10 text-background drop-shadow-lg animate-fade-in">
              "Accessible, Innovative, Reliable — Built For Africa"
            </span>
          </div>
        </div>
        {/* Mission summary */}
        <div className="flex-[2]">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-1">Our Mission</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              <span className="font-semibold text-foreground">SiteSurveyor</span> provides a free, modern toolkit for surveyors, GIS practitioners, and planners — making advanced mapping technology available to all across Africa.
              <br />
              <br />
              Our open-source model means: <b>no expensive licenses, local empowerment, and reliable tools for the field & office.</b> <br />
              Hosted on GitHub for open collaboration & transparency.
              <br />
              <span className="inline-block mt-3">
                <a
                  href="https://github.com/sitesurveyor"
                  target="_blank"
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow hover:from-primary/80 hover:to-accent/80 transition-all"
                  rel="noopener noreferrer"
                >
                  Contribute on GitHub
                </a>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Apps Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Featured Apps</h2>
        <AppGrid apps={FEATURE_APPS as any} />
      </main>

      {/* Contribute / About block */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-gradient-to-br from-green-200/90 to-secondary/60 rounded-2xl shadow-xl border border-accent/40 p-8 flex flex-col md:flex-row items-center gap-7 animate-fade-in">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary mb-2">Want to build something for SiteSurveyor?</h3>
            <p className="text-muted-foreground">
              Developers, students, and professionals are welcome! See the <a href="https://github.com/sitesurveyor" target="_blank" className="underline hover:text-primary" rel="noopener noreferrer">GitHub</a>, join ongoing projects, or create your own open tools for Africa's geomatics future.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col md:items-end gap-2">
            <a
              href="https://github.com/sitesurveyor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold shadow-lg hover:from-primary hover:to-accent hover:text-primary-foreground transition-all"
            >
              <ArrowRight className="w-5 h-5" />
              Join the Community
            </a>
            <span className="block text-xs mt-1 text-muted-foreground">
              MIT License | Open Data | Built in Africa
            </span>
          </div>
        </div>
      </section>

      <footer className="w-full bg-gradient-to-b from-background/90 to-secondary/30 border-t py-8 px-6 text-center animate-fade-in">
        <span className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} SiteSurveyor – Africa's Open-Source Geomatics Appstore. | {""}
          <a href="https://github.com/sitesurveyor" target="_blank" rel="noopener noreferrer" className="underline">
            GitHub
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Index;
