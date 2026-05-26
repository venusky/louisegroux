import { NextResponse } from "next/server";
import { getGoodies, addGoody } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    const goodies = getGoodies();
    return NextResponse.json(goodies);
  } catch (error) {
    console.error("Erreur GET goodies :", error);
    return NextResponse.json({ error: "Impossible de récupérer les articles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, price, stock, imageUrl, category } = body;

    if (!title || !description || typeof price !== "number" || typeof stock !== "number" || !imageUrl || !category) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    const newGoody = addGoody({
      title,
      description,
      price,
      stock,
      imageUrl,
      category,
    });

    return NextResponse.json(newGoody);
  } catch (error) {
    console.error("Erreur POST goody :", error);
    return NextResponse.json({ error: "Impossible de créer l'article" }, { status: 500 });
  }
}
