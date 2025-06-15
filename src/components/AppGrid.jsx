
import AppCard from "./AppCard";

export default function AppGrid({ apps, viewMode = "grid" }) {
  return (
    <section className="w-full animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {apps.map((app, i) => (
            <AppCard key={app.id || app.name + i} app={app} viewMode={viewMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
