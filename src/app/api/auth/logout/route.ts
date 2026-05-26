import { NextResponse } from "next/server";
import { logoutAdmin } from "@/lib/auth";

export async function POST() {
  try {
    await logoutAdmin();
    return NextResponse.json({ success: true, message: "Déconnexion réussie." });
  } catch (error) {
    console.error("Erreur API Logout :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
