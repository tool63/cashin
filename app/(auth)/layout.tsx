import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#050816] dark:via-[#070A14] dark:to-[#0B0E1A] px-4">
      {children}
    </div>
  );
}
