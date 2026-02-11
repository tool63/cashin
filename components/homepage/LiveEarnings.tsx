return (
  <section className="relative w-full py-16 bg-[#0b0f19]">
    <div className="max-w-7xl mx-auto px-6">

      {/* Title */}
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          💸 Live Earnings
        </h3>
        <p className="text-gray-400 text-sm md:text-base mt-2">
          Users earning rewards in real-time
        </p>
      </div>

      {/* Container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0f172a] to-[#0b1220] shadow-[0_0_50px_rgba(0,0,0,0.6)]">

        {/* Header */}
        <div className="grid grid-cols-4 px-6 py-4 text-sm uppercase tracking-wider text-gray-400 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <span>Name</span>
          <span className="text-center">Country</span>
          <span className="text-center">Amount</span>
          <span className="text-center">Time</span>
        </div>

        {/* Scroll Area */}
        <div className="h-[380px] overflow-hidden relative">
          <ul ref={listRef} className="space-y-3 p-4">
            {items.map((e) => (
              <li
                key={e.id}
                className="grid grid-cols-4 items-center px-5 py-3 rounded-xl 
                border border-white/10
                backdrop-blur-lg
                bg-white/5
                text-sm md:text-base
                text-white
                transition-all duration-300
                hover:border-emerald-400/40
                hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <span className="font-semibold truncate">
                  {e.name}
                </span>

                <span className="text-center text-xl">
                  {e.flag}
                </span>

                <span className="text-center font-bold text-emerald-400 tracking-wide">
                  {e.amount}
                </span>

                <span className="text-center text-gray-400 text-xs md:text-sm">
                  {e.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#0b0f19] to-transparent" />
      </div>
    </div>
  </section>
)
