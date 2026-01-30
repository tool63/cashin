import './globals.css';
import Footer from './components/Footer';

export const metadata = {
  title: 'Cashog - Earn Online',
  description: 'Professional earning platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Main content grows to fill available space */}
        <main className="flex-grow">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
