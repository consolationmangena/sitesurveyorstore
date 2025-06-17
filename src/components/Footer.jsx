export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-professional">
        <div className="py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} SiteSurveyor – Professional Geomatics Solutions Platform
              </span>
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <a 
                href="https://github.com/consolationmangena/sitesurveyor" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub Repository
              </a>
              <span className="text-border">•</span>
              <span className="text-muted-foreground">Apache 2.0 License</span>
              <span className="text-border">•</span>
              <span className="text-muted-foreground">Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}