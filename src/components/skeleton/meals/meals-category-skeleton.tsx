export default function MealsCategorySkeleton() {
  return (
    <main>
      <section className="relative z-30 container mx-auto px-4 py-10">
        <div className="grid grid-cols-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-4 border-b border-white/5 px-4 py-3"
            >
              <div className="size-20 shrink-0 rounded-xl bg-[#2a2a2a]" />

              <div className="min-w-0 flex-1">
                <div className="mb-2 h-4 w-32 rounded bg-[#2f2f2f]" />
                <div className="h-3 w-20 rounded bg-[#252525]" />
              </div>

              <div className="h-7 w-16 rounded-full bg-[#2d2d2d]" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
