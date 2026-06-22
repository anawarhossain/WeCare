export default function DoctorCardSkeleton() {
  return (
    <div className="card overflow-hidden flex flex-col opacity-70 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-64 w-full bg-(--bg-muted)" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 bg-(--bg-muted) rounded" />
        <div className="h-3.5 w-1/4 bg-(--bg-muted) rounded" />

        <div className="space-y-2 pt-2 pb-3">
          <div className="h-3.5 w-full bg-(--bg-muted) rounded" />
          <div className="h-3.5 w-5/6 bg-(--bg-muted) rounded" />
          <div className="h-6 w-1/3 bg-(--bg-muted) rounded" />
        </div>

        <div className="h-10 w-full bg-(--bg-muted) rounded-md" />
      </div>
    </div>
  );
}
