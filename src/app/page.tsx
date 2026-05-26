"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Quote, Shield } from "lucide-react";

export default function Home() {
  const themes = [
    {
      title: "Art Animalier",
      subtitle: "Le jardin d'Elionne",
      desc: "L'animal suggère tour à tour la vigilance et la liberté, la puissance des possibles est inimaginable. Tout animal, quel qu'il soit, demeure une énigme...",
      image: "/images/le_jardin_delionne.png",
      cat: "Le jardin d'Elionne",
    },
    {
      title: "Art Contemporain",
      subtitle: "La Passion du Sentiment",
      desc: "Pousser par une soif d'absolu, de totalité analogique, les figures féminines deviennent souveraines pour tendre vers une pureté esthétique et allégorique.",
      image: "/images/la_passion_du_sentiment.png",
      cat: "La Passion du Sentiment",
    },
    {
      title: "Art Sacré",
      subtitle: "Le Seigneur est avec Vous",
      desc: "L'art est en premier lieu une volonté de l'homme à sublimer l'âme. Se remettre dans cette tradition d'art sacré pour peindre ce en quoi je crois.",
      image: "/images/le_seigneur_est_avec_vous.png",
      cat: "Le Seigneur est avec Vous",
    },
    {
      title: "Artisanat d'Art",
      subtitle: "Trophées Unique",
      desc: "Peindre sur des crânes de Mouflons, de Daims et de Cerfs d'Europe. Suggérer une différente possibilité visuelle et spirituelle à des trophées majestueux.",
      image: "/images/trophee_mouflon.png",
      cat: "Trophée",
    },
  ];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* SECTION HERO VITRINE */}
      <section
        style={{
          position: "relative",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, rgba(11, 15, 25, 0.4), rgba(11, 15, 25, 0.95)), url('/images/la_passion_du_sentiment.png') center/cover no-repeatFixed",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: "800px", zIndex: 2, animation: "fadeInUp 1.2s ease" }}>
          <span
            style={{
              fontSize: "0.85rem",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              color: "hsl(var(--accent-gold))",
              fontWeight: 500,
            }}
          >
            Exposition Virtuelle & Boutique
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 200,
              marginTop: "20px",
              marginBottom: "30px",
              lineHeight: 1.1,
            }}
          >
            Sublimer le Mystère de la Peinture
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              margin: "30px 0",
              color: "hsl(var(--text-secondary))",
            }}
          >
            <Quote size={24} className="gold-text" style={{ opacity: 0.6 }} />
          </div>
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "hsl(var(--text-primary))",
              maxWidth: "650px",
              margin: "0 auto 40px",
              lineHeight: 1.5,
            }}
          >
            "Je veille à ne faire que des peintures qui suscitent le mystère avec la précision et l'enchantement nécessaire à la vie des idées."
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            <Link href="/galerie" className="luxury-button luxury-button-gold">
              Découvrir la Galerie
            </Link>
            <Link href="/biographie" className="luxury-button luxury-button-outline">
              Démarche Artistique
            </Link>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            opacity: 0.5,
          }}
        >
          Faire Défiler
        </div>
      </section>

      {/* SECTION CITATION & INTRODUCTION RESUME */}
      <section
        style={{
          padding: "100px 24px",
          background: "hsl(var(--bg-base))",
          borderTop: "1px solid rgba(197, 168, 128, 0.08)",
        }}
      >
        <div
          className="main-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              className="font-serif animate-fade-in"
              style={{ fontSize: "2.4rem", marginBottom: "24px" }}
            >
              L'Art de <span className="gold-text">Louise Groux</span>
            </h2>
            <p style={{ marginBottom: "20px" }}>
              Le fusain trace aussi vite que la parole et s’efface de même aussi rapidement, je l’utilise brièvement pour déposer l’idée, la moduler... L’acrylique est un outil pratique, promptement sec, cousin de l’huile, il me permet de réfléchir.
            </p>
            <p style={{ marginBottom: "30px" }}>
              Je veux la toile grande, qu’elle me dévore, qu’elle dévore celui qui la regarde. Je préfère la virtuosité du poignet, la dose de couleur appuyée et la volubilité des pigments.
            </p>
            <Link
              href="/biographie"
              className="gold-text"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 500 }}
            >
              Lire ma démarche artistique complète <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                width: "100%",
                height: "100%",
                border: "1px solid rgba(197, 168, 128, 0.2)",
                borderRadius: "8px",
                zIndex: 1,
              }}
            />
            <img
              src="/images/la_ligne_dhonneur.png"
              alt="Louise Groux - L'Ordre Harmonieux"
              style={{
                width: "100%",
                height: "450px",
                objectFit: "cover",
                borderRadius: "8px",
                position: "relative",
                zIndex: 2,
                boxShadow: "0 20px 45px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION THÉMATIQUES INTERACTIVES */}
      <section
        style={{
          padding: "100px 24px",
          background: "hsl(var(--bg-surface))",
          borderTop: "1px solid rgba(255, 255, 255, 0.02)",
        }}
      >
        <div className="main-container" style={{ padding: 0 }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <span
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "hsl(var(--accent-gold))",
              }}
            >
              Univers Picturaux
            </span>
            <h2 className="font-serif" style={{ fontSize: "2.5rem", marginTop: "10px" }}>
              Explorez mes Différents Thèmes
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {themes.map((theme, i) => (
              <div key={i} className="luxury-card" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ position: "relative", overflow: "hidden", height: "260px" }}>
                  <img
                    src={theme.image}
                    alt={theme.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.8s ease",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      background: "rgba(11, 15, 25, 0.8)",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      border: "1px solid rgba(197, 168, 128, 0.2)",
                    }}
                  >
                    {theme.subtitle}
                  </div>
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 className="font-serif" style={{ fontSize: "1.4rem", marginBottom: "12px" }}>
                    {theme.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", marginBottom: "20px", flex: 1 }}>
                    {theme.desc}
                  </p>
                  <Link
                    href={`/galerie?cat=${encodeURIComponent(theme.cat)}`}
                    className="luxury-button luxury-button-outline"
                    style={{ width: "100%", fontSize: "0.75rem", padding: "10px" }}
                  >
                    Voir la Galerie
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNIÈRE BOUTIQUE DU KIFF */}
      <section
        style={{
          position: "relative",
          padding: "120px 24px",
          background: "linear-gradient(to right, rgba(11, 15, 25, 0.95), rgba(19, 24, 36, 0.7)), url('/images/trophee_mouflon.png') center/cover no-repeat",
          borderTop: "1px solid rgba(197, 168, 128, 0.1)",
        }}
      >
        <div
          className="main-container"
          style={{
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "700px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "hsl(var(--accent-gold))",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <Sparkles size={16} /> Éditions & Goodies Limités
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "20px", fontWeight: 350 }}
          >
            La Boutique du Kiff
          </h2>
          <p style={{ fontSize: "1.05rem", marginBottom: "30px", maxWidth: "600px" }}>
            Découvrez une collection d'art à emporter : twillys en soie pure, pochettes de costumes raffinées réalisées en collaboration avec Alexandre Mareuil, ou livres d'art reliés immortalisant mes œuvres sur papier haut de gamme.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/goodies" className="luxury-button luxury-button-gold">
              Visiter la Boutique
            </Link>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.85rem",
                color: "hsl(var(--text-muted))",
              }}
            >
              <Shield size={16} className="gold-text" /> Paiements Stripe sécurisés
            </span>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
