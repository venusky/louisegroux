"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null; // Pas de footer sur le dashboard admin
  }

  return (
    <footer
      style={{
        borderTop: "1px solid hsl(var(--border-color))",
        backgroundColor: "rgba(19, 24, 36, 0.4)",
        padding: "60px 40px 30px",
        marginTop: "auto",
      }}
    >
      <div
        className="main-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "40px",
          padding: 0,
          marginBottom: "40px",
        }}
      >
        {/* Colonne 1 : Logo & Citations */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link href="/" style={{ display: "inline-flex", flexDirection: "column" }}>
            <span className="font-serif" style={{ fontSize: "1.4rem", letterSpacing: "0.05em" }}>LOUISE GROUX</span>
            <span style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "hsl(var(--accent-gold))" }}>
              Artiste Peintre
            </span>
          </Link>
          <p style={{ fontSize: "0.85rem", fontStyle: "italic", maxWidth: "300px" }}>
            "Le tableau est fini quand il a effacé l'idée." — Georges Braque
          </p>
        </div>

        {/* Colonne 2 : Liens Rapides */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "hsl(var(--accent-gold))", fontWeight: 600 }}>
            Navigation
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.9rem" }}>
            <Link href="/galerie" style={{ color: "hsl(var(--text-secondary))" }}>Galerie d'Art</Link>
            <Link href="/biographie" style={{ color: "hsl(var(--text-secondary))" }}>Biographie & Démarche</Link>
            <Link href="/goodies" style={{ color: "hsl(var(--text-secondary))" }}>Boutique du Kiff</Link>
            <Link href="/evenement" style={{ color: "hsl(var(--text-secondary))" }}>Événements</Link>
            <Link href="/contact" style={{ color: "hsl(var(--text-secondary))" }}>Me contacter</Link>
          </div>
        </div>

        {/* Colonne 3 : Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "hsl(var(--accent-gold))", fontWeight: 600 }}>
            Atelier & Contact
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.9rem", color: "hsl(var(--text-secondary))" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Mail size={16} className="gold-text" /> bonjour@louisegroux.com
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Phone size={16} className="gold-text" /> 06 99 01 51 66
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <MapPin size={16} className="gold-text" /> Château de la Thibaudière, France
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          paddingTop: "24px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          fontSize: "0.8rem",
          color: "hsl(var(--text-muted))",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <span>
          Copyright © {new Date().getFullYear()}. Tous droits réservés - Louise Groux.
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/contact">Politique de confidentialité</Link>
          <Link href="/contact">Mentions légales</Link>
          <Link href="/contact">Protection des données</Link>
        </div>
      </div>
    </footer>
  );
}
