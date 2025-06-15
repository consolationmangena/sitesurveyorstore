
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
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mt-6 w-full animate-fade-in">
        {apps.map((app, i) => (
          <AppCard key={app.repoUrl + i} {...app} />
        ))}
      </div>
    </section>
  );
}
