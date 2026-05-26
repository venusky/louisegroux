import fs from "fs";
import path from "path";

// Définition des chemins de fichiers
const DATA_FILE_PATH = path.join(process.cwd(), "src", "lib", "data.json");

// Interfaces pour le typage TypeScript
export interface Painting {
  id: string;
  title: string;
  category: string;
  description: string;
  technique: string;
  dimensions: string;
  price: number;
  year: number;
  imageUrl: string;
  sold: boolean;
  featured: boolean;
}

export interface Goody {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  link: string;
}

export interface OrderItem {
  itemId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: "En attente" | "Confirmée" | "Expédiée" | "Annulée";
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface DBStructure {
  oeuvres: Painting[];
  goodies: Goody[];
  evenements: Event[];
  commandes: Order[];
  messages: Inquiry[];
}

// Fonction utilitaire pour lire les données
export function getDbData(): DBStructure {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Si le fichier n'existe pas, retourne une structure vide
      return { oeuvres: [], goodies: [], evenements: [], commandes: [], messages: [] };
    }
    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Erreur lors de la lecture de la base de données :", error);
    return { oeuvres: [], goodies: [], evenements: [], commandes: [], messages: [] };
  }
}

// Fonction utilitaire pour écrire les données
export function saveDbData(data: DBStructure): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Erreur lors de l'écriture dans la base de données :", error);
  }
}

// ================= CRUD ŒUVRES =================
export function getPaintings(): Painting[] {
  return getDbData().oeuvres;
}

export function getPaintingById(id: string): Painting | undefined {
  return getPaintings().find((p) => p.id === id);
}

export function addPainting(painting: Omit<Painting, "id">): Painting {
  const data = getDbData();
  const newPainting: Painting = {
    ...painting,
    id: `painting-${Date.now()}`,
  };
  data.oeuvres.push(newPainting);
  saveDbData(data);
  return newPainting;
}

export function updatePainting(id: string, updatedFields: Partial<Painting>): Painting | null {
  const data = getDbData();
  const index = data.oeuvres.findIndex((p) => p.id === id);
  if (index === -1) return null;

  data.oeuvres[index] = { ...data.oeuvres[index], ...updatedFields };
  saveDbData(data);
  return data.oeuvres[index];
}

export function deletePainting(id: string): boolean {
  const data = getDbData();
  const initialLength = data.oeuvres.length;
  data.oeuvres = data.oeuvres.filter((p) => p.id !== id);
  if (data.oeuvres.length === initialLength) return false;
  saveDbData(data);
  return true;
}

// ================= CRUD GOODIES =================
export function getGoodies(): Goody[] {
  return getDbData().goodies;
}

export function getGoodyById(id: string): Goody | undefined {
  return getGoodies().find((g) => g.id === id);
}

export function addGoody(goody: Omit<Goody, "id">): Goody {
  const data = getDbData();
  const newGoody: Goody = {
    ...goody,
    id: `goody-${Date.now()}`,
  };
  data.goodies.push(newGoody);
  saveDbData(data);
  return newGoody;
}

export function updateGoody(id: string, updatedFields: Partial<Goody>): Goody | null {
  const data = getDbData();
  const index = data.goodies.findIndex((g) => g.id === id);
  if (index === -1) return null;

  data.goodies[index] = { ...data.goodies[index], ...updatedFields };
  saveDbData(data);
  return data.goodies[index];
}

export function deleteGoody(id: string): boolean {
  const data = getDbData();
  const initialLength = data.goodies.length;
  data.goodies = data.goodies.filter((g) => g.id !== id);
  if (data.goodies.length === initialLength) return false;
  saveDbData(data);
  return true;
}

// ================= CRUD ÉVÉNEMENTS =================
export function getEvents(): Event[] {
  return getDbData().evenements;
}

export function addEvent(event: Omit<Event, "id">): Event {
  const data = getDbData();
  const newEvent: Event = {
    ...event,
    id: `event-${Date.now()}`,
  };
  data.evenements.push(newEvent);
  saveDbData(data);
  return newEvent;
}

export function updateEvent(id: string, updatedFields: Partial<Event>): Event | null {
  const data = getDbData();
  const index = data.evenements.findIndex((e) => e.id === id);
  if (index === -1) return null;

  data.evenements[index] = { ...data.evenements[index], ...updatedFields };
  saveDbData(data);
  return data.evenements[index];
}

export function deleteEvent(id: string): boolean {
  const data = getDbData();
  const initialLength = data.evenements.length;
  data.evenements = data.evenements.filter((e) => e.id !== id);
  if (data.evenements.length === initialLength) return false;
  saveDbData(data);
  return true;
}

// ================= GESTION MESSAGE CONTACT =================
export function getMessages(): Inquiry[] {
  return getDbData().messages;
}

export function addMessage(message: Omit<Inquiry, "id" | "date" | "read">): Inquiry {
  const data = getDbData();
  const newMessage: Inquiry = {
    ...message,
    id: `message-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    read: false,
  };
  data.messages.unshift(newMessage); // Nouveaux messages en premier
  saveDbData(data);
  return newMessage;
}

export function markMessageRead(id: string): boolean {
  const data = getDbData();
  const index = data.messages.findIndex((m) => m.id === id);
  if (index === -1) return false;

  data.messages[index].read = true;
  saveDbData(data);
  return true;
}

export function deleteMessage(id: string): boolean {
  const data = getDbData();
  data.messages = data.messages.filter((m) => m.id !== id);
  saveDbData(data);
  return true;
}

// ================= GESTION COMMANDES SHOP (STRIPE) =================
export function getOrders(): Order[] {
  return getDbData().commandes;
}

export function addOrder(order: Omit<Order, "id" | "date" | "status">): Order {
  const data = getDbData();
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    status: "En attente",
  };
  data.commandes.unshift(newOrder);

  // Mettre à jour les stocks de la boutique pour les articles achetés
  order.items.forEach((item) => {
    const goodyIndex = data.goodies.findIndex((g) => g.id === item.itemId);
    if (goodyIndex !== -1) {
      data.goodies[goodyIndex].stock = Math.max(0, data.goodies[goodyIndex].stock - item.quantity);
    }
  });

  saveDbData(data);
  return newOrder;
}

export function updateOrderStatus(id: string, status: Order["status"]): Order | null {
  const data = getDbData();
  const index = data.commandes.findIndex((o) => o.id === id);
  if (index === -1) return null;

  data.commandes[index].status = status;
  saveDbData(data);
  return data.commandes[index];
}
