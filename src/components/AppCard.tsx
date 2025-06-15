
import { Book, Map, Camera, Database } from "lucide-react";

interface AppCardProps {
  name: string;
  description: string;
  repoUrl: string;
  icon?: "map" | "camera" | "database" | "book";
  tags?: string[];
}

const iconVariants = {
  map: Map,
  camera: Camera,
  database: Database,
  book: Book,
};

export function AppCard({ name, description, repoUrl, icon = "map", tags }: AppCardProps) {
  const Icon = iconVariants[icon] || Map;
  return (
    <div className="bg-card shadow-xl rounded-2xl p-4 flex flex-col items-start min-h-[260px] max-w-xs mx-auto relative transition-transform hover:scale-105 hover:shadow-2xl duration-200 group">
      <div className="flex items-center gap-3 mb-3 w-full">
        <div className="rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg w-14 h-14 shrink-0">
          <Icon size={30} className="text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-tight mb-0.5 group-hover:text-primary transition">{name}</h3>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-xs px-2 py-0.5 rounded-full text-secondary-foreground font-medium border border-primary/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="text-muted-foreground text-sm flex-1 mb-8">{description}</div>
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-gradient-to-br from-primary/90 to-accent/80 text-primary-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-md transition group-hover:from-primary group-hover:to-accent group-hover:shadow-lg"
        tabIndex={0}
        aria-label={`Open ${name} app repository`}
      >
        View App
      </a>
    </div>
  );
}
