
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppGrid from "@/components/AppGrid";
import { ArrowRight, Code, Globe, Users, Zap, Star, Download, Heart } from "lucide-react";

const apps = [
  {
    name: "GeoDataCollector",
    description: "A mobile-first data collection tool for field surveys with offline capabilities and GPS integration.",
    repoUrl: "https://github.com/sitesurveyor/geodatacollector",
    icon: "map",
    tags: ["Mobile", "GPS", "Survey"],
    download_count: 1250,
    updated_at: "2024-06-10",
    category: "Data Collection"
  },
  {
    name: "Survey Report Generator",
    description: "Automated report generation from survey data with customizable templates and export options.",
    repoUrl: "https://github.com/sitesurveyor/survey-reports",
    icon: "book",
    tags: ["Reports", "Automation", "PDF"],
    download_count: 890,
    updated_at: "2024-06-08",
    category: "Reports"
  },
  {
    name: "Coordinate Converter",
    description: "Convert between different coordinate systems and datums with high precision calculations.",
    repoUrl: "https://github.com/sitesurveyor/coord-converter",
    icon: "database",
    tags: ["Coordinates", "Conversion", "Precision"],
    download_count: 2100,
    updated_at: "2024-06-12",
    category: "Tools"
  }
];

const features = [
  {
    icon: Code,
    title: "Open Source First",
    description: "All tools are completely open source and free to use, modify, and distribute."
  },
  {
    icon: Globe,
    title: "Built for Africa",
    description: "Designed specifically for African geomatics challenges and workflows."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Developed by the community, for the community. Your contributions matter."
  },
  {
    icon: Zap,
    title: "Production Ready",
    description: "Enterprise-grade tools that are battle-tested in real-world scenarios."
  }
];

const stats = [
  { label: "Active Tools", value: "15+" },
  { label: "Downloads", value: "10K+" },
  { label: "Contributors", value: "50+" },
  { label: "Countries", value: "12+" }
];

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header 
        title="SiteSurveyor" 
        subtitle="Africa's Open-Source Geomatics Appstore"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
              Revolutionizing
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent block">
                African Geomatics
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 font-medium mb-12 leading-relaxed max-w-3xl mx-auto">
              Discover, contribute, and innovate with our growing collection of open-source geomatics tools. 
              Built by African professionals, for the global community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/appstore"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Explore Apps
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://github.com/consolationmangena/sitesurveyor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Code className="w-5 h-5" />
                View Source
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
              Why Choose SiteSurveyor?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're not just another app store. We're a movement to democratize geomatics technology across Africa.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all hover:scale-105 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
              Featured Applications
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our most popular tools that are transforming how professionals work with spatial data.
            </p>
          </div>
          
          <AppGrid apps={apps} />
          
          <div className="text-center mt-12">
            <a
              href="/appstore"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              View All Apps
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black mb-6">
                Join the Revolution
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Have an idea for a geomatics tool? Found a problem that needs solving? 
                Be part of building the future of African geomatics technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="/request-solution"
                  className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all hover:scale-105"
                >
                  <Heart className="w-5 h-5" />
                  Request a Solution
                </a>
                <a
                  href="https://github.com/consolationmangena/sitesurveyor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all hover:scale-105"
                >
                  <Star className="w-5 h-5" />
                  Contribute on GitHub
                </a>
              </div>
            </div>
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
