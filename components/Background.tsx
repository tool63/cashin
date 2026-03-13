"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">

      {/* Main Gradient */}
      <div
        className="
        absolute inset-0
        bg-gradient-to-br
        from-yellow-400
        via-green-400
        to-green-600
        dark:from-yellow-500
        dark:via-green-700
        dark:to-green-900
        opacity-90
        "
      />

      {/* Glow Blob 1 */}
      <div
        className="
        absolute w-[500px] h-[500px]
        bg-green-400/40
        dark:bg-green-600/30
        blur-[120px]
        rounded-full
        top-[5%] left-[5%]
        animate-blobMove
        "
      />

      {/* Glow Blob 2 */}
      <div
        className="
        absolute w-[450px] h-[450px]
        bg-yellow-400/40
        dark:bg-yellow-500/30
        blur-[140px]
        rounded-full
        bottom-[5%] right-[5%]
        animate-blobMove2
        "
      />

    </div>
  );
}
