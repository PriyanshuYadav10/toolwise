import { SignJWT, jwtVerify } from "jose";

const encodedKey = new TextEncoder().encode(process.env.AUTH_SECRET!);
const EXPIRY = "8h";

export const COOKIE_NAME = "admin_session";

export async function signSession(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(encodedKey);
}

export async function verifySession(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, encodedKey);
    return typeof payload.email === "string" ? { email: payload.email } : null;
  } catch {
    return null;
  }
}
