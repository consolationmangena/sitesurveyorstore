import { useEffect, useState } from "react";
import AppGrid from "@/components/AppGrid";
import { ArrowRight, Code, Globe, Users, Crown, TrendingUp, Award, CheckCircle, Loader2 } from "lucide-react";
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
  const [frontendContent, setFrontendContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [appsResult, statsResult] = await Promise.all([
          getFeaturedApplications(),
          getFrontendStats()
        ]);

        if (appsResult.error) throw appsResult.error;
        setFeaturedApps(appsResult.applications);
        setFrontendContent(statsResult);
      } catch (err) {
        console.error('Error loading page content:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {frontendContent?.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Users;
              return (
                <div key={index} className="relative">
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.color} opacity-10`} />
                  <div className="relative p-6">
                    <IconComponent className="w-10 h-10 text-gray-900 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {frontendContent?.stats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Users;
              return (
                <div key={index} className="text-center">
                  <IconComponent className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                  <p className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
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
                <div key={index} className="flex items-start">
                  <IconComponent className="w-6 h-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}