
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppGrid from "@/components/AppGrid";

const apps = [
  {
    name: "GeoDataCollector",
    description: "A mobile-first data collection tool for field surveys with offline capabilities and GPS integration.",
    repoUrl: "https://github.com/sitesurveyor/geodatacollector",
    icon: "map",
    tags: ["Mobile", "GPS", "Survey"]
  },
  {
    name: "Survey Report Generator",
    description: "Automated report generation from survey data with customizable templates and export options.",
    repoUrl: "https://github.com/sitesurveyor/survey-reports",
    icon: "book",
    tags: ["Reports", "Automation", "PDF"]
  },
  {
    name: "Coordinate Converter",
    description: "Convert between different coordinate systems and datums with high precision calculations.",
    repoUrl: "https://github.com/sitesurveyor/coord-converter",
    icon: "database",
    tags: ["Coordinates", "Conversion", "Precision"]
  }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header 
        title="SiteSurveyor" 
        subtitle="Africa's Open-Source Geomatics Appstore" 
        showSearch={true} 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-6">
            Welcome to the Future of <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Geomatics</span>
          </h2>
          <p className="text-xl font-medium text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover and contribute to a growing collection of open-source tools designed by African geomaticians, for the global community.
          </p>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-slate-800 mb-4">Featured Applications</h3>
            <p className="text-lg font-medium text-slate-600">Explore tools that are transforming the way we work with spatial data</p>
          </div>
          <AppGrid apps={apps} />
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200 text-center">
          <h3 className="text-3xl font-black text-blue-800 mb-4">🚀 Ready to Contribute?</h3>
          <p className="text-lg font-medium text-slate-700 mb-6 max-w-2xl mx-auto">
            Have an idea for a geomatics tool? Encountered a challenge that needs solving? Join our community of innovators!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/request-solution"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Request a Solution
            </a>
            <a
              href="https://github.com/consolationmangena/sitesurveyor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
