
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
      className="block rounded-xl bg-card shadow-md hover:shadow-xl transition-shadow border border-muted p-6 group hover:scale-105 duration-200 h-full"
      tabIndex={0}
      aria-label={`Open ${name} app repository`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 rounded-lg bg-primary text-primary-foreground shadow hover:animate-pulse">
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
              className="bg-secondary text-secondary-foreground rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  );
}
