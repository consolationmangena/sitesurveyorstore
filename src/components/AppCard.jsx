import { Star, Download, ExternalLink, Github, Calendar, Tag, Heart } from "lucide-react";
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 p-6 group hover:scale-[1.02]">
          <div className="flex items-center gap-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-2xl text-white">
                {getIconEmoji(app.icon)}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-black text-slate-800 truncate">
                      {app.name}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={`rounded-full p-1 transition-all ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-slate-400 hover:text-red-500'}`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  <p className="text-slate-600 font-medium mb-3 line-clamp-2">
                    {app.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    {app.author && (
                      <span className="font-medium">by {app.author}</span>
                    )}
                    {app.version && (
                      <Badge variant="outline" className="text-xs">
                        v{app.version}
                      </Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(app.updated_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span className="font-medium text-green-600">{downloadCount}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-6 hover:scale-105 transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Get App
                  </Button>
                </div>
              </div>

              {/* Tags */}
              {app.tags && app.tags.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Tag className="w-4 h-4 text-slate-400" />
                  {app.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer transition-colors">
                      {tag}
                    </Badge>
                  ))}
                  {app.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{app.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid view
  return (
    <Link to={`/app/${app.id}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
              <span className="text-xl text-white transform group-hover:scale-110 transition-transform duration-300">
                {getIconEmoji(app.icon)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-800 truncate">
                  {app.name}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`rounded-full p-1 transition-all ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-slate-400 hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
              </div>
              {app.category && (
                <p className="text-sm text-blue-600 font-semibold">
                  {app.category}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-600 font-medium mb-4 line-clamp-3 min-h-[4.5rem]">
            {app.description}
          </p>

          {/* Metadata */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                <span className="font-medium text-green-600">{downloadCount} downloads</span>
              </div>
              {app.version && (
                <Badge variant="outline" className="text-xs">
                  v{app.version}
                </Badge>
              )}
            </div>
            
            {app.author && (
              <div className="text-sm text-slate-500">
                <span className="font-medium">by {app.author}</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Updated {formatDate(app.updated_at)}</span>
            </div>
          </div>

          {/* Tags */}
          {app.tags && app.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {app.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs hover:bg-blue-100 cursor-pointer transition-colors">
                  {tag}
                </Badge>
              ))}
              {app.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{app.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-full hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Get App
            </Button>
            {app.homepage_url && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(app.homepage_url, '_blank')}
                className="rounded-full hover:scale-105 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* License */}
          {app.license && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                Licensed under {app.license}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
