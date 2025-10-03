export function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 w-full animate-pulse rounded bg-gray-200" />
      ))}
    </div>
  );
}


