export default function MealsSkeleton() {
  return (
    <section className="relative z-30 mx-4 mt-10 min-h-screen animate-pulse rounded-2xl text-white">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#161616]">
        {/* Hero */}
        <div className="relative h-60 bg-[#222]" />

        <div className="relative -mt-6 p-5">
          {/* Title */}
          <div className="mb-2 h-7 w-52 rounded-lg bg-[#2a2a2a]" />

          {/* Youtube link */}
          <div className="mb-6 h-4 w-32 rounded bg-[#252525]" />

          {/* Ingredients title */}
          <div className="mb-3 h-3 w-24 rounded bg-[#252525]" />

          {/* Ingredients */}
          <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-[#1a1a1a] p-2.5"
              >
                <div className="mb-2 h-3 w-16 rounded bg-[#2d2d2d]" />
                <div className="h-4 w-24 rounded bg-[#333]" />
              </div>
            ))}
          </div>

          {/* Instructions title */}
          <div className="mb-3 h-3 w-28 rounded bg-[#252525]" />

          {/* Instructions */}
          <div className="space-y-4 rounded-xl border border-white/5 bg-[#111] p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-6 w-6 shrink-0 rounded-full bg-[#2d2d2d]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-full rounded bg-[#2a2a2a]" />
                  <div className="h-3 w-5/6 rounded bg-[#2a2a2a]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
