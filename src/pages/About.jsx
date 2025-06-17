import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Book, Users, Building2, Github, MapPin, Code, GraduationCap, Briefcase, Heart, Star, Globe, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header title="About" subtitle="Our Story & Mission" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl"></div>
          </div>
          
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50 mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Book className="w-10 h-10 text-white" />
              </div>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              About SiteSurveyor
            </h1>
            <p className="text-xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
              Revolutionizing African geomatics through innovative open-source and professional solutions. 
              Built by professionals, for professionals, with a vision to democratize spatial technology across the continent.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-800 mb-4">Meet the Founder</h2>
              <p className="text-lg text-slate-600 font-medium">The visionary behind SiteSurveyor's mission</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/50">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Profile Image */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20"></div>
                  <img 
                    src="/profile.jpg" 
                    alt="Consolation Mangena - Founder of SiteSurveyor"
                    className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <h3 className="text-2xl font-black text-slate-800">Consolation Mangena</h3>
                      <p className="text-blue-600 font-bold">Founder & Lead Developer</p>
                    </div>
                  </div>
                </div>
                
                {/* Profile Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
                      <GraduationCap className="w-8 h-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800">Education</h4>
                        <p className="text-slate-600">Geomatics Student at Midlands State University</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                      <Code className="w-8 h-8 text-indigo-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800">Expertise</h4>
                        <p className="text-slate-600">Full-Stack Developer & Geomatics Specialist</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 border border-purple-200">
                      <MapPin className="w-8 h-8 text-purple-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800">Location</h4>
                        <p className="text-slate-600">Zimbabwe, Africa</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Vision & Mission
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        "I believe that access to professional geomatics tools shouldn't be limited by geography or budget. 
                        SiteSurveyor represents my commitment to democratizing spatial technology across Africa, 
                        providing both free open-source solutions and affordable professional tools for the next generation of geomatics professionals."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-800 mb-4">Powered by EINEVA Solutions</h2>
              <p className="text-lg text-slate-600 font-medium">The technology company behind SiteSurveyor</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-white/50">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Company Logo */}
                <div className="relative bg-black flex items-center justify-center p-12">
                  <img 
                    src="/2eb1f296-ca21-4ac5-ac54-c2265cf51cbb.png" 
                    alt="EINEVA Solutions Logo"
                    className="max-w-full max-h-64 object-contain"
                  />
                </div>
                
                {/* Company Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-black text-slate-800 mb-2">EINEVA Solutions</h3>
                      <p className="text-xl text-red-600 font-bold mb-4">Solutions Beyond Expectations</p>
                      <p className="text-slate-700 leading-relaxed">
                        EINEVA Solutions is the innovative technology company that maintains and develops the SiteSurveyor platform. 
                        We specialize in creating cutting-edge software solutions that exceed expectations and drive industry transformation.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                        <Zap className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Innovation</h4>
                          <p className="text-slate-600 text-xs">Cutting-edge solutions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                        <Star className="w-6 h-6 text-blue-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Excellence</h4>
                          <p className="text-slate-600 text-xs">Beyond expectations</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
                        <Globe className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Global Reach</h4>
                          <p className="text-slate-600 text-xs">Worldwide impact</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200">
                        <Users className="w-6 h-6 text-purple-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Community</h4>
                          <p className="text-slate-600 text-xs">User-focused</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-800 mb-4">Our Mission & Values</h2>
              <p className="text-lg text-slate-600 font-medium">What drives us every day</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Open Source First</h3>
                <p className="text-slate-600 leading-relaxed">
                  We believe in transparency, collaboration, and making professional tools accessible to everyone.
                </p>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">African Innovation</h3>
                <p className="text-slate-600 leading-relaxed">
                  Built in Africa, for Africa, but designed to serve the global geomatics community.
                </p>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Community Driven</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every feature, every tool is shaped by the real needs of geomatics professionals.
                </p>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Excellence</h3>
                <p className="text-slate-600 leading-relaxed">
                  We strive for professional-grade quality in every solution we deliver.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact & Future */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/20),transparent_50%)]"></div>
            <div className="relative text-center">
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mb-6">
                Our Impact & Future
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                From a student's vision to a platform serving professionals across multiple countries, 
                SiteSurveyor continues to grow and evolve with the geomatics community.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-blue-400 mb-2">15+</div>
                  <div className="text-gray-300">Countries Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-400 mb-2">25K+</div>
                  <div className="text-gray-300">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">50+</div>
                  <div className="text-gray-300">Contributors</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/consolationmangena/sitesurveyor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5"
                >
                  <Github className="w-5 h-5" />
                  Join Our Mission
                </a>
                <a
                  href="/request-solution"
                  className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white ring-1 ring-inset ring-white/20 hover:ring-white/30 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                >
                  <Heart className="w-5 h-5" />
                  Share Your Ideas
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <p className="text-lg font-bold text-slate-800 mb-2">
              Building the Future of Geomatics Technology
            </p>
            <p className="text-slate-600">
              Apache 2.0 Licensed • Open Source • Community Driven • Made with ❤️ in Africa
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}