
import AppCard from "./AppCard";

export default function AppGrid({ apps, viewMode = "grid" }) {
  return (
    <section className="w-full animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {apps.map((app, i) => (
            <div
              key={app.id || app.name + i}
              className="rounded-2xl bg-gradient-to-br from-white via-secondary/5 to-primary/5 hover:shadow-2xl transition-shadow duration-300"
            >
              <AppCard app={app} viewMode={viewMode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
