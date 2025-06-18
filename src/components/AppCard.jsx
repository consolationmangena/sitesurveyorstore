import { Star, Download, ExternalLink, Github, Calendar, Tag, Heart, Crown, Zap, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppCard({ app }) {
  const [isLiked, setIsLiked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(app.download_count || 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    console.log(`Downloading ${app.name}...`);
    
    if (app.app_type === 'open_source') {
      window.open(app.repo_url, '_blank');
    } else {
      window.open(app.homepage_url, '_blank');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const getIconEmoji = (iconType) => {
    const icons = {
      'map': '🗺️',
      'database': '📊',
      'camera': '📸',
      'default': '🔧'
    };
    return icons[iconType] || icons.default;
  };

  const isPro = app.app_type === 'pro';
  const isOpenSource = app.app_type === 'open_source';

  return (
    <Link to={`/app/${app.id}`}>
      <div className="group relative h-full">
        <div className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isPro ? 'bg-gradient-to-br from-purple-500/10 via-yellow-500/10 to-purple-500/10' : 'bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10'
        }`}></div>
        <div className={`relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border hover:shadow-2xl transition-all duration-300 hover:scale-105 group h-full flex flex-col ${
          isPro ? 'border-purple-200 hover:border-purple-300' : 'border-white/50 hover:border-blue-300'
        }`}>
          <div className="p-8 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <div className={`absolute inset-0 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity ${
                  isPro ? 'bg-gradient-to-br from-purple-500 to-yellow-500' : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                }`}></div>
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 ${
                  isPro ? 'bg-gradient-to-br from-purple-500 to-yellow-500' : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                }`}>
                  <span className="text-2xl text-white transform group-hover:scale-110 transition-transform duration-300">
                    {getIconEmoji(app.icon)}
                  </span>
                </div>
                {isPro && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-xl font-black truncate group-hover:transition-colors ${
                    isPro ? 'text-slate-800 group-hover:text-purple-600' : 'text-slate-800 group-hover:text-blue-600'
                  }`}>
                    {app.name}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={`rounded-full p-1 transition-all hover:scale-110 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-slate-400 hover:text-red-500'}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {isPro && (
                    <Badge className="bg-gradient-to-r from-purple-600 to-yellow-600 text-white border-0 font-bold text-xs">
                      PRO
                    </Badge>
                  )}
                  {isOpenSource && (
                    <Badge variant="outline" className="border-green-500 text-green-700 font-bold text-xs">
                      OPEN SOURCE
                    </Badge>
                  )}
                  {app.category && (
                    <p className="text-sm text-blue-600 font-bold">
                      {app.category}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-4">
              {isPro ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-purple-600">
                      ${app.price}
                    </span>
                    <span className="text-slate-500 font-medium text-sm">USD</span>
                  </div>
                  {app.trial_available && (
                    <Badge variant="outline" className="border-green-500 text-green-700 font-bold text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {app.trial_days}d Trial
                    </Badge>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-green-600">FREE</span>
                  <Badge variant="outline" className="border-green-500 text-green-700 font-bold text-xs">
                    Open Source
                  </Badge>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-600 font-medium mb-6 line-clamp-3 min-h-[4.5rem] leading-relaxed flex-1">
              {app.description}
            </p>

            {/* Pro Features Preview */}
            {isPro && app.pro_features && app.pro_features.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-bold text-purple-600">Pro Features</span>
                </div>
                <div className="space-y-1">
                  {app.pro_features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                      <Shield className="w-3 h-3 text-purple-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {app.pro_features.length > 3 && (
                    <div className="text-xs text-purple-600 font-semibold">
                      +{app.pro_features.length - 3} more features
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-200">
                  <Download className="w-4 h-4 text-green-600" />
                  <span className="font-bold text-green-700">{downloadCount}</span>
                  <span className="text-green-600 font-medium">downloads</span>
                </div>
                {app.version && (
                  <Badge variant="outline" className="text-xs font-bold border-2 rounded-full px-3 py-1">
                    v{app.version}
                  </Badge>
                )}
              </div>
              
              {app.author_name && (
                <div className="text-sm text-slate-500">
                  <span className="font-semibold">by {app.author_name}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Updated {formatDate(app.updated_at)}</span>
              </div>
            </div>

            {/* Tags */}
            {app.tags && app.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {app.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer transition-colors rounded-full px-3 py-1 font-semibold">
                    {tag}
                  </Badge>
                ))}
                {app.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs rounded-full px-3 py-1 font-semibold">
                    +{app.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <Button
                onClick={handleDownload}
                className={`flex-1 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-bold py-3 ${
                  isPro 
                    ? 'bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                }`}
              >
                {isPro ? (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    {app.trial_available ? 'Try Free' : 'Buy Now'}
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Get Free
                  </>
                )}
              </Button>
              {app.homepage_url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(app.homepage_url, '_blank')}
                  className="rounded-2xl hover:scale-105 transition-all border-2 hover:border-blue-300 hover:bg-blue-50"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* License */}
            {app.license && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center font-medium">
                  Licensed under {app.license}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}