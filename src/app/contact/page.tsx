"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck } from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill le sujet si fourni dans les query params
  useEffect(() => {
    if (subjectParam) {
      setSubject(subjectParam);
    }
  }, [subjectParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setErrorMsg("Tous les champs sont obligatoires.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMsg(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (err) {
      console.error("Erreur envoi contact client :", err);
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "hsl(var(--bg-base))", minHeight: "85vh", paddingBottom: "100px" }}>
      {/* HEADER BANNER */}
      <section
        style={{
          padding: "60px 24px",
          background: "linear-gradient(to bottom, rgba(11, 15, 25, 0.6), rgba(11, 15, 25, 0.98))",
          textAlign: "center",
          borderBottom: "1px solid rgba(197, 168, 128, 0.1)",
          marginBottom: "60px",
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
            Écrire à l'Atelier
          </span>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 200,
              marginTop: "12px",
            }}
          >
            Contactez-moi
          </h1>
          <p style={{ marginTop: "12px", fontSize: "0.95rem", opacity: 0.8 }}>
            Pour une acquisition d'œuvre d'art, une commande spéciale ou une demande de vernissage.
          </p>
        </div>
      </section>

      {/* BLOCS CONTACTS & FORMULAIRE */}
      <section className="main-container" style={{ paddingTop: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px",
            alignItems: "flex-start",
          }}
        >
          {/* COLONNE INFOS CONTACT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div>
              <h2 className="font-serif" style={{ fontSize: "1.8rem", marginBottom: "16px" }}>
                Louise Groux Atelier
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                N'hésitez pas à m'envoyer un message pour toute demande d'information concernant mes toiles acryliques, mes trophées d'artisanat ou mes créations en soie. Je vous répondrai personnellement sous 24 à 48 heures.
              </p>
            </div>

            {/* List Icons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  background: "hsl(var(--bg-surface))",
                  border: "1px solid hsl(var(--border-color))",
                  padding: "16px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    background: "rgba(197, 168, 128, 0.1)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "hsl(var(--accent-gold))",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "block" }}>
                    E-mail direct
                  </span>
                  <a href="mailto:bonjour@louisegroux.com" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                    bonjour@louisegroux.com
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  background: "hsl(var(--bg-surface))",
                  border: "1px solid hsl(var(--border-color))",
                  padding: "16px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    background: "rgba(197, 168, 128, 0.1)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "hsl(var(--accent-gold))",
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "block" }}>
                    Téléphone Atelier
                  </span>
                  <a href="tel:0699015166" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                    06 99 01 51 66
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  background: "hsl(var(--bg-surface))",
                  border: "1px solid hsl(var(--border-color))",
                  padding: "16px",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    background: "rgba(197, 168, 128, 0.1)",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "hsl(var(--accent-gold))",
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "hsl(var(--text-muted))", display: "block" }}>
                    Lieu d'exposition principal
                  </span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                    Château de la Thibaudière, France
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FORMULAIRE DE CONTACT */}
          <div className="glass-panel" style={{ padding: "40px", borderRadius: "8px" }}>
            {success ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <CheckCircle size={56} className="gold-text" />
                <h3 className="font-serif" style={{ fontSize: "1.5rem" }}>Message Envoyé !</h3>
                <p style={{ color: "hsl(var(--text-secondary))" }}>
                  Votre message a bien été transmis à l'atelier de Louise Groux. Vous recevrez une réponse rapidement.
                </p>
                <button
                  className="luxury-button luxury-button-gold"
                  style={{ marginTop: "16px", width: "100%" }}
                  onClick={() => setSuccess(false)}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <h3 className="font-serif" style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                  Formulaire d'Enquête
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "hsl(var(--text-secondary))" }}>
                    Votre Nom Complet
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Jean Dupont"
                    className="luxury-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "hsl(var(--text-secondary))" }}>
                    Adresse E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="ex: jean.dupont@gmail.com"
                    className="luxury-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "hsl(var(--text-secondary))" }}>
                    Sujet de Demande
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Acquisition de tableau / Projet d'exposition..."
                    className="luxury-input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "hsl(var(--text-secondary))" }}>
                    Votre Message
                  </label>
                  <textarea
                    placeholder="Détaillez votre demande ici..."
                    className="luxury-input"
                    rows={6}
                    style={{ resize: "vertical" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                {errorMsg && (
                  <span style={{ color: "#ff4a4a", fontSize: "0.85rem" }}>
                    {errorMsg}
                  </span>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="luxury-button luxury-button-gold"
                  style={{ width: "100%", gap: "10px", marginTop: "10px" }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #0b0f19",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Envoyer le Message
                    </>
                  )}
                </button>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.75rem",
                    color: "hsl(var(--text-muted))",
                    justifyContent: "center",
                    marginTop: "8px",
                  }}
                >
                  <ShieldCheck size={14} className="gold-text" /> Vos données restent strictement confidentielles.
                </span>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Chargement du formulaire...</div>}>
      <ContactForm />
    </Suspense>
  );
}
