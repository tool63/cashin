"use client"

export const SectionTitle = ({ icon, text }: { icon?: string; text: string }) => (
  <div className="text-center mb-8 relative">
    <h2 className="inline-flex items-center justify-center text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-500">
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </h2>
    <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-24 h-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
  </div>
)
