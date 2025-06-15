
import { Book } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-accent/30 to-primary/10 px-4 py-10 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white/90 shadow-lg rounded-2xl p-8 border border-accent/50 animate-fade-in">
        <div className="flex items-center gap-3 mb-5">
          <Book className="w-9 h-9 text-green-700" />
          <h1 className="text-2xl md:text-3xl font-black text-primary mb-2">About SiteSurveyor</h1>
        </div>
        <p className="text-base md:text-lg text-muted-foreground mb-4">
          <b>SiteSurveyor</b> is a community-driven open-source app store for geomatics professionals, surveyors, GIS practitioners, and planners across Africa and beyond.
        </p>
        <ul className="list-disc list-inside text-muted-foreground mb-5 space-y-1">
          <li><b>Empowering local solutions:</b> Free and open alternatives to expensive, closed mapping tools.</li>
          <li><b>For field & office:</b> Modern applications for working with spatial data, all MIT licensed.</li>
          <li><b>Built for Africa:</b> Open, reliable, and accessible—enabling professionals to solve real-world challenges.</li>
        </ul>
        <p className="text-muted-foreground mb-3">
          This store and its apps are hosted on GitHub for open collaboration. Contributors from every background are welcome to create, improve, and share!
        </p>
        <a
          href="https://github.com/sitesurveyor"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 mt-1 rounded-full font-semibold shadow bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/80 hover:to-accent/80 transition"
        >
          🌍 Contribute or Explore on GitHub
        </a>
      </div>
    </div>
  );
}
