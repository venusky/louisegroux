import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Identifiant ou mot de passe manquant." }, { status: 400 });
    }

    const success = await loginAdmin(username, password);

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Connexion réussie",
        token: "jwt_louise_art_secret_session_token_2026", // Jeton de session simulé pour le client
      });
    } else {
      return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
    }
  } catch (error) {
    console.error("Erreur API Login :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
