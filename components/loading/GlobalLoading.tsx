import Skeleton from "./Skeleton";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#070A14] px-6 py-16 space-y-12">

      {/* Logo */}
      <Skeleton className="h-12 w-48 rounded-xl" />

      {/* Content Blocks */}
      <div className="space-y-6 w-full max-w-6xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-40 w-full rounded-2xl"
          />
        ))}
      </div>

    </div>
  );
}
