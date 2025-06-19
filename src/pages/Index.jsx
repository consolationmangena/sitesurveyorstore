import { useEffect, useState } from "react";
import AppGrid from "/src/components/AppGrid.jsx";
import { ArrowRight, Code, Globe, Users, Crown, TrendingUp, Award, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedApplications, getFrontendStats } from "@/lib/database";

// Map icon strings to actual components
const iconMap = {
  Code,
  Globe,
  Users,
  Crown,
  TrendingUp,
  Award,
  CheckCircle
};

export default function Index() {
  const [featuredApps, setFeaturedApps] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [frontendContent, setFrontendContent] = useState({
    benefits: [],
  });
  const [loadingContent, setLoadingContent] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load featured apps
    const loadApps = async () => {
      try {
        const appsResult = await getFeaturedApplications();
        if (appsResult.error) throw appsResult.error;
        setFeaturedApps(appsResult.applications);
      } catch (err) {
        console.error('Error loading featured apps:', err);
        setError('Failed to load featured applications');
      } finally {
        setLoadingApps(false);
      }
    };

    // Load frontend content
    const loadFrontendContent = async () => {
      try {
        const contentResult = await getFrontendStats();
        if (contentResult.error) throw contentResult.error;
        setFrontendContent(contentResult);
      } catch (err) {
        console.error('Error loading frontend content:', err);
        setError('Failed to load frontend content');
      } finally {
        setLoadingContent(false);
      }
    };

    // Load both in parallel
    loadApps();
    loadFrontendContent();
  }, []);

  const isLoading = loadingApps && loadingContent;


  // Show skeleton loading state instead of full-page loader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Hero Section Skeleton */}
        <div className="h-96 bg-gray-100 animate-pulse" />
        
        {/* Featured Apps Skeleton */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </section>

        {/* Features Skeleton */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-professional border-b border-border/40">
        <div className="container-professional">
          <div className="mx-auto max-w-4xl text-center space-professional-lg">
            <div className="space-professional-md">
              <div className="inline-flex items-center space-x-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Professional Geomatics Platform</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Advanced Geomatics Solutions for{" "}
                <span className="gradient-text-professional">Modern Professionals</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Comprehensive platform offering both open-source tools and premium professional applications 
                for surveying, GIS, and spatial analysis. Built by experts, trusted by professionals worldwide.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-professional-primary h-12 px-8 text-base" asChild>
                <a href="/appstore">
                  Explore Applications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="btn-professional-outline h-12 px-8 text-base" asChild>
                <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer">
                  <Code className="mr-2 h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Applications */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Applications
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and powerful tools trusted by surveying professionals across Africa.
          </p>
        </div>

        <AppGrid apps={featuredApps} />

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <a href="/store" className="inline-flex items-center">
              View All Applications
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the core features that make our platform essential for modern geomatics professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 opacity-10" />
              <div className="relative p-6">
                <Code className="w-10 h-10 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Open Source Foundation</h3>
                <p className="text-gray-600">Leverage the power and transparency of open-source geomatics tools.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-100 to-green-200 opacity-10" />
              <div className="relative p-6">
                <Globe className="w-10 h-10 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
                <p className="text-gray-600">Access and share applications with a worldwide community.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 opacity-10" />
              <div className="relative p-6">
                <Users className="w-10 h-10 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Driven</h3>
                <p className="text-gray-600">Benefit from contributions and support from a vibrant community.</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200 opacity-10" />
              <div className="relative p-6">
                <Crown className="w-10 h-10 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Grade</h3>
                <p className="text-gray-600">Access premium tools designed for demanding professional workflows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {frontendContent?.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || CheckCircle;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <IconComponent className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
             <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Increased Productivity</h3>
                  <p className="text-gray-600">Streamline your workflows with intuitive and efficient tools.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost-Effective Solutions</h3>
                  <p className="text-gray-600">Access powerful tools without the burden of expensive licenses.</p>
                </div>
              </div>


          </div>
        </div>
      </section>
    </div>
  );
}