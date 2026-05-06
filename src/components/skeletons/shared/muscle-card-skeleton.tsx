export default function MuscleCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-border/60 bg-card">
      <div className="aspect-square w-full bg-muted" />
      <div className="px-3 py-2.5">
        <div className="h-3.5 w-2/3 rounded-full bg-muted" />
      </div>
    </div>
  );
}
