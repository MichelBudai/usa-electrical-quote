"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

interface Props {
  phoneTel: string;
  ctaLabel: string;
  siteName: string;
  services: readonly { slug: string; label: string }[];
}

export function Header({ phoneTel, ctaLabel, siteName, services }: Props) {
  const [drawerOpen, setDrawerOpen]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDrawer  = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">

        {/* Logo — éclair électricité */}
        <Link href="/" className="navbar-logo" aria-label={`${siteName} home`}>
          <span className="navbar-logo-icon" aria-hidden>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="navbar-logo-text">{siteName}</span>
        </Link>

        {/* Droite : dropdown Services + bouton Call */}
        <div className="navbar-right">
          <div className="navbar-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="navbar-link navbar-dropdown-trigger"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen((o) => !o)}
            >
              Services ▾
            </button>
            {dropdownOpen && (
              <div className="navbar-dropdown-menu" role="menu">
                {services.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="navbar-dropdown-item"
                    role="menuitem"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <a href={phoneTel} className="navbar-cta">{ctaLabel}</a>
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          className="navbar-toggle"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={toggleDrawer}
        >
          <svg className="navbar-toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {drawerOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Backdrop mobile */}
      <div
        className={`navbar-backdrop ${drawerOpen ? "is-open" : ""}`}
        aria-hidden
        onClick={closeDrawer}
      />

      {/* Drawer mobile */}
      <nav
        className={`navbar-drawer ${drawerOpen ? "is-open" : ""}`}
        aria-label="Menu"
        aria-hidden={!drawerOpen}
      >
        <p className="navbar-drawer-title">Services</p>
        <div className="navbar-drawer-links">
          {services.map(({ slug, label }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="navbar-drawer-link"
              onClick={closeDrawer}
            >
              {label} →
            </Link>
          ))}
        </div>
        <div className="navbar-drawer-cta">
          <a href={phoneTel} className="navbar-cta" onClick={closeDrawer}>
            {ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
}
