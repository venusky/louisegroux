"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, ShieldCheck, Paintbrush, Ruler, Calendar, Coins } from "lucide-react";

interface Painting {
  id: string;
  title: string;
  category: string;
  description: string;
  technique: string;
  dimensions: string;
  price: number;
  year: number;
  imageUrl: string;
  sold: boolean;
}

type Params = Promise<{ id: string }>;

export default function PaintingDetail({ params }: { params: Params }) {
  const router = useRouter();
  const { id } = use(params);

  const [painting, setPainting] = useState<Painting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPainting() {
      try {
        const res = await fetch(`/api/paintings/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPainting(data);
        } else {
          // Si introuvable, redirige vers la galerie
          router.push("/galerie");
        }
      } catch (err) {
        console.error("Erreur chargement détail œuvre :", err);
        router.push("/galerie");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPainting();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div style={{ background: "hsl(var(--bg-base))", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!painting) return null;

  return (
    <div style={{ background: "hsl(var(--bg-base))", minHeight: "90vh", paddingBottom: "100px" }}>
      <div className="main-container" style={{ paddingBottom: 0 }}>
        {/* BOUTON RETOUR */}
        <Link
          href="/galerie"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "hsl(var(--text-secondary))",
            marginBottom: "40px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "white")}
          onMouseOut={(e) => (e.currentTarget.style.color = "hsl(var(--text-secondary))")}
        >
          <ArrowLeft size={16} /> Retour à la galerie
        </Link>

        {/* CONTENU FICHE PRÉSENTATION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "60px",
            alignItems: "flex-start",
          }}
        >
          {/* GRANDE IMAGE DÉTAILLÉE */}
          <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
            <img
              src={painting.imageUrl}
              alt={painting.title}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "75vh",
                objectFit: "contain",
                backgroundColor: "#060910",
                display: "block",
              }}
            />
            {/* Badge Sold */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: painting.sold ? "rgba(220, 53, 69, 0.9)" : "rgba(40, 167, 69, 0.9)",
                padding: "6px 14px",
                borderRadius: "4px",
                fontSize: "0.8rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {painting.sold ? "Œuvre Vendue" : "Œuvre Disponible"}
            </div>
          </div>

          {/* SPÉCIFICATIONS & MÉDATADONNÉES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div>
              <span
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "hsl(var(--accent-gold))",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {painting.category}
              </span>
              <h1 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                {painting.title}
              </h1>
            </div>

            <p style={{ fontSize: "1.05rem", color: "hsl(var(--text-secondary))", borderLeft: "2px solid rgba(197, 168, 128, 0.2)", paddingLeft: "16px" }}>
              {painting.description || "Aucune description disponible pour cette toile d'exception."}
            </p>

            {/* Fiche technique */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                background: "hsl(var(--bg-surface))",
                padding: "24px",
                borderRadius: "6px",
                border: "1px solid hsl(var(--border-color))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Paintbrush size={20} className="gold-text" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Technique</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{painting.technique}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Ruler size={20} className="gold-text" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Dimensions</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{painting.dimensions}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Calendar size={20} className="gold-text" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Année</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{painting.year}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Coins size={20} className="gold-text" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))" }}>Valeur d'acquisition</span>
                  <span style={{ fontSize: "1.1rem", fontWeight: 600, color: "hsl(var(--accent-gold))" }}>
                    {painting.price.toLocaleString("fr-FR")} €
                  </span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "12px" }}>
              {painting.sold ? (
                <div
                  style={{
                    background: "rgba(220, 53, 69, 0.05)",
                    border: "1px solid rgba(220, 53, 69, 0.2)",
                    padding: "16px",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                    color: "#ff4a4a",
                    textAlign: "center",
                  }}
                >
                  Cette œuvre fait désormais partie d'une collection privée.
                </div>
              ) : (
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Demande d'acquisition : "${painting.title}"`)}`}
                  className="luxury-button luxury-button-gold"
                  style={{ gap: "10px" }}
                >
                  <MessageSquare size={18} />
                  Faire une demande d'acquisition
                </Link>
              )}

              <Link
                href="/contact"
                className="luxury-button luxury-button-outline"
                style={{ gap: "10px" }}
              >
                Poser une question à l'atelier
              </Link>
            </div>

            {/* Garanties */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "0.8rem",
                color: "hsl(var(--text-muted))",
                justifyContent: "center",
                marginTop: "16px",
              }}
            >
              <ShieldCheck size={16} className="gold-text" /> Certificat d'authenticité signé fourni à l'expédition.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
