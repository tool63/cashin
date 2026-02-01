// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Description */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Freecash Clone</h2>
          <p>
            Earn rewards with top offers, surveys, and games — always fast payouts
            and trusted experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Explore</h3>
          <ul className="space-y-1 text-sm">
            <li>Earn</li>
            <li>Cashout</li>
            <li>How It Works</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Connect</h3>
          <ul className="space-y-1 text-sm">
            <li>Contact Support</li>
            <li>Follow on Twitter</li>
            <li>Join Community</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t border-indigo-800 pt-4">
        © 2026 Freecash Clone — All Rights Reserved
      </div>
    </footer>
  );
}
