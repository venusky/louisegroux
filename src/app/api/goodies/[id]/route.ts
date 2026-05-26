import { NextResponse } from "next/server";
import { getGoodyById, updateGoody, deleteGoody } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const goody = getGoodyById(id);
    if (!goody) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }
    return NextResponse.json(goody);
  } catch (error) {
    console.error("Erreur GET single goody :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const updated = updateGoody(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur PUT single goody :", error);
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
    const deleted = deleteGoody(id);

    if (!deleted) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Erreur DELETE single goody :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
