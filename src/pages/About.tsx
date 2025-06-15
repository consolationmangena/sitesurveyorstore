
import { Book, Users, Building2, Github } from "lucide-react";

export default function About() {
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
                <h1 className="text-2xl font-black text-slate-800">About</h1>
                <p className="text-sm font-semibold text-slate-600">SiteSurveyor Mission & Team</p>
              </div>
            </a>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="/appstore" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                App Store
              </a>
              <a href="/request-solution" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Request
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border-2 border-slate-200">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <Book className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800">About SiteSurveyor</h2>
              <p className="text-lg font-semibold text-slate-600">Empowering Geomatics Professionals</p>
            </div>
          </div>
          
          {/* Mission */}
          <div className="mb-8">
            <p className="text-lg font-medium text-slate-700 mb-6 leading-relaxed">
              <span className="font-black text-blue-600">SiteSurveyor</span> is a community-driven open-source app store for geomatics professionals, surveyors, GIS practitioners, and planners across Africa and beyond.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-black text-blue-800 mb-3">🌍 Local Solutions</h3>
                <p className="text-base font-medium text-slate-700">Free and open alternatives to expensive, closed mapping tools.</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-xl font-black text-green-800 mb-3">⚡ Field & Office</h3>
                <p className="text-base font-medium text-slate-700">Modern applications for working with spatial data, all MIT licensed.</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                <h3 className="text-xl font-black text-indigo-800 mb-3">🚀 Built for Africa</h3>
                <p className="text-base font-medium text-slate-700">Open, reliable, and accessible—enabling professionals to solve real-world challenges.</p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Team & Contributors</h3>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-6 border border-blue-200">
              <h4 className="text-xl font-black text-blue-800 mb-3">Project Lead</h4>
              <p className="text-lg font-medium text-slate-700">
                <span className="font-black text-slate-800">Consolation Mangena</span> - Leading the development and vision of SiteSurveyor as an open-source geomatics solution for Africa.
              </p>
            </div>
            <p className="text-base font-medium text-slate-600 bg-slate-50 rounded-xl p-4 border border-slate-200">
              This project welcomes contributors from around the world. Join our community on GitHub to help build the future of accessible geomatics tools.
            </p>
          </div>

          {/* Organizations Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-800">Supporting Organizations</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-xl font-black text-blue-800 mb-3">Open Source Community</h4>
                <p className="text-base font-medium text-slate-700">
                  Built with support from the global open-source community, ensuring transparency and collaborative development.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-xl font-black text-green-800 mb-3">African Geomatics Network</h4>
                <p className="text-base font-medium text-slate-700">
                  Empowering geomatics professionals across Africa with accessible, locally-relevant tools and solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Repository Info */}
          <div className="mb-6">
            <p className="text-lg font-medium text-slate-700 mb-6 leading-relaxed">
              This store and its apps are hosted on GitHub for open collaboration. Contributors from every background are welcome to create, improve, and share!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/consolationmangena/sitesurveyor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all hover:shadow-xl hover:scale-105"
              >
                <Github className="w-6 h-6" />
                Official Repository
              </a>
              <a
                href="https://github.com/sitesurveyor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold shadow-lg bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transition-all hover:shadow-xl hover:scale-105"
              >
                <span className="text-xl">🌍</span>
                Contribute or Explore Apps
              </a>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center pt-6 border-t border-slate-200">
            <p className="text-base font-bold text-slate-600">
              MIT Licensed • Open Source • Built for Africa and the World
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
