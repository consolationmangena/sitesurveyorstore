
export default function Footer() {
  return (
    <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-slate-600">
              © {new Date().getFullYear()} SiteSurveyor – Africa's Open-Source Geomatics Appstore
            </span>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="https://github.com/consolationmangena/sitesurveyor" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition-colors">
              GitHub
            </a>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">MIT License</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">Open Source</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
