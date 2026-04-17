export function PostSkeleton() {
  return (
    <div
      className="rounded-[var(--radius-lg)] overflow-hidden animate-pulse"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    >
      <div className="flex items-center gap-3 px-5 pt-5 pb-3">
        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
        <div className="flex-1 space-y-1.5">
          <div className="h-3 w-28 rounded" style={{ backgroundColor: "var(--color-border)" }} />
          <div className="h-2.5 w-20 rounded" style={{ backgroundColor: "var(--color-border)" }} />
        </div>
      </div>
      <div className="px-5 pb-4 space-y-2">
        <div className="h-3 w-full rounded" style={{ backgroundColor: "var(--color-border)" }} />
        <div className="h-3 w-5/6 rounded" style={{ backgroundColor: "var(--color-border)" }} />
        <div className="h-3 w-3/4 rounded" style={{ backgroundColor: "var(--color-border)" }} />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-32 rounded-[var(--radius-lg)]" style={{ backgroundColor: "var(--color-surface)" }} />
      <div className="h-4 w-40 rounded" style={{ backgroundColor: "var(--color-border)" }} />
      <div className="h-3 w-60 rounded" style={{ backgroundColor: "var(--color-border)" }} />
    </div>
  );
}