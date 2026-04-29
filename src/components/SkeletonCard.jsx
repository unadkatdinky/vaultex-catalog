export default function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 bg-surface2 animate-pulse"></div>
      
      {/* Body Skeleton */}
      <div className="p-4">
        <div className="h-4 bg-surface2 rounded w-4/5 mb-3 animate-pulse"></div>
        <div className="h-3 bg-surface2 rounded w-1/2 mb-3 animate-pulse"></div>
        <div className="h-3 bg-surface2 rounded w-2/3 mb-4 animate-pulse"></div>
        
        {/* Chips Skeleton */}
        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 bg-surface2 rounded-md animate-pulse"></div>
          <div className="h-6 w-16 bg-surface2 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}