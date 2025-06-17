import AppCard from "./AppCard";

export default function AppGrid({ apps }) {
  return (
    <section className="w-full animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-14 place-items-center">
          {apps.map((app, i) => (
            <div
              key={app.id || app.name + i}
              className="rounded-2xl bg-card shadow-lg hover:shadow-2xl transition-shadow duration-200 hover:scale-105 border border-border p-0"
              style={{ minWidth: "320px", maxWidth: "380px", width: "100%" }}
            >
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}