import { NextResponse } from "next/server";
import { updateEvent, deleteEvent } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

type Params = Promise<{ id: string }>;

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const updated = updateEvent(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur PUT single event :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const deleted = deleteEvent(id);

    if (!deleted) {
      return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Événement supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE single event :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
