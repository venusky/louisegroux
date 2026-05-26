"use client";

import React, { useState } from "react";
import { X, Trash2, CreditCard, ShoppingBag, CheckCircle, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // Formulaire client
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Formulaire carte Stripe
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg("Veuillez remplir tous les champs de contact.");
      return;
    }

    if (!cardNumber || !cardExpiry || !cardCvc) {
      setErrorMsg("Veuillez remplir les informations de carte Stripe.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
          items: cart.map((i) => ({ id: i.id, quantity: i.quantity, title: i.title })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setOrderId(data.orderId);
        clearCart(); // Vider le panier après achat réussi
        
        // Reset form
        setName("");
        setEmail("");
        setPhone("");
        setCardNumber("");
        setCardExpiry("");
        setCardCvc("");
      } else {
        setErrorMsg(data.error || "Une erreur est survenue lors du paiement.");
      }
    } catch (error) {
      console.error("Erreur checkout client :", error);
      setErrorMsg("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop flouté de fermeture */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={closeCart}
      />

      {/* Conteneur principal du Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Votre Panier</h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Fermer le panier">
            <X size={20} />
          </button>
        </div>

        <div className={styles.content}>
          {success ? (
            // Fenêtre de succès Stripe
            <div className={styles.emptyState}>
              <CheckCircle size={64} className="gold-text" style={{ animation: "scaleUp 0.5s ease" }} />
              <h3 className="font-serif" style={{ fontSize: "1.5rem" }}>Paiement Réussi !</h3>
              <p>Merci pour votre confiance. Votre commande via **Stripe** a été validée avec succès.</p>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px dashed rgba(197, 168, 128, 0.3)",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  marginTop: "8px",
                }}
              >
                Référence : <span className="gold-text" style={{ fontFamily: "monospace" }}>{orderId}</span>
              </div>
              <button
                className="luxury-button luxury-button-gold"
                style={{ marginTop: "24px", width: "100%" }}
                onClick={() => {
                  setSuccess(false);
                  closeCart();
                }}
              >
                Continuer mes achats
              </button>
            </div>
          ) : cart.length === 0 ? (
            // Panier vide
            <div className={styles.emptyState}>
              <ShoppingBag size={48} style={{ opacity: 0.3 }} />
              <h3 className="font-serif">Votre panier est vide</h3>
              <p>Visitez "La boutique du kiff" pour y ajouter des foulards d'art ou des livres de collection.</p>
              <button
                className="luxury-button luxury-button-outline"
                style={{ marginTop: "16px" }}
                onClick={closeCart}
              >
                Découvrir la boutique
              </button>
            </div>
          ) : (
            // Liste des produits dans le panier
            <>
              <div className={styles.itemList}>
                {cart.map((item) => (
                  <div key={item.id} className={styles.itemCard}>
                    <img src={item.imageUrl} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <div>
                        <h4 className={styles.itemName}>{item.title}</h4>
                        <span className={styles.itemPrice}>{item.price.toFixed(2)} €</span>
                      </div>
                      <div className={styles.quantitySelector}>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className={styles.qtyVal}>{item.quantity}</span>
                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)} aria-label="Supprimer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Formulaire de paiement Stripe */}
              <form onSubmit={handleCheckout} className={styles.checkoutForm}>
                <h4 className={styles.checkoutFormTitle}>1. Coordonnées de Livraison</h4>
                
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="luxury-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                
                <input
                  type="email"
                  placeholder="Adresse e-mail"
                  className="luxury-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Numéro de téléphone"
                  className="luxury-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <h4 className={styles.checkoutFormTitle} style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  2. Paiement Sécurisé Stripe <ShieldCheck size={16} />
                </h4>

                <div
                  style={{
                    backgroundColor: "hsl(var(--bg-base))",
                    border: "1px solid hsl(var(--border-color))",
                    borderRadius: "6px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="Numéro de carte (ex: 4242 4242...)"
                      className="luxury-input"
                      style={{ paddingLeft: "42px", border: "none", background: "rgba(255,255,255,0.02)" }}
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                    <CreditCard size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", opacity: 0.5 }} />
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="luxury-input"
                      style={{ border: "none", background: "rgba(255,255,255,0.02)", textAlign: "center" }}
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      className="luxury-input"
                      style={{ border: "none", background: "rgba(255,255,255,0.02)", textAlign: "center" }}
                      maxLength={3}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {errorMsg && (
                  <span style={{ color: "#ff4a4a", fontSize: "0.8rem", marginTop: "4px" }}>
                    {errorMsg}
                  </span>
                )}
              </form>
            </>
          )}
        </div>

        {!success && cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Sous-total (Envoi inclus) :</span>
              <span className={styles.totalPrice}>{cartTotal.toFixed(2)} €</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="luxury-button luxury-button-gold"
              style={{ width: "100%", gap: "10px" }}
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
                  Validation Stripe...
                </>
              ) : (
                <>
                  <CreditCard size={18} />
                  Payer {cartTotal.toFixed(2)} € avec Stripe
                </>
              )}
            </button>

            <span
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "0.7rem",
                color: "hsl(var(--text-muted))",
                marginTop: "12px",
              }}
            >
              Paiements cryptés SSL 256-bits gérés par Stripe.
            </span>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
