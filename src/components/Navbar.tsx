"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();
    const { toggleCart, cartCount } = useCart();

    // scroll behavior amélioré
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;

            setScrolled(currentY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const categories = [
        { name: "Vue d'ensemble", path: "/galerie" },
        { name: "La Ligne d'Honneur", path: "/galerie?cat=La Ligne d'Honneur" },
        { name: "Le jardin d'Elionne", path: "/galerie?cat=Le jardin d'Elionne" },
        { name: "La Passion du Sentiment", path: "/galerie?cat=La Passion du Sentiment" },
        { name: "Le Seigneur est avec Vous", path: "/galerie?cat=Le Seigneur est avec Vous" },
        { name: "Trophées", path: "/galerie?cat=Trophée" },
    ];

    const isAdminRoute = pathname.startsWith("/admin");
    if (isAdminRoute) return null;

    return (
        <>
            <header
                className={`${styles.header} ${
                    scrolled ? styles.scrolled : ""
                }`}
            >
                {/* LOGO */}
                <Link href="/" className={styles.logo}>
                    <span>LOUISE GROUX</span>
                    <span className={styles.logoSub}>Artiste Peintre</span>
                </Link>

                {/* NAV DESKTOP */}
                <nav className={styles.nav}>
                    <div className={styles.dropdownContainer}>
                        <Link
                            href="/galerie"
                            className={styles.navLink}
                            style={{ display: "flex", alignItems: "center", gap: "4px" }}
                        >
                            Galerie <ChevronDown size={14} />
                        </Link>

                        <div className={styles.dropdown}>
                            {categories.map((cat, i) => (
                                <Link key={i} href={cat.path} className={styles.dropdownItem}>
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/biographie" className={styles.navLink}>
                        Biographie
                    </Link>

                    <Link href="/goodies" className={styles.navLink}>
                        Boutique du kiff
                    </Link>

                    <Link href="/evenement" className={styles.navLink}>
                        Événements
                    </Link>

                    <Link href="/contact" className={styles.navLink}>
                        Contact
                    </Link>
                </nav>

                {/* ACTIONS */}
                <div className={styles.actions}>
                    <Link href="/login" className={styles.iconBtn}>
                        <User size={20} />
                    </Link>

                    <button className={styles.iconBtn} onClick={toggleCart}>
                        <ShoppingCart size={20} />
                        {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                    </button>

                    <button
                        className={styles.burger}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={22} color={'white'} /> : <Menu size={22} color={'white'} />}
                    </button>
                </div>
            </header>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileSection}>
                        <span className={styles.mobileTitle}>Galerie</span>

                        <div className={styles.mobileList}>
                            {categories.map((cat, i) => (
                                <Link key={i} href={cat.path} className={styles.mobileLink}>
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/biographie" className={styles.mobileMain}>
                        Biographie
                    </Link>

                    <Link href="/goodies" className={styles.mobileMain}>
                        Boutique
                    </Link>

                    <Link href="/evenement" className={styles.mobileMain}>
                        Événements
                    </Link>

                    <Link href="/contact" className={styles.mobileMain}>
                        Contact
                    </Link>
                </div>
            )}
        </>
    );
}