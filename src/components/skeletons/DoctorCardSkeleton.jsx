import Skeleton from "@/components/ui/Skeleton";

function DoctorCardSkeleton() {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col gap-4"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="flex items-start gap-4">
        <Skeleton className="w-16 h-16 shrink-0" rounded="full" />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3 opacity-60" />
        </div>
      </div>
      <div
        className="space-y-2 pt-3 border-t"
        style={{ borderColor: "var(--border-default)" }}
      >
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" rounded="sm" />
          <Skeleton className="h-3 w-2/3" rounded="sm" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" rounded="sm" />
          <Skeleton className="h-3 w-1/2" rounded="sm" />
        </div>
      </div>
      <Skeleton className="h-10 w-full mt-auto" />
    </div>
  );
}

export default function DoctorsGridSkeleton({ count = 9 }) {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-10 w-full md:w-64" />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["w-24", "w-32", "w-20", "w-28", "w-24"].map((w, i) => (
          <Skeleton key={i} className={`h-8 ${w}`} rounded="full" />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }, (_, i) => (
          <DoctorCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="w-8 h-8" />
        ))}
      </div>
    </div>
  );
}
