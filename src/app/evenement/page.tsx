"use client";

import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  link: string;
}

export default function Evenement() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error("Erreur chargement événements :", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateStr).toLocaleDateString("fr-FR", options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ background: "hsl(var(--bg-base))", minHeight: "80vh", paddingBottom: "100px" }}>
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
            Agenda d'Exposition
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 200,
              marginTop: "12px",
            }}
          >
            Événements & Expositions
          </h1>
          <p style={{ marginTop: "12px", fontSize: "0.95rem", opacity: 0.8 }}>
            Retrouvez toutes les actualités, salons et expositions de Louise Groux. Rencontrons-nous autour de l'art.
          </p>
        </div>
      </section>

      {/* AGENDA CONTENT LIST */}
      <section className="main-container" style={{ maxWidth: "1000px" }}>
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
            <style jsx global>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : events.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "hsl(var(--text-secondary))" }}>
            <Calendar size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <h3 className="font-serif">Aucun événement à venir</h3>
            <p style={{ marginTop: "8px" }}>Revenez bientôt ou inscrivez-vous à la newsletter pour être informé des prochaines expositions.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {events.map((event) => (
              <div
                key={event.id}
                className="luxury-card glass-panel"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "30px",
                  padding: "24px",
                  alignItems: "center",
                }}
              >
                {/* Image Événement */}
                <div
                  style={{
                    width: "200px",
                    height: "180px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#060910",
                  }}
                >
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Infos Événement */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.85rem", color: "hsl(var(--accent-gold))" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Calendar size={14} /> {formatDate(event.date)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <MapPin size={14} /> {event.location}
                    </span>
                  </div>

                  <h3 className="font-serif" style={{ fontSize: "1.6rem" }}>
                    {event.title}
                  </h3>
                  
                  <p style={{ fontSize: "0.95rem", color: "hsl(var(--text-secondary))", lineHeight: 1.6 }}>
                    {event.description}
                  </p>

                  <div style={{ marginTop: "12px", display: "flex", gap: "16px" }}>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(`Demande d'information : Événement "${event.title}"`)}`}
                      className="luxury-button luxury-button-gold"
                      style={{ padding: "10px 20px", fontSize: "0.75rem", borderRadius: "4px", gap: "6px" }}
                    >
                      S'inscrire / Contacter
                    </Link>
                    {event.link && event.link !== "#" && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="luxury-button luxury-button-outline"
                        style={{ padding: "10px 20px", fontSize: "0.75rem", borderRadius: "4px", gap: "6px" }}
                      >
                        En savoir plus <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER CALL */}
      <section className="main-container" style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "60px" }}>
        <h2 className="font-serif" style={{ fontSize: "1.8rem", marginBottom: "16px" }}>Vous organisez un événement ?</h2>
        <p style={{ maxWidth: "600px", margin: "0 auto 24px", color: "hsl(var(--text-secondary))" }}>
          Louise Groux expose régulièrement dans des galeries d'art, des salons de chasse, des châteaux ou lors d'événements privés. Contactez-moi pour discuter de projets de collaboration.
        </p>
        <Link href="/contact" className="luxury-button luxury-button-outline" style={{ gap: "8px" }}>
          Proposer une Exposition <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
