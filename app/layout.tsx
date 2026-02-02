import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import { Providers } from "./providers"; // make sure it's default exported as Providers

export const metadata = {
  title: "PayUp",
  description: "Earn rewards, cash out, and get paid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <body className="transition-colors duration-300 bg-white dark:bg-[#0B0F1A] text-gray-900 dark:text-gray-100">
          <Header />
          {children}
          <Footer />
          <FloatingCTA />
        </body>
      </Providers>
    </html>
  );
}
