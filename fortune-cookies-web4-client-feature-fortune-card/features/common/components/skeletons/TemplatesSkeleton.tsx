export function TemplatesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white p-6 rounded-xl border-2 border-gray-200"
        >
          <div className="flex justify-between mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="w-10 h-4 bg-gray-200 rounded" />
          </div>

          <div className="h-16 bg-gray-200 rounded mb-4" />

          <div className="h-3 w-1/3 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
