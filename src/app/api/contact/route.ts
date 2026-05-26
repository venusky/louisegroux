import { NextResponse } from "next/server";
import { addMessage } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    const newMessage = addMessage({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Votre message a été envoyé avec succès !",
      data: newMessage,
    });
  } catch (error) {
    console.error("Erreur dans l'API de contact :", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}
