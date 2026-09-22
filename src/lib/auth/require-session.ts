import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession } from "./session";

export async function requireAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}
