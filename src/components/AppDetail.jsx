import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Download, ExternalLink, Github, Calendar, Tag, User2, Crown, Zap, Shield, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApplication } from "@/hooks/useDatabase";

export default function AppDetail() {
  const { id } = useParams();
  const { application: app, loading, error } = useApplication(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-slate-700 mb-6">App Not Found</h2>
          <Link to="/appstore" className="text-blue-600 underline hover:text-blue-800">Back to App Store</Link>
        </div>
      </div>
    );
  }

  const isPro = app.app_type === 'pro';
  const isOpenSource = app.app_type === 'open_source';

  const getIconEmoji = (iconType) => {
    const icons = {
      'map': '🗺️',
      'database': '📊',
      'camera': '📸',
      'default': '🔧'
    };
    return icons[iconType] || icons.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-2xl md:max-w-6xl py-12 px-4">
        <div className={`bg-white/95 rounded-3xl shadow-2xl border p-8 mb-8 animate-fade-in ${
          isPro ? 'border-purple-200' : 'border-slate-200'
        }`}>
          {/* Header */}
          <div className="flex gap-6 items-start mb-6">
            <div className="relative">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-xl ${
                isPro ? 'bg-gradient-to-br from-purple-600 to-yellow-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'
              }`}>
                <span className="text-white">{getIconEmoji(app.icon)}</span>
              </div>
              {isPro && (
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex gap-3 items-center mb-3">
                <h1 className="text-3xl md:text-4xl font-black text-slate-900">{app.name}</h1>
                {isPro && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-yellow-600 text-white border-0 font-bold">
                    PRO
                  </Badge>
                )}
                {isOpenSource && (
                  <Badge variant="outline" className="border-green-500 text-green-700 font-bold">
                    OPEN SOURCE
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">v{app.version}</Badge>
              </div>
              
              {/* Pricing Section */}
              <div className="mb-4">
                {isPro ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black text-purple-600">
                        ${app.price}
                      </span>
                      <span className="text-slate-500 font-medium">USD</span>
                    </div>
                    {app.trial_available && (
                      <Badge variant="outline" className="border-green-500 text-green-700 font-bold">
                        <Clock className="w-3 h-3 mr-1" />
                        {app.trial_days}-Day Free Trial
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-green-600">FREE</span>
                    <Badge variant="outline" className="border-green-500 text-green-700 font-bold">
                      Open Source
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <User2 className="w-4 h-4" />
                  <span className="font-medium">{app.author_name || "Unknown developer"}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Updated: {new Date(app.updated_at).toLocaleDateString()}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  <span className="font-bold text-green-600">{app.download_count} downloads</span>
                </span>
              </div>
              
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                isPro ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {app.categories?.name || 'Uncategorized'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-lg text-slate-800 leading-relaxed">{app.description}</p>
          </div>

          {/* Features Comparison */}
          {app.features && app.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Basic Features */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    {isPro ? 'Basic Features' : 'Included Features'}
                  </h4>
                  <ul className="space-y-2">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pro Features */}
                {isPro && app.pro_features && app.pro_features.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-yellow-50 rounded-2xl p-6 border border-purple-200">
                    <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center gap-2">
                      <Crown className="w-5 h-5 text-purple-600" />
                      Professional Features
                    </h4>
                    <ul className="space-y-2">
                      {app.pro_features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-700">
                          <Shield className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {app.tags && app.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex gap-2 flex-wrap">
                {app.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer transition-colors">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            {isPro ? (
              <>
                <Button className="bg-gradient-to-r from-purple-600 to-yellow-600 hover:from-purple-700 hover:to-yellow-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all" asChild>
                  <a href={app.homepage_url} target="_blank" rel="noopener noreferrer">
                    <Crown className="w-5 h-5 mr-2" />
                    {app.trial_available ? 'Start Free Trial' : 'Purchase Now'}
                  </a>
                </Button>
                {app.trial_available && (
                  <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 font-bold px-6 py-3 rounded-2xl" asChild>
                    <a href={app.homepage_url} target="_blank" rel="noopener noreferrer">
                      <Clock className="w-4 h-4 mr-2"/>
                      {app.trial_days}-Day Trial
                    </a>
                  </Button>
                )}
              </>
            ) : (
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all" asChild>
                <a href={app.repo_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View Source Code
                </a>
              </Button>
            )}
            
            {app.homepage_url && (
              <Button variant="outline" className="border-slate-300 hover:bg-slate-50 font-bold px-6 py-3 rounded-2xl" asChild>
                <a href={app.homepage_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2"/>
                  Visit Homepage
                </a>
              </Button>
            )}
          </div>

          <Separator className="my-6" />

          {/* Technical Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">System Requirements</h4>
              <p className="text-slate-600">{app.requirements || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-2">License</h4>
              <p className="text-slate-600">{app.license}</p>
            </div>
          </div>

          {app.installation_notes && (
            <div className="mb-6">
              <h4 className="font-bold text-slate-800 mb-2">Installation Notes</h4>
              <p className="text-slate-600">{app.installation_notes}</p>
            </div>
          )}

          {app.documentation_url && (
            <div className="mb-6">
              <a href={app.documentation_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-500 font-medium underline transition-colors">
                📚 View Documentation
              </a>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="text-center">
          <Link to="/appstore" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium transition-colors">
            ← Back to App Store
          </Link>
        </div>
      </div>
    </div>
  );
}