
import { Book, Users, Building2, Github } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-accent/30 to-primary/10 px-4 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white/90 shadow-lg rounded-2xl p-8 border border-accent/50 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <Book className="w-9 h-9 text-green-700" />
          <h1 className="text-2xl md:text-3xl font-black text-primary">About SiteSurveyor</h1>
        </div>
        
        {/* Mission */}
        <div className="mb-8">
          <p className="text-base md:text-lg text-muted-foreground mb-4">
            <b>SiteSurveyor</b> is a community-driven open-source app store for geomatics professionals, surveyors, GIS practitioners, and planners across Africa and beyond.
          </p>
          <ul className="list-disc list-inside text-muted-foreground mb-5 space-y-1">
            <li><b>Empowering local solutions:</b> Free and open alternatives to expensive, closed mapping tools.</li>
            <li><b>For field & office:</b> Modern applications for working with spatial data, all MIT licensed.</li>
            <li><b>Built for Africa:</b> Open, reliable, and accessible—enabling professionals to solve real-world challenges.</li>
          </ul>
        </div>

        {/* Team Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-primary">Team & Contributors</h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-accent/20 rounded-lg p-6 mb-4">
            <h3 className="font-semibold text-primary mb-2">Project Lead</h3>
            <p className="text-muted-foreground">
              <b>Consolation Mangena</b> - Leading the development and vision of SiteSurveyor as an open-source geomatics solution for Africa.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            This project welcomes contributors from around the world. Join our community on GitHub to help build the future of accessible geomatics tools.
          </p>
        </div>

        {/* Organizations Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-primary">Supporting Organizations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-lg p-4 border border-accent/30">
              <h3 className="font-semibold text-primary mb-2">Open Source Community</h3>
              <p className="text-sm text-muted-foreground">
                Built with support from the global open-source community, ensuring transparency and collaborative development.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-primary/5 rounded-lg p-4 border border-green-200">
              <h3 className="font-semibold text-primary mb-2">African Geomatics Network</h3>
              <p className="text-sm text-muted-foreground">
                Empowering geomatics professionals across Africa with accessible, locally-relevant tools and solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Repository Info */}
        <div className="mb-6">
          <p className="text-muted-foreground mb-4">
            This store and its apps are hosted on GitHub for open collaboration. Contributors from every background are welcome to create, improve, and share!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://github.com/consolationmangena/sitesurveyor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/80 hover:to-accent/80 transition"
            >
              <Github className="w-4 h-4" />
              Official Repository
            </a>
            <a
              href="https://github.com/sitesurveyor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 transition"
            >
              🌍 Contribute or Explore Apps
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center pt-4 border-t border-accent/20">
          <p className="text-sm text-muted-foreground">
            MIT Licensed • Open Source • Built for Africa and the World
          </p>
        </div>
      </div>
    </div>
  );
}
