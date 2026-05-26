"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, cartCount } = useCart();

  // Détecter le défilement pour modifier le style du header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const categories = [
    { name: "Vue d'ensemble", path: "/galerie" },
    { name: "La Ligne d'Honneur", path: "/galerie?cat=La Ligne d'Honneur" },
    { name: "Le jardin d'Elionne", path: "/galerie?cat=Le jardin d'Elionne" },
    { name: "La Passion du Sentiment", path: "/galerie?cat=La Passion du Sentiment" },
    { name: "Le Seigneur est avec Vous", path: "/galerie?cat=Le Seigneur est avec Vous" },
    { name: "Trophées", path: "/galerie?cat=Trophée" },
  ];

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null; // Pas de Navbar standard dans la zone admin
  }

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo}>
          <span>LOUISE GROUX</span>
          <span className={styles.logoSub}>Artiste Peintre</span>
        </Link>

        {/* Navigation Desktop */}
        <nav className={styles.nav}>
          <div className={styles.dropdownContainer}>
            <Link href="/galerie" className={styles.navLink} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              Galerie <ChevronDown size={14} />
            </Link>
            <div className={styles.dropdown}>
              {categories.map((cat, index) => (
                <Link key={index} href={cat.path} className={styles.dropdownItem}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/biographie" className={styles.navLink}>
            Biographie
          </Link>
          
          <Link href="/goodies" className={styles.navLink}>
            Boutique du kiff
          </Link>
          
          <Link href="/evenement" className={styles.navLink}>
            Événements
          </Link>
          
          <Link href="/contact" className={styles.navLink}>
            Contactez-moi
          </Link>
        </nav>

        {/* Actions (Panier, Connexion, Burger) */}
        <div className={styles.actions}>
          <Link href="/login" className={styles.iconBtn} aria-label="Espace Admin/Client">
            <User size={20} />
          </Link>
          
          <button className={styles.iconBtn} onClick={toggleCart} aria-label="Ouvrir le panier">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          <button 
            className={styles.burger} 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu Mobile"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Navigation Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="glass-panel" 
          style={{
            position: "fixed",
            top: scrolled ? "70px" : "80px",
            left: 0,
            width: "100%",
            height: "calc(100vh - 80px)",
            zIndex: 99,
            borderRadius: 0,
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "none",
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            gap: "24px",
            background: "rgba(11, 15, 25, 0.98)"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span style={{ fontSize: "0.8rem", color: "hsl(var(--accent-gold))", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 500 }}>Galerie</span>
            <div style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "12px", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
              {categories.map((cat, i) => (
                <Link key={i} href={cat.path} style={{ fontSize: "0.95rem", color: "hsl(var(--text-secondary))" }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/biographie" style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Biographie
          </Link>
          
          <Link href="/goodies" style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Boutique du kiff
          </Link>
          
          <Link href="/evenement" style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Événements
          </Link>
          
          <Link href="/contact" style={{ fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Contactez-moi
          </Link>
        </div>
      )}
    </>
  );
}
