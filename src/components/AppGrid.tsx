
import { AppCard } from "./AppCard";

export interface AppGridItem {
  name: string;
  description: string;
  repoUrl: string;
  icon?: "map" | "camera" | "database" | "book";
  tags?: string[];
}

interface AppGridProps {
  apps: AppGridItem[];
}

export default function AppGrid({ apps }: AppGridProps) {
  return (
    <section className="w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {apps.map((app, i) => (
          <AppCard key={app.repoUrl + i} {...app} />
        ))}
      </div>
    </section>
  );
}
