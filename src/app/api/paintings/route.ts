import { NextResponse } from "next/server";
import { getPaintings, addPainting } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    const paintings = getPaintings();
    return NextResponse.json(paintings);
  } catch (error) {
    console.error("Erreur GET paintings :", error);
    return NextResponse.json({ error: "Impossible de récupérer les œuvres" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, technique, dimensions, price, year, imageUrl, sold, featured } = body;

    if (!title || !category || !technique || !dimensions || typeof price !== "number" || !imageUrl) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    const newPainting = addPainting({
      title,
      category,
      description: description || "",
      technique,
      dimensions,
      price,
      year: year || new Date().getFullYear(),
      imageUrl,
      sold: sold || false,
      featured: featured || false,
    });

    return NextResponse.json(newPainting);
  } catch (error) {
    console.error("Erreur POST painting :", error);
    return NextResponse.json({ error: "Impossible de créer l'œuvre" }, { status: 500 });
  }
}
