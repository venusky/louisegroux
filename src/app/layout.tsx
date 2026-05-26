import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import "./globals.css";
import NewsletterModal from "@/hooks/newsLetteerModal";

export const metadata: Metadata = {
  title: "Louise Groux - Artiste Peintre - Art Animalier & Sacré",
  description: "Découvrez le portfolio officiel de Louise Groux. Œuvres uniques d'art animalier, d'art sacré et de trophées d'artisanat. Boutique officielle avec foulards et livres d'art.",
  keywords: "Louise Groux, artiste peintre, peinture animalière, art sacré contemporain, mouflons décorés, crânes peints, boutique foulard soie, book elionne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <NewsletterModal />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div style={{ flex: 1, paddingTop: "80px" }}>
              {children}
            </div>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
