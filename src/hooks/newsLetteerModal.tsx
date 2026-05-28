"use client";

import { useEffect, useState } from "react";

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
                            Inscrivez-vous à ma liste e-mail pour être directement
                            informé(e) de toute mon actualité, mes expositions et
                            mes aventures !
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
                                style={styles.checkbox}
                            />

                            <span style={styles.checkboxText}>
                                Je souhaite être informé(e) régulièrement des
                                prochaines actualités de Louise Groux par email
                            </span>
                        </label>

                        <label style={styles.checkboxRow}>
                            <input
                                type="checkbox"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                style={styles.checkbox}
                            />

                            <span style={styles.checkboxText}>
                                Je déclare consentir à la collecte et au{" "}
                                <span style={{ color: "#F5B027" }}>
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
        alignItems: "center",
        padding: "20px",
        zIndex: 9999,
        overflowY: "auto",
    },

    modal: {
        position: "relative",
        width: "100%",
        maxWidth: "950px",
        background: "#0b0f19",
        borderRadius: "12px",
        padding: "clamp(20px, 4vw, 45px)",
        boxSizing: "border-box",
    },

    closeBtn: {
        position: "absolute",
        top: "14px",
        right: "14px",
        border: "none",
        background: "transparent",
        fontSize: "20px",
        cursor: "pointer",
        color: "#ffffff",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(20px, 4vw, 50px)",
        alignItems: "center",
    },

    left: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
    },

    title: {
        fontSize: "clamp(24px, 4vw, 40px)",
        fontWeight: 600,
        color: "#fff",
        lineHeight: 1.2,
        margin: 0,
    },

    desc: {
        fontSize: "clamp(14px, 2vw, 16px)",
        color: "#f5f5f5",
        lineHeight: 1.8,
        margin: 0,
    },

    small: {
        fontSize: "clamp(13px, 2vw, 15px)",
        color: "#f5f5f5",
        margin: 0,
    },

    right: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        width: "100%",
    },

    input: {
        width: "100%",
        padding: "14px 16px",
        border: "1px solid #2d3445",
        borderRadius: "6px",
        fontSize: "15px",
        outline: "none",
        background: "#111827",
        color: "#fff",
        boxSizing: "border-box",
    },

    checkboxRow: {
        display: "flex",
        gap: "12px",
        fontSize: "13px",
        color: "#f5f5f5",
        alignItems: "flex-start",
        lineHeight: 1.6,
    },

    checkbox: {
        marginTop: "3px",
        flexShrink: 0,
    },

    checkboxText: {
        flex: 1,
    },

    btn: {
        marginTop: "8px",
        width: "100%",
        padding: "15px",
        background: "#F5B027",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: 600,
        fontSize: "14px",
        cursor: "pointer",
        transition: "0.3s",
    },
};