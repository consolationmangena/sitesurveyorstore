import RequestSolutionForm from "@/components/RequestSolutionForm";
import { Lightbulb, Users, Rocket, Target, CheckCircle, ArrowRight, Sparkles, Heart, Globe, Code, Zap, MessageSquare, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function RequestSolutionPage() {
  const challengeTypes = [
    {
      icon: "🏗️",
      title: "Field Challenges",
      description: "Equipment limitations, harsh environments, data collection issues",
      examples: ["GPS accuracy in dense forests", "Waterproof equipment needs", "Battery life in remote areas"]
    },
    {
      icon: "💻",
      title: "Software Gaps",
      description: "Missing tools, expensive licenses, workflow bottlenecks",
      examples: ["Affordable CAD alternatives", "Mobile-first solutions", "Offline data processing"]
    },
    {
      icon: "📊",
      title: "Data Processing",
      description: "Analysis challenges, format conversions, integration issues",
      examples: ["Large dataset processing", "Format compatibility", "Automated reporting"]
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Team coordination, remote work, project management",
      examples: ["Real-time data sharing", "Version control", "Multi-user editing"]
    }
  ];

  const successStories = [
    {
      challenge: "Need for offline mapping in rural areas",
      solution: "Developed OfflineMapper Pro",
      impact: "2.5K+ downloads across 8 countries",
      icon: "🗺️"
    },
    {
      challenge: "Expensive photogrammetry software",
      solution: "Created OpenDrone Analytics",
      impact: "Saved teams $50K+ in licensing",
      icon: "📸"
    },
    {
      challenge: "Complex coordinate conversions",
      solution: "Built Coordinate Wizard",
      impact: "Used by 15+ universities",
      icon: "🧭"
    }
  ];

  const communityStats = [
    { label: "Problems Solved", value: "0", icon: CheckCircle, color: "text-green-600" },
    { label: "Apps Created", value: "0", icon: Rocket, color: "text-blue-600" },
    { label: "Countries Helped", value: "0", icon: Globe, color: "text-purple-600" },
    { label: "Active Contributors", value: "0", icon: Users, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="text-center mb-20 relative animate-fade-in-up">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          </div>
          
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-14 shadow-2xl border border-white/60 mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-6 mb-10">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg animate-pulse">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg animate-pulse delay-150">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 leading-tight">
              Got a Challenge?
            </h1>
            <p className="text-2xl text-slate-700 font-semibold max-w-3xl mx-auto leading-relaxed mb-10">
              Every great solution starts with a real problem. Share your geomatics challenge with our community, 
              and let's build the tools that will transform how professionals work across Africa and beyond.
            </p>
            
            <div className="flex items-center justify-center gap-10 text-lg flex-wrap">
              {communityStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 border border-slate-300 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className={`${stat.color} w-6 h-6`} />
                  <span className={`font-extrabold ${stat.color}`}>{stat.value}</span>
                  <span className="text-slate-600 font-semibold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Types Section */}
        <div className="mb-20 animate-fade-in-up">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-5">What Kind of Challenge Do You Face?</h2>
            <p className="text-lg text-slate-600 font-semibold">We've helped solve problems across all areas of geomatics</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {challengeTypes.map((type, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/90 backdrop-blur-md border-2 border-slate-200 hover:border-blue-400">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-slate-600 font-semibold mb-5 leading-relaxed">
                    {type.description}
                  </p>
                  <div className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <div key={idx} className="text-sm text-slate-500 bg-slate-50 rounded-full px-4 py-1">
                        {example}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories Section */}
        <div className="mb-20 animate-fade-in-up">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-5">From Problems to Solutions</h2>
            <p className="text-lg text-slate-600 font-semibold">Real challenges that became game-changing tools</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {successStories.map((story, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/60 p-8 hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {story.icon}
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-red-600" />
                        The Challenge
                      </h4>
                      <p className="text-slate-600 text-sm">{story.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        Our Solution
                      </h4>
                      <p className="text-slate-600 text-sm">{story.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        The Impact
                      </h4>
                      <p className="text-green-700 font-bold text-sm">{story.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Section */}
        <div className="max-w-5xl mx-auto mb-20 animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 border-2 border-slate-300">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-800">Share Your Challenge</h2>
                  <p className="text-lg font-semibold text-slate-600">Help us build better tools</p>
                </div>
              </div>
              
              <RequestSolutionForm />
            </div>

            {/* Sidebar Info */}
            <div className="space-y-10">
              {/* Process Steps */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/60">
                <h3 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
                  <Target className="w-7 h-7 text-blue-600" />
                  How It Works
                </h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-extrabold text-slate-800">Share Your Problem</h4>
                      <p className="text-slate-600 text-sm">Describe the challenge you're facing in detail</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-extrabold text-slate-800">Community Review</h4>
                      <p className="text-slate-600 text-sm">Our developers and community assess the need</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-extrabold text-slate-800">Solution Development</h4>
                      <p className="text-slate-600 text-sm">We build and release the tool to help everyone</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Share */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-300">
                <h3 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center gap-3">
                  <Award className="w-7 h-7 text-purple-600" />
                  Why Share Your Challenge?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">Get a Custom Solution</h4>
                      <p className="text-slate-600 text-sm">We might build exactly what you need</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">Help the Community</h4>
                      <p className="text-slate-600 text-sm">Your problem likely affects others too</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">Shape the Future</h4>
                      <p className="text-slate-600 text-sm">Influence the direction of geomatics tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">Free & Open Source</h4>
                      <p className="text-slate-600 text-sm">All solutions are freely available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,theme(colors.blue.500/20),transparent_50%)]"></div>
                <div className="relative">
                  <h3 className="text-2xl font-extrabold text-white mb-6">Join Our Mission</h3>
                  <p className="text-gray-300 mb-8">
                    Be part of building the future of accessible geomatics technology
                  </p>
                  <div className="flex flex-col gap-4">
                    <Button asChild className="bg-white text-slate-900 hover:bg-gray-100 font-extrabold rounded-full">
                      <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
                        <Code className="w-5 h-5 mr-2" />
                        Contribute on GitHub
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 font-extrabold rounded-full">
                      <a href="/appstore">
                        <ArrowRight className="w-5 h-5 mr-2" />
                        Explore Existing Apps
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Testimonials */}
        <div className="mb-20 animate-fade-in-up">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-5">What Our Community Says</h2>
            <p className="text-lg text-slate-600 font-semibold">Real feedback from geomatics professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-lg">
                  JM
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800">John Mwangi</h4>
                  <p className="text-slate-600 text-sm">Land Surveyor, Kenya</p>
                </div>
              </div>
              <p className="text-slate-700 italic">
                "I shared my GPS accuracy issues in dense forests. Within 3 months, the team released ForestMapper - 
                it's now my go-to tool for challenging terrain!"
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg">
                  AN
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800">Amina Ndovu</h4>
                  <p className="text-slate-600 text-sm">GIS Analyst, Tanzania</p>
                </div>
              </div>
              <p className="text-slate-700 italic">
                "The coordinate conversion tool they built from my request has saved our team countless hours. 
                Amazing how one problem can help so many people!"
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/60 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-extrabold text-lg">
                  TK
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800">Thabo Khumalo</h4>
                  <p className="text-slate-600 text-sm">Urban Planner, South Africa</p>
                </div>
              </div>
              <p className="text-slate-700 italic">
                "I love how responsive this community is. My suggestion for mobile-first planning tools 
                led to an app that's now used across 5 countries!"
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-14 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-4xl font-extrabold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-10 opacity-90 leading-relaxed">
                Your challenge could be the next breakthrough solution that transforms how geomatics professionals work worldwide.
              </p>
              <div className="flex items-center justify-center gap-6 text-lg">
                <Sparkles className="w-7 h-7" />
                <span className="font-extrabold">Every great tool starts with a real problem</span>
                <Sparkles className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
