/** Lightweight placeholders shown while a route's URL-specific content streams in. */
export function ProductSkeleton() {
  return (
    <div className="container-x pb-24 pt-[calc(var(--header-h)+1.75rem)] md:pt-[calc(var(--header-h)+2.5rem)]" aria-busy="true">
      <div className="h-3 w-48 animate-pulse bg-sand" />
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="aspect-square animate-pulse bg-sand/60 md:aspect-[5/5.4] lg:col-span-7" />
        <div className="space-y-5 lg:col-span-5">
          <div className="h-3 w-32 animate-pulse bg-sand" />
          <div className="h-14 w-4/5 animate-pulse bg-sand" />
          <div className="h-8 w-28 animate-pulse bg-sand" />
          <div className="h-24 w-full animate-pulse bg-sand/60" />
          <div className="h-13 w-full animate-pulse bg-sand" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container-x min-h-[70svh] pb-24 pt-[calc(var(--header-h)+3rem)]" aria-busy="true">
      <div className="h-3 w-40 animate-pulse bg-sand" />
      <div className="mt-10 h-16 w-2/3 animate-pulse bg-sand" />
      <div className="mt-6 h-5 w-1/2 animate-pulse bg-sand/60" />
    </div>
  );
}
