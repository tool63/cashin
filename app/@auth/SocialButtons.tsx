"use client";

export default function SocialButtons() {
  return (
    <div className="space-y-3 mb-4">
      {/* Google Login Button */}
      <button className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
        Continue with Google
      </button>

      {/* Facebook Login Button */}
      <button className="w-full py-3 bg-[#1877F2] text-white rounded-lg font-semibold hover:bg-[#155dcf] transition">
        Continue with Facebook
      </button>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 h-px bg-neutral-700" />
        <span className="px-3 text-neutral-500 text-sm">or</span>
        <div className="flex-1 h-px bg-neutral-700" />
      </div>
    </div>
  );
}
