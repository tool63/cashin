"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark" // default dark
      enableSystem={false} // users cannot auto-follow system
    >
      {children}
    </ThemeProvider>
  );
}

export default Providers;
