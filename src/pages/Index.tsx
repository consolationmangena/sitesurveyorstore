
// Landing page for SiteSurveyor Open-Source Geomatics Appstore

import AppGrid from "@/components/AppGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Database, Book } from "lucide-react";

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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-white to-secondary/60 animate-fade-in px-0">
      {/* Header */}
      <header className="px-0 py-8 border-b border-border bg-card/90 shadow-md animate-fade-in">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-2 text-center">
            SiteSurveyor Appstore
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl">
            Africa’s open-source geomatics toolkit for mapping, survey, and remote sensing workflows.
          </p>
          <span className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-base shadow border font-medium">
            <Database className="w-5 h-5 text-primary" />
            MIT Licensed &nbsp;|&nbsp; Community-Driven
          </span>
        </div>
      </header>

      {/* Mission/Vision CTA */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-10 flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
        {/* Hero visual (optional illustration) */}
        <div className="flex-1 mb-6 md:mb-0">
          <div className="rounded-3xl overflow-hidden w-full bg-gradient-to-tr from-primary/80 to-secondary/70 shadow-lg p-4 border border-card mb-8 min-h-32 flex items-center justify-center relative">
            <Book className="w-16 h-16 text-primary-foreground opacity-60 absolute left-4 top-4" />
            <Users className="w-16 h-16 text-primary-foreground opacity-30 absolute right-4 bottom-4" />
            <span className="block text-lg font-medium z-10 text-primary-foreground drop-shadow-md animate-fade-in">
              “Accessible, Innovative, Reliable — Built For Africa”
            </span>
          </div>
        </div>
        {/* Mission summary */}
        <div className="flex-[2]">
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-1">Our Mission</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              <span className="font-medium text-foreground">SiteSurveyor</span> provides a free, modern toolkit for surveyors, GIS practitioners, and planners — making advanced mapping technology available to all across Africa.
              <br />
              <br />
              Our open-source model means: <b>no expensive licenses, local empowerment, and reliable tools for the field & office.</b> <br />
              Hosted on GitHub for open collaboration & transparency.
              <br />
              <span className="inline-block mt-3">
                <a
                  href="https://github.com/sitesurveyor"
                  target="_blank"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition-all"
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
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">Browse Open Apps</h2>
        <AppGrid apps={FEATURE_APPS} />
      </main>

      {/* Contribute / About block */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-card/80 rounded-2xl shadow border p-8 flex flex-col md:flex-row items-center gap-6 animate-fade-in">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-primary mb-2">Want to build something for SiteSurveyor?</h3>
            <p className="text-muted-foreground">
              Developers, students, and professionals are welcome! See the <a href="https://github.com/sitesurveyor" target="_blank" className="underline hover:text-primary" rel="noopener noreferrer">GitHub</a>, join ongoing projects, or create your own open tools for Africa’s geomatics future.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col md:items-end gap-2">
            <a
              href="https://github.com/sitesurveyor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg font-semibold shadow hover:bg-primary hover:text-primary-foreground transition-all"
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

      <footer className="w-full bg-background border-t py-8 px-6 text-center animate-fade-in">
        <span className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} SiteSurveyor – Africa’s Open-Source Geomatics Appstore. | {""}
          <a href="https://github.com/sitesurveyor" target="_blank" rel="noopener noreferrer" className="underline">
            GitHub
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Index;
