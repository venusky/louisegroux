import { NextResponse } from "next/server";
import { getPaintingById, updatePainting, deletePainting } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const { id } = await params;
    const painting = getPaintingById(id);
    if (!painting) {
      return NextResponse.json({ error: "Œuvre introuvable" }, { status: 404 });
    }
    return NextResponse.json(painting);
  } catch (error) {
    console.error("Erreur GET single painting :", error);
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
    const updated = updatePainting(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Œuvre introuvable" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur PUT single painting :", error);
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
    const deleted = deletePainting(id);

    if (!deleted) {
      return NextResponse.json({ error: "Œuvre introuvable" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Œuvre supprimée avec succès" });
  } catch (error) {
    console.error("Erreur DELETE single painting :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
