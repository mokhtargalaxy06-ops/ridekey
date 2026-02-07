import { Menu, X } from "lucide-react";
import { languageLabels, supportedLanguages } from "../i18n";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useI18n } from "../i18nContext";

// Component: Header

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { to: "/", label: t.nav.home },
    { to: "/bikes", label: t.nav.motorcycles },
    { to: "/rentals", label: t.nav.rentals },
    { to: "/rides", label: t.nav.rides || "Rides" },
    { to: "/about", label: t.nav.about },
    { to: "/blog", label: t.nav.blog },
    { to: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold">
          <span className="inline-flex h-48 w-48 items-center justify-center rounded-full bg-ink/80 p-1 ring-1 ring-white/10">
            <img
              src="/logo/Logo.png"
              alt="RideKey"
              className="max-h-32 w-32 object-contain"
            />
          </span>
          <span className="tracking-wide">RideKey</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="transition text-slate-200 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <label className="sr-only" htmlFor="language-switcher">
            {t.common.language || "Language"}
          </label>
          <select
            id="language-switcher"
            value={lang}
            onChange={(event) => setLang(event.target.value)}
            className="rounded-full border border-white/15 bg-transparent px-3 py-2 text-xs text-white"
          >
            {supportedLanguages.map((code) => (
              <option key={code} value={code} className="text-ink">
                {languageLabels[code] || code}
              </option>
            ))}
          </select>
          <ThemeToggle />
          <Link
            to="/bikes#whatsapp-checkout"
            className="rounded-full bg-accent px-4 py-2 text-xs font-semibold"
          >
            {t.home.ctaBook}
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-white/5 bg-ink/95 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-slate-200 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor="language-switcher-mobile">
                {t.common.language || "Language"}
              </label>
              <select
                id="language-switcher-mobile"
                value={lang}
                onChange={(event) => setLang(event.target.value)}
                className="rounded-full border border-white/15 bg-transparent px-3 py-2 text-xs text-white"
              >
                {supportedLanguages.map((code) => (
                  <option key={code} value={code} className="text-ink">
                    {languageLabels[code] || code}
                  </option>
                ))}
              </select>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
