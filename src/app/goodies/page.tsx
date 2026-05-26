"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Tag, Info, AlertTriangle } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Goody {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

export default function Goodies() {
  const { addToCart } = useCart();

  const [goodies, setGoodies] = useState<Goody[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Toutes");

  const categories = ["Toutes", "Books", "Collaboration"];

  useEffect(() => {
    async function fetchGoodies() {
      try {
        const res = await fetch("/api/goodies");
        if (res.ok) {
          const data = await res.json();
          setGoodies(data);
        }
      } catch (err) {
        console.error("Erreur chargement boutique :", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGoodies();
  }, []);

  const filteredGoodies = goodies.filter((g) => {
    return activeCategory === "Toutes" || g.category === activeCategory;
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
            Éditions d'Exception
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 200,
              marginTop: "12px",
            }}
          >
            La Boutique du Kiff
          </h1>
          <p style={{ marginTop: "12px", fontSize: "0.95rem", opacity: 0.8 }}>
            Découvrez tous les produits liés à mes œuvres d'art : foulards en soie de Lyon, livres d'art et collaboration exclusive.
          </p>
        </div>
      </section>

      {/* ZONE FILTRES */}
      <section className="main-container" style={{ paddingBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            paddingBottom: "20px",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 20px",
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
              >
                {cat === "Toutes" ? "Tous les articles" : cat === "Collaboration" ? "Soieries & Foulards" : "Livres d'Art"}
              </button>
            ))}
          </div>
        </div>

        {/* SHOP GRID */}
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
              Préparation de la boutique...
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px",
            }}
          >
            {filteredGoodies.map((goody) => {
              const isOut = goody.stock === 0;
              const isLow = goody.stock > 0 && goody.stock <= 5;

              return (
                <div key={goody.id} className="luxury-card" style={{ display: "flex", flexDirection: "column" }}>
                  {/* Photo Produit */}
                  <div style={{ position: "relative", overflow: "hidden", height: "280px", background: "#060910" }}>
                    <img
                      src={goody.imageUrl}
                      alt={goody.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />

                    {/* Badge Catégorie */}
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        background: "rgba(11, 15, 25, 0.8)",
                        border: "1px solid rgba(197, 168, 128, 0.2)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {goody.category}
                    </div>

                    {/* Stock Alert */}
                    {isOut ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "16px",
                          left: "16px",
                          background: "rgba(220, 53, 69, 0.9)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        Indisponible
                      </div>
                    ) : isLow ? (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "16px",
                          left: "16px",
                          background: "rgba(255, 193, 7, 0.95)",
                          color: "#111",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <AlertTriangle size={12} /> Plus que {goody.stock} en stock !
                      </div>
                    ) : null}
                  </div>

                  {/* Détails Produit */}
                  <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "8px", height: "45px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {goody.title}
                    </h3>
                    <p style={{ fontSize: "0.85rem", marginBottom: "20px", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {goody.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span className="gold-text" style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", fontWeight: 500 }}>
                        {goody.price.toFixed(2)} €
                      </span>

                      <button
                        onClick={() =>
                          addToCart({
                            id: goody.id,
                            title: goody.title,
                            price: goody.price,
                            imageUrl: goody.imageUrl,
                            stock: goody.stock,
                          })
                        }
                        disabled={isOut}
                        className="luxury-button luxury-button-gold"
                        style={{
                          padding: "10px 16px",
                          fontSize: "0.75rem",
                          borderRadius: "4px",
                          gap: "6px",
                          opacity: isOut ? 0.4 : 1,
                          cursor: isOut ? "not-allowed" : "pointer",
                        }}
                      >
                        <ShoppingCart size={14} />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER NOTE SHOT */}
      <section className="main-container" style={{ textAlign: "center", marginTop: "40px", maxWidth: "800px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(197, 168, 128, 0.05)", border: "1px solid rgba(197, 168, 128, 0.15)", padding: "16px 28px", borderRadius: "8px" }}>
          <Info size={20} className="gold-text" />
          <p style={{ fontSize: "0.85rem", color: "hsl(var(--text-secondary))", textAlign: "left" }}>
            <strong>Note de livraison :</strong> Les tarifs affichés incluent les frais d'expédition sécurisée. Chaque foulard est emballé dans une boîte cadeau exclusive conçue par l'artiste.
          </p>
        </div>
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
