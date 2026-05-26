"use client";

import {useEffect, useState} from "react";

export default function NewsletterModal() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [news, setNews] = useState(false);
    const [consent, setConsent] = useState(false);

    useEffect(() => {
        const alreadySeen = localStorage.getItem("newsletter_seen");

        if (!alreadySeen) {
            const timer = setTimeout(() => setOpen(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const closeModal = () => {
        localStorage.setItem("newsletter_seen", "true");
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!email || !consent) return;

        console.log({
            email,
            news,
            consent,
        });

        closeModal();
    };

    if (!open) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>

                {/* CLOSE */}
                <button onClick={closeModal} style={styles.closeBtn}>
                    ✕
                </button>

                <div style={styles.grid}>

                    {/* LEFT SIDE */}
                    <div style={styles.left}>
                        <h2 style={styles.title}>
                            Inscrivez-vous à ma newsletter
                        </h2>

                        <p style={styles.desc}>
                            Inscrivez-vous à ma liste e-mail pour être directement informé(e)
                            de toute mon actualité, mes expositions et mes aventures !
                        </p>

                        <p style={styles.small}>À très vite</p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div style={styles.right}>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />

                        <label style={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={news}
                                onChange={(e) => setNews(e.target.checked)}
                            />
                            <span>
                Je souhaite être informé(e) régulièrement des prochaines
                actualités de Louise Groux par email
              </span>
                        </label>

                        <label style={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                            />
                            <span>
                    Je déclare consentir à la collecte et au{" "}
                                <span style={{color: "#F5B027"}}>
                  traitement de mes données personnelles
                </span>{" "}
                                dans le cadre des conditions du site.
              </span>
                        </label>

                        <button onClick={handleSubmit} style={styles.btn}>
                            S’INSCRIRE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: any = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "8vh",
        zIndex: 9999,
        transform: "translateY(-10px)",
        opacity: 0.98
    },

    modal: {
        position: "relative",
        width: "92%",
        maxWidth: 900,
        background: "#0b0f19",
        borderRadius: 8,
        padding: 40,
    },

    closeBtn: {
        position: "absolute",
        top: 15,
        right: 15,
        border: "none",
        background: "transparent",
        fontSize: 18,
        cursor: "pointer",
        color: "#ffffff",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
    },

    left: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
    },

    title: {
        fontSize: 26,
        fontWeight: 600,
        color: "#fff",
    },

    desc: {
        fontSize: 14,
        color: "#f5f5f5",
        lineHeight: 1.6,
    },

    small: {
        fontSize: 13,
        color: "#f5f5f5",
    },

    right: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
    },

    input: {
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 4,
        fontSize: 14,
        outline: "none",
    },

    checkboxRow: {
        display: "flex",
        gap: 10,
        fontSize: 12,
        color: "#f5f5f5",
        alignItems: "flex-start",
    },

    btn: {
        marginTop: 10,
        padding: 14,
        background: "#F5B027",
        color: "white",
        border: "none",
        borderRadius: 4,
        fontWeight: 600,
        cursor: "pointer",
    },
};