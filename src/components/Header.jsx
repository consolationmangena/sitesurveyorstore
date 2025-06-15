
import { Search, Database } from "lucide-react";

export default function Header({ title, subtitle, showSearch = false }) {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appstore", label: "App Store" },
    { href: "/about", label: "About" },
    { href: "/request-solution", label: "Request" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-slate-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=80&h=80&fit=crop&crop=center"
                alt="SiteSurveyor Logo"
                className="relative w-12 h-12 rounded-xl shadow-lg object-cover border-2 border-white"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-sm text-slate-600 font-medium">
                {subtitle}
              </p>
            </div>
          </div>

          {showSearch && (
            <form className="hidden md:flex flex-1 mx-8 max-w-lg relative">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  className="w-full rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-500"
                  type="search"
                  placeholder="Search apps and tools..."
                  aria-label="Search for apps"
                  disabled
                />
              </div>
            </form>
          )}

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-medium">
              <Database className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">Open Source</span>
              <span className="text-slate-400">•</span>
              <span className="text-blue-600">MIT Licensed</span>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4 space-y-3">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                className="w-full rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-500"
                type="search"
                placeholder="Search apps and tools..."
                aria-label="Search for apps"
                disabled
              />
            </div>
          )}
          <nav className="flex items-center justify-center gap-4 sm:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
