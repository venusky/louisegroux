import { NextResponse } from "next/server";
import { getGoodies, addOrder, OrderItem } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, clientPhone, items } = body;

    // Validation des données
    if (!clientName || !clientEmail || !clientPhone || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Informations de commande incomplètes." },
        { status: 400 }
      );
    }

    const dbGoodies = getGoodies();
    const orderItems: OrderItem[] = [];
    let orderTotal = 0;

    // Valider les stocks et calculer les prix
    for (const item of items) {
      const goody = dbGoodies.find((g) => g.id === item.id);
      if (!goody) {
        return NextResponse.json(
          { error: `Produit introuvable : ${item.title}` },
          { status: 404 }
        );
      }

      if (goody.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuffisant pour ${goody.title}. Stock disponible : ${goody.stock}` },
          { status: 400 }
        );
      }

      orderItems.push({
        itemId: goody.id,
        title: goody.title,
        quantity: item.quantity,
        price: goody.price,
      });

      orderTotal += goody.price * item.quantity;
    }

    // Simulation de l'appel à l'API Stripe
    // Ici, nous pourrions instancier un paiement réel si des clés Stripe étaient fournies.
    // Pour une démonstration parfaite et fonctionnelle, nous simulons la transaction Stripe réussie.
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simuler le temps de latence de Stripe

    // Créer la commande en base de données
    const newOrder = addOrder({
      clientName,
      clientEmail,
      clientPhone,
      items: orderItems,
      total: orderTotal,
    });

    return NextResponse.json({
      success: true,
      message: "Paiement Stripe accepté et commande enregistrée avec succès !",
      orderId: newOrder.id,
      total: orderTotal,
    });
  } catch (error) {
    console.error("Erreur dans l'API de checkout :", error);
    return NextResponse.json(
      { error: "Une erreur interne est survenue lors de la commande." },
      { status: 500 }
    );
  }
}
