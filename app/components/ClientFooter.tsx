"use client";

import React from "react";

const ClientFooter = () => {
  return (
    <footer className="footer-bg text-gray-300">
      <div className="footer-wrap">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">Get Started</h3>
            <ul className="footer-list">
              <li><a href="/how-it-works">How Cashooz Works</a></li>
              <li><a href="/start-earning">Start Earning</a></li>
              <li><a href="/cashout">Cashout Methods</a></li>
              <li><a href="/trust-safety">Trust & Safety</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Company</h3>
            <ul className="footer-list">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Support</h3>
            <ul className="footer-list">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Follow Us</h3>
            <div className="footer-social">
              <span>F</span>
              <span>T</span>
              <span>I</span>
            </div>
          </div>
        </div>

        <p className="footer-copy mt-6 text-center text-gray-500">
          © 2026 Cashog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default ClientFooter;
