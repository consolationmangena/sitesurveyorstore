import { Star, Download, ExternalLink, Github, Calendar, Tag, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppCard({ app, viewMode = "grid" }) {
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
    // Simulate download count increase
    setDownloadCount(prev => prev + 1);
    console.log(`Downloading ${app.name}...`);
    window.open(app.repo_url, '_blank');
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

  if (viewMode === "list") {
    return (
      <Link to={`/app/${app.id}`}>
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 p-8 group-hover:scale-[1.02] hover:border-blue-200">
            <div className="flex items-center gap-8">
              {/* Enhanced Icon */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">
                    {getIconEmoji(app.icon)}
                  </span>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-black text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {app.name}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={`rounded-full p-2 transition-all hover:scale-110 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <p className="text-slate-600 font-medium mb-4 line-clamp-2 text-lg leading-relaxed">
                      {app.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      {app.author && (
                        <span className="font-semibold">by {app.author}</span>
                      )}
                      {app.version && (
                        <Badge variant="outline" className="text-xs font-bold border-2">
                          v{app.version}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{formatDate(app.updated_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span className="font-bold text-green-600">{downloadCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Actions */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Button
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl px-8 py-3 hover:scale-105 transition-all shadow-lg hover:shadow-xl font-bold"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Get App
                    </Button>
                  </div>
                </div>

                {/* Enhanced Tags */}
                {app.tags && app.tags.length > 0 && (
                  <div className="flex items-center gap-3 mt-4 flex-wrap">
                    <Tag className="w-4 h-4 text-slate-400" />
                    {app.tags.slice(0, 4).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer transition-colors rounded-full px-3 py-1 font-semibold">
                        {tag}
                      </Badge>
                    ))}
                    {app.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs rounded-full px-3 py-1 font-semibold">
                        +{app.tags.length - 4} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Enhanced Grid view
  return (
    <Link to={`/app/${app.id}`}>
      <div className="group relative h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 group h-full flex flex-col">
          <div className="p-8 flex-1 flex flex-col">
            {/* Enhanced Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl text-white transform group-hover:scale-110 transition-transform duration-300">
                    {getIconEmoji(app.icon)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-black text-slate-800 truncate group-hover:text-blue-600 transition-colors">
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
                {app.category && (
                  <p className="text-sm text-blue-600 font-bold">
                    {app.category}
                  </p>
                )}
              </div>
            </div>

            {/* Enhanced Description */}
            <p className="text-slate-600 font-medium mb-6 line-clamp-3 min-h-[4.5rem] leading-relaxed flex-1">
              {app.description}
            </p>

            {/* Enhanced Metadata */}
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
              
              {app.author && (
                <div className="text-sm text-slate-500">
                  <span className="font-semibold">by {app.author}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Updated {formatDate(app.updated_at)}</span>
              </div>
            </div>

            {/* Enhanced Tags */}
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

            {/* Enhanced Actions */}
            <div className="flex gap-3 mt-auto">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-bold py-3"
              >
                <Download className="w-4 h-4 mr-2" />
                Get App
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

            {/* Enhanced License */}
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