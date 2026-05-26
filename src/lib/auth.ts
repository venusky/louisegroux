import { cookies } from "next/headers";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "LouiseArt2026!";
const SESSION_COOKIE_NAME = "louise_admin_session";
const MOCK_SESSION_TOKEN = "jwt_louise_art_secret_session_token_2026";

export async function loginAdmin(username: string, password: string): Promise<boolean> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, MOCK_SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === MOCK_SESSION_TOKEN;
}

export async function verifyAuth(request: Request): Promise<boolean> {
  // Option 1 : Vérifier le cookie
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  if (session?.value === MOCK_SESSION_TOKEN) {
    return true;
  }

  // Option 2 : Vérifier les headers d'autorisation (utile pour les requêtes fetch)
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token === MOCK_SESSION_TOKEN;
  }

  return false;
}
