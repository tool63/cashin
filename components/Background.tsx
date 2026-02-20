"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
        }}
      />

      {/* Glow blobs */}
      <div className="absolute w-80 h-80 rounded-full blur-[120px] top-10 left-10 animate-blobMove blob-green" />
      <div className="absolute w-96 h-96 rounded-full blur-[140px] bottom-10 right-10 animate-blobMove2 blob-yellow" />

      {/* Frosted Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
    </div>
  );
}
