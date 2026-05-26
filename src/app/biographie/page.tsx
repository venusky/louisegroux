"use client";

import React from "react";
import Link from "next/link";
import { Award, Feather, Heart, Music, Sparkles } from "lucide-react";

export default function Biographie() {
  return (
    <div style={{ background: "hsl(var(--bg-base))", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* SECTION BANNER HERO */}
      <section
        style={{
          position: "relative",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, rgba(11, 15, 25, 0.5), rgba(11, 15, 25, 0.98)), url('/images/la_ligne_dhonneur.png') center/cover no-repeat",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ maxWidth: "800px", zIndex: 2 }}>
          <span
            style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: "hsl(var(--accent-gold))",
              fontWeight: 500,
            }}
          >
            L'Âme & Le Pinceau
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 200,
              marginTop: "16px",
            }}
          >
            Ma Démarche Artistique
          </h1>
        </div>
      </section>

      {/* CONTENU BIOGRAPHIQUE EDITORIAL */}
      <section className="main-container" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "60px" }}>
        {/* EDITORIAL COLUMNS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "50px",
            alignItems: "flex-start",
          }}
        >
          {/* COLONNE GAUCHE - TEXTE PRINCIPAL */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 className="font-serif" style={{ fontSize: "2rem", borderBottom: "1px solid rgba(197, 168, 128, 0.2)", paddingBottom: "12px" }}>
              Le Choc Esthétique
            </h2>
            <p>
              Ma démarche artistique est liée aux chocs esthétiques. Dès lors, j’explore toutes les techniques, car une œuvre peut apporter à elle seule une quantité de réponses. Le livre de Mark Rothko <em>"La réalité de l'artiste"</em> a levé le voile sur ma façon d'aborder la peinture, notamment le sujet ; j’ai changé radicalement ma façon de peindre à la suite de cette lecture. J’aime peindre le figuratif infiniment subjectif avec un tracé de pinceau pourtant brutal qui caresse l’abstraction...
            </p>
            <p>
              Au milieu des grands, dans un brouhaha de pas, mon regard d'enfant à la hauteur des coudes, surgit devant moi un camaïeu de bleu. La contre-plongée accentue cette vision divine. Extatique, je découvre fascinée et comprends peu à peu cette silhouette féminine à la peau de porcelaine, cerclée de cheveux ondulants qui semblent tenter de la couvrir. Elle surgit au creux d’un immense coquillage : <strong>la Vénus de Sandro Botticelli</strong>. Tout est là. J’ai su plus tard que je serai peintre mais j’ai su instantanément comprendre que mon âme était là.
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid hsl(var(--accent-gold))",
                paddingLeft: "20px",
                fontStyle: "italic",
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                color: "hsl(var(--text-primary))",
                margin: "12px 0",
              }}
            >
              "Je n’ai pas fait d’école, si ce n’est une prépa d’art où je m’ennuyais. C'est l'huile, aînée de mon atelier, qui ne finit pas de m'apprendre, de me surprendre et de m'apporter l'ineffable."
            </blockquote>
          </div>

          {/* COLONNE DROITE - SUPPORTS & MÉDIUMS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 className="font-serif" style={{ fontSize: "2rem", borderBottom: "1px solid rgba(197, 168, 128, 0.2)", paddingBottom: "12px" }}>
              Le Langage des Matières
            </h2>
            <p>
              Mon langage est difficile avec le pastel sec, j’utilise le pastel gras pour appuyer le croquis sur la toile. L’aquarelle quant à elle n’est pas assez forte, mais l’encre est un médium qui me paraît évident. Le fusain trace aussi vite que la parole et s’efface tout aussi rapidement, je l’utilise brièvement pour déposer l’idée, la moduler...
            </p>
            <p>
              L’acrylique est un outil pratique, promptement sec, cousin de l’huile, il me permet de réfléchir. Les feutres et autres crayons colorés esquissent le trait sur le papier mais sont trop petits pour la toile que je veux grande : qu'elle me dévore, qu'elle dévore celui qui la regarde.
            </p>
            <p>
              Je choisis les pinceaux plutôt que les couteaux ; j’y préfère la virtuosité du poignet et la dose de couleur appuyée. Je suis submergée d’émotion à la vue d’une touche de couleur posée au pinceau et d’en ressentir la volubilité, le dosage de tant de pigments purs qui se livrent sans fard, là devant soi.
            </p>
            <p>
              Les papiers en tous genres et les tissus s’harmonisent à mon sens aux aplats de couleurs. Ils assoient le tableau dans une autre dimension. La toile, le bois, le carton entoilé et le kraft sont des supports tour à tour choisis en fonction des humeurs et de leurs possibilités.
            </p>
          </div>
        </div>

        {/* PILLIERS D'INSPIRATION (ICÔNES ET TEXTES) */}
        <div style={{ marginTop: "40px" }}>
          <h2 className="font-serif" style={{ fontSize: "2.2rem", textAlign: "center", marginBottom: "50px" }}>
            Les Moteurs de l'Atelier
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "30px",
            }}
          >
            {/* Pilier 1 */}
            <div className="luxury-card" style={{ padding: "30px", textAlign: "center" }}>
              <Music size={32} className="gold-text" style={{ margin: "0 auto 16px" }} />
              <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "12px" }}>La Musique</h3>
              <p style={{ fontSize: "0.88rem" }}>
                Moteur essentiel de mon atelier où je me laisse porter par les textes. Les variations musicales appuient les humeurs, les instants et m'aident à faire éclore la toile.
              </p>
            </div>
            
            {/* Pilier 2 */}
            <div className="luxury-card" style={{ padding: "30px", textAlign: "center" }}>
              <Feather size={32} className="gold-text" style={{ margin: "0 auto 16px" }} />
              <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "12px" }}>Le 7ème Art</h3>
              <p style={{ fontSize: "0.88rem" }}>
                Le cinéma m'offre une approche visuelle différente des musées et galeries. Je me laisse guider par mes émotions, ma raison et enfin la recherche pure de l'esthétisme.
              </p>
            </div>

            {/* Pilier 3 */}
            <div className="luxury-card" style={{ padding: "30px", textAlign: "center" }}>
              <Sparkles size={32} className="gold-text" style={{ margin: "0 auto 16px" }} />
              <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "12px" }}>Mythes & Esprit</h3>
              <p style={{ fontSize: "0.88rem" }}>
                La spiritualité, très présente, se mélange aux mythes. Les personnalités historiques et légendaires se croisent pour m'offrir une infinie source d'inspiration.
              </p>
            </div>

            {/* Pilier 4 */}
            <div className="luxury-card" style={{ padding: "30px", textAlign: "center" }}>
              <Heart size={32} className="gold-text" style={{ margin: "0 auto 16px" }} />
              <h3 className="font-serif" style={{ fontSize: "1.25rem", marginBottom: "12px" }}>La Maïeutique</h3>
              <p style={{ fontSize: "0.88rem" }}>
                Je souhaite que mes toiles cessent d’être purement figuratives pour devenir l'incarnation d'une allégorie. Créer une illusion où je tends à nourrir le sentiment pur.
              </p>
            </div>
          </div>
        </div>

        {/* APPEL À L'ACTION */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "24px" }}>
            Découvrez la traduction visuelle de ma démarche au sein de ma galerie d'œuvres.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <Link href="/galerie" className="luxury-button luxury-button-gold">
              Visiter la Galerie
            </Link>
            <Link href="/contact" className="luxury-button luxury-button-outline">
              Écrire à l'Atelier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
