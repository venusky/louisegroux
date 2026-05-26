import { NextResponse } from "next/server";
import { getEvents, addEvent } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    const events = getEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("Erreur GET events :", error);
    return NextResponse.json({ error: "Impossible de récupérer les événements" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, date, location, imageUrl, link } = body;

    if (!title || !description || !date || !location || !imageUrl) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    const newEvent = addEvent({
      title,
      description,
      date,
      location,
      imageUrl,
      link: link || "#",
    });

    return NextResponse.json(newEvent);
  } catch (error) {
    console.error("Erreur POST event :", error);
    return NextResponse.json({ error: "Impossible de créer l'événement" }, { status: 500 });
  }
}
