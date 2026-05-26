"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Eye, Filter } from "lucide-react";

interface Painting {
  id: string;
  title: string;
  category: string;
  technique: string;
  dimensions: string;
  price: number;
  year: number;
  imageUrl: string;
  sold: boolean;
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Toutes",
    "La Ligne d'Honneur",
    "Le jardin d'Elionne",
    "La Passion du Sentiment",
    "Le Seigneur est avec Vous",
    "Trophée",
  ];

  // Fetch paintings from the local API
  useEffect(() => {
    async function fetchPaintings() {
      try {
        const res = await fetch("/api/paintings");
        if (res.ok) {
          const data = await res.json();
          setPaintings(data);
        }
      } catch (err) {
        console.error("Erreur chargement galerie :", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPaintings();
  }, []);

  // Définir la catégorie active à partir des query params de l'URL
  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
    } else {
      setActiveCategory("Toutes");
    }
  }, [catParam]);

  // Filtrer les œuvres
  const filteredPaintings = paintings.filter((p) => {
    const matchesCategory =
      activeCategory === "Toutes" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technique.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ background: "hsl(var(--bg-base))", minHeight: "80vh", paddingBottom: "80px" }}>
      {/* HEADER BANNER */}
      <section
        style={{
          padding: "60px 24px",
          background: "linear-gradient(to bottom, rgba(11, 15, 25, 0.6), rgba(11, 15, 25, 0.98))",
          textAlign: "center",
          borderBottom: "1px solid rgba(197, 168, 128, 0.1)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "hsl(var(--accent-gold))",
              fontWeight: 500,
            }}
          >
            Le Cabinet des Toiles
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 200,
              marginTop: "12px",
            }}
          >
            Galerie d'Œuvres d'Art
          </h1>
          <p style={{ marginTop: "12px", fontSize: "0.95rem", opacity: 0.8 }}>
            Découvrez toutes les œuvres uniques de Louise Groux et les différents thèmes abordés.
          </p>
        </div>
      </section>

      {/* ZONE FILTRES & RECHERCHE */}
      <section className="main-container" style={{ paddingBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            paddingBottom: "24px",
          }}
        >
          {/* Onglets de Catégories */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 18px",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: activeCategory === cat ? "hsl(var(--accent-gold))" : "transparent",
                  color: activeCategory === cat ? "hsl(var(--bg-base))" : "hsl(var(--text-secondary))",
                  border: `1px solid ${activeCategory === cat ? "hsl(var(--accent-gold))" : "hsl(var(--border-color))"}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "var(--transition-fast)",
                  fontWeight: activeCategory === cat ? 600 : 400,
                }}
                onMouseOver={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = "hsl(var(--accent-gold))";
                    e.currentTarget.style.color = "hsl(var(--accent-gold))";
                  }
                }}
                onMouseOut={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = "hsl(var(--border-color))";
                    e.currentTarget.style.color = "hsl(var(--text-secondary))";
                  }
                }}
              >
                {cat === "Toutes" ? "Toutes les œuvres" : cat}
              </button>
            ))}
          </div>

          {/* Recherche barre */}
          <div style={{ position: "relative", width: "300px", maxWidth: "100%" }}>
            <input
              type="text"
              placeholder="Rechercher une œuvre..."
              className="luxury-input"
              style={{ paddingLeft: "42px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </section>

      {/* GRILLE DE PEINTURES */}
      <section className="main-container" style={{ paddingTop: 0 }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <span
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: "3px solid rgba(197, 168, 128, 0.2)",
                borderTop: "3px solid hsl(var(--accent-gold))",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ marginTop: "16px", fontSize: "0.9rem", color: "hsl(var(--text-secondary))" }}>
              Chargement des toiles...
            </p>
          </div>
        ) : filteredPaintings.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0", color: "hsl(var(--text-secondary))" }}>
            <Filter size={40} style={{ margin: "0 auto 16px", opacity: 0.4 }} />
            <h3 className="font-serif">Aucune œuvre trouvée</h3>
            <p style={{ marginTop: "8px" }}>Essayez d'ajuster vos filtres de recherche ou sélectionnez une autre catégorie.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "40px",
            }}
          >
            {filteredPaintings.map((painting) => (
              <Link key={painting.id} href={`/galerie/${painting.id}`} className="luxury-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", overflow: "hidden", height: "320px", background: "#060910" }}>
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />

                  {/* Overlay au survol */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(11, 15, 25, 0.4)",
                      opacity: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "opacity 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = 0)}
                  >
                    <div
                      style={{
                        background: "rgba(19, 24, 36, 0.9)",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        border: "1px solid rgba(197, 168, 128, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.85rem",
                      }}
                    >
                      <Eye size={16} className="gold-text" /> Examiner l'œuvre
                    </div>
                  </div>

                  {/* Badge Disponibilité */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: painting.sold ? "rgba(220, 53, 69, 0.9)" : "rgba(40, 167, 69, 0.9)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {painting.sold ? "Vendue" : "Disponible"}
                  </div>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "hsl(var(--accent-gold))",
                      marginBottom: "6px",
                    }}
                  >
                    {painting.category}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: "1.45rem", marginBottom: "8px" }}>
                    {painting.title}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "hsl(var(--text-secondary))",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flex: 1,
                    }}
                  >
                    <span>Technique : {painting.technique}</span>
                    <span>Dimensions : {painting.dimensions}</span>
                    <span>Année : {painting.year}</span>
                  </div>
                  
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", color: "hsl(var(--text-muted))" }}>Estimation valeur :</span>
                    <span className="gold-text" style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem" }}>
                      {painting.price.toLocaleString("fr-FR")} €
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function Galerie() {
  return (
    <Suspense fallback={<div>Chargement de la galerie...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
