"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (section: string) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="font-bold mb-2 cursor-pointer" onClick={() => toggle("company")}>
            {t("footer.columns.company")}
          </h4>
          {open["company"] && (
            <ul className="space-y-1 mt-2">
              <li><Link href="/about">{t("footer.links.about")}</Link></li>
              <li><Link href="/careers">{t("footer.links.careers")}</Link></li>
              <li><Link href="/blog">{t("footer.links.blog")}</Link></li>
            </ul>
          )}
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-bold mb-2 cursor-pointer" onClick={() => toggle("support")}>
            {t("footer.columns.support")}
          </h4>
          {open["support"] && (
            <ul className="space-y-1 mt-2">
              <li><Link href="/help">{t("footer.links.helpCenter")}</Link></li>
              <li><Link href="/faq">{t("footer.links.faq")}</Link></li>
              <li><Link href="/contact">{t("footer.links.contactUs")}</Link></li>
            </ul>
          )}
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-bold mb-2 cursor-pointer" onClick={() => toggle("legal")}>
            {t("footer.columns.legal")}
          </h4>
          {open["legal"] && (
            <ul className="space-y-1 mt-2">
              <li><Link href="/terms">{t("footer.links.terms")}</Link></li>
              <li><Link href="/privacy">{t("footer.links.privacy")}</Link></li>
              <li><Link href="/cookies">{t("footer.links.cookies")}</Link></li>
            </ul>
          )}
        </div>

        {/* Column 4 - Social */}
        <div>
          <h4 className="font-bold mb-2">{t("footer.columns.followUs")}</h4>
          <ul className="flex space-x-4 mt-2">
            <li><Link href="https://twitter.com" target="_blank">Twitter</Link></li>
            <li><Link href="https://facebook.com" target="_blank">Facebook</Link></li>
            <li><Link href="https://instagram.com" target="_blank">Instagram</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 mt-8 text-sm">
        &copy; {new Date().getFullYear()} Cashog. {t("footer.rights")}
      </div>
    </footer>
  );
}
