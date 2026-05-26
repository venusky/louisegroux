"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Eye, Filter } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

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
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

    const { scrollY } = useScroll();
    const parallaxY = useTransform(scrollY, [0, 500], [0, 80]);

    const categories = [
        "Toutes",
        "La Ligne d'Honneur",
        "Le jardin d'Elionne",
        "La Passion du Sentiment",
        "Le Seigneur est avec Vous",
        "Trophée",
    ];

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

    useEffect(() => {
        setActiveCategory(catParam || "Toutes");
    }, [catParam]);

    const filteredPaintings = paintings.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
            (activeCategory === "Toutes" || p.category === activeCategory) &&
            (p.title.toLowerCase().includes(q) ||
                p.technique.toLowerCase().includes(q))
        );
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
                background: "hsl(var(--bg-base))",
                minHeight: "80vh",
                paddingBottom: "80px",
            }}
        >
            {/* HEADER PARALLAX */}
            <motion.section
                style={{
                    padding: "60px 24px",
                    textAlign: "center",
                    background:
                        "linear-gradient(to bottom, rgba(11, 15, 25, 0.6), rgba(11, 15, 25, 0.98))",
                    borderBottom: "1px solid rgba(197, 168, 128, 0.1)",
                    y: parallaxY,
                }}
            >
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{
              fontSize: "0.8rem",
              letterSpacing: "0.3em",
              color: "hsl(var(--accent-gold))",
          }}>
            Le Cabinet des Toiles
          </span>

                    <h1 className="font-serif" style={{ fontSize: "2.5rem", fontWeight: 200 }}>
                        Galerie d'Œuvres d'Art
                    </h1>

                    <p style={{ opacity: 0.8 }}>
                        Découvrez les œuvres de Louise Groux
                    </p>
                </div>
            </motion.section>

            {/* FILTERS */}
            <section className="main-container">
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: "10px 16px",
                                    borderRadius: 6,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: activeCategory === cat ? "hsl(var(--accent-gold))" : "transparent",
                                    color: activeCategory === cat ? "#000" : "#aaa",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={{ position: "relative", width: 280 }}>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher..."
                            className="luxury-input"
                            style={{ paddingLeft: 40 }}
                        />
                        <Search size={18} style={{
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            opacity: 0.5,
                        }} />
                    </div>

                </div>
            </section>

            {/* GRID */}
            <section className="main-container">
                {loading ? (
                    <div style={{ textAlign: "center", padding: 60 }}>
                        <div className="shimmer" />
                        <p>Chargement...</p>
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.08 } },
                        }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                            gap: 40,
                        }}
                    >
                        {filteredPaintings.map((painting) => (
                            <motion.div
                                key={painting.id}
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link href={`/galerie/${painting.id}`} className="luxury-card">

                                    {/* IMAGE BLOCK */}
                                    <div
                                        onMouseEnter={() => setHoveredId(painting.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                        style={{
                                            position: "relative",
                                            height: 320,
                                            overflow: "hidden",
                                            background: "#060910",
                                        }}
                                    >
                                        {/* SKELETON */}
                                        {!imageLoaded[painting.id] && (
                                            <div className="shimmer-overlay" />
                                        )}

                                        <Image
                                            src={painting.imageUrl}
                                            alt={painting.title}
                                            fill
                                            onLoadingComplete={() =>
                                                setImageLoaded((prev) => ({
                                                    ...prev,
                                                    [painting.id]: true,
                                                }))
                                            }
                                            style={{
                                                objectFit: "cover",
                                                opacity: imageLoaded[painting.id] ? 1 : 0,
                                                transform:
                                                    hoveredId === painting.id
                                                        ? "scale(1.06)"
                                                        : "scale(1)",
                                                transition: "opacity 0.5s ease, transform 0.6s ease",
                                            }}
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            style={{
                                                position: "absolute",
                                                inset: 0,
                                                background: "rgba(11, 15, 25, 0.4)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: hoveredId === painting.id ? 1 : 0,
                                                transition: "opacity 0.3s ease",
                                                pointerEvents: "none",
                                            }}
                                        >
                                            <div style={{
                                                background: "rgba(19,24,36,0.9)",
                                                padding: "10px 18px",
                                                borderRadius: 6,
                                                display: "flex",
                                                gap: 8,
                                                alignItems: "center",
                                            }}>
                                                <Eye size={16} /> Voir l'œuvre
                                            </div>
                                        </div>

                                        {/* BADGE */}
                                        <div style={{
                                            position: "absolute",
                                            top: 16,
                                            right: 16,
                                            background: painting.sold
                                                ? "rgba(220,53,69,0.9)"
                                                : "rgba(40,167,69,0.9)",
                                            padding: "4px 10px",
                                            fontSize: 12,
                                            borderRadius: 4,
                                        }}>
                                            {painting.sold ? "Vendue" : "Disponible"}
                                        </div>
                                    </div>

                                    {/* INFO */}
                                    <div style={{ padding: 20 }}>
                                        <h3 className="font-serif">{painting.title}</h3>
                                        <p style={{ opacity: 0.7 }}>{painting.technique}</p>
                                        <p>{painting.year}</p>

                                        <div style={{
                                            marginTop: 10,
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}>
                                            <span>Valeur</span>
                                            <strong>{painting.price.toLocaleString("fr-FR")} €</strong>
                                        </div>
                                    </div>

                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </section>

            {/* GLOBAL STYLES */}
            <style jsx global>{`
        .shimmer {
          width: 100%;
          height: 200px;
          background: linear-gradient(90deg,#0b0f19,#141a2a,#0b0f19);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,#0b0f19,#141a2a,#0b0f19);
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
        </motion.div>
    );
}

export default function Galerie() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <GalleryContent />
        </Suspense>
    );
}