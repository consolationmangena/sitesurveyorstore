
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Download, ExternalLink, Github, Calendar, Tag, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import appsData from "@/data/apps.json";

const getAppById = (id) => appsData.apps.find(a => String(a.id) === String(id));

export default function AppDetail() {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const found = getAppById(id);
    setApp(found || null);
  }, [id]);

  if (!app) {
    return (
      <div className="text-center p-16">
        <h2 className="text-3xl font-bold text-slate-700 mb-6">App Not Found</h2>
        <Link to="/appstore" className="text-blue-600 underline hover:text-blue-800">Back to App Store</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl md:max-w-4xl py-12 px-4">
      <div className="bg-white/95 rounded-2xl shadow-2xl border border-border p-8 mb-8 animate-fade-in">
        {/* Header */}
        <div className="flex gap-6 items-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-secondary flex items-center justify-center text-3xl shadow-lg">
            {/* fallback emoji for map/database/camera */}
            {app.icon === "map" ? "🗺️" : app.icon === "database" ? "📊" : app.icon === "camera" ? "📸" : "🔧"}
          </div>
          <div className="flex-1">
            <div className="flex gap-2 items-center mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">{app.name}</h1>
              <Badge variant="outline" className="text-xs">v{app.version}</Badge>
              <span className="ml-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">{app.category}</span>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-slate-500 text-sm">
                <User2 className="w-4 h-4" />
                <Link to={`/developer/${encodeURIComponent(app.author||"unknown")}`} className="hover:underline">{app.author || "Unknown developer"}</Link>
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-sm">
                <Calendar className="w-4 h-4" />
                Updated: {new Date(app.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <p className="text-lg text-slate-800">{app.description}</p>
        </div>
        {/* Badges/Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {app.tags && app.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button asChild className="bg-gradient-to-r from-blue-600 to-secondary text-white">
            <a href={app.repo_url} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View Code
            </a>
          </Button>
          {app.homepage_url && (
            <Button asChild variant="outline" className="border-slate-300">
              <a href={app.homepage_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2"/>
                Homepage
              </a>
            </Button>
          )}
          <div className="flex items-center gap-1 px-3 py-2 bg-green-50 rounded-full text-green-600 font-bold">
            <Download className="w-4 h-4" /> {app.download_count} downloads
          </div>
        </div>
        <hr className="my-4 border-muted" />
        {/* Installation, License, Docs */}
        <div className="mb-6 space-y-2">
          {app.installation_notes && (
            <div>
              <span className="font-semibold text-slate-800">How to Install:</span>
              <p className="text-slate-600">{app.installation_notes}</p>
            </div>
          )}
          {app.documentation_url && (
            <a href={app.documentation_url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-medium">
              View Documentation
            </a>
          )}
          {app.license && (
            <p className="text-xs text-slate-500 mt-1">License: {app.license}</p>
          )}
        </div>
        {/* Placeholder: Gallery, Changelog */}
        {/* Placeholder for screenshots */}
        {/* Placeholder for reviews and changelog, to be implemented */}
        <div className="h-[80px] bg-gradient-to-r from-muted to-accent/20 mb-6 flex items-center justify-center rounded-lg text-slate-400 italic">
          Gallery / Screenshots will be here (coming soon)
        </div>
        {/* Placeholder reviews */}
        <div className="mt-4">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Reviews & Ratings (coming soon)</h2>
          <div className="bg-muted rounded-2xl px-6 py-4 text-slate-400 italic">
            Community reviews and ratings will be displayed here.
          </div>
        </div>
      </div>
      {/* Back link */}
      <div className="mt-4">
        <Link to="/appstore" className="text-blue-600 underline hover:text-blue-800">&larr; Back to App Store</Link>
      </div>
    </div>
  );
}
