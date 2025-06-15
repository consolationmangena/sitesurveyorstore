
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
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl bg-gradient-to-br from-card/100 to-secondary/40 shadow-lg hover:shadow-2xl border-2 border-accent/50 hover:border-primary/70 hover:scale-105 duration-200 p-6 group h-full transition-all"
      tabIndex={0}
      aria-label={`Open ${name} app repository`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
          <Icon size={28} />
        </span>
        <h3 className="text-lg font-semibold leading-tight group-hover:underline">{name}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gradient-to-r from-accent via-secondary to-primary text-primary-foreground rounded px-2 py-0.5 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
