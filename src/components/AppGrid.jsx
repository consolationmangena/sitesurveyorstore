
import AppCard from "./AppCard";

export default function AppGrid({ apps, viewMode = "grid" }) {
  return (
    <section className="w-full animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {apps.map((app, i) => (
          <AppCard key={app.id || app.name + i} app={app} viewMode={viewMode} />
        ))}
      </div>
    </section>
  );
}
