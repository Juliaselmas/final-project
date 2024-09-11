import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "my-secret-key"; // should be a env variable

const JWT_AUTH_EXP = "1y"

function encodedSecret() {
    return new TextEncoder().encode(JWT_SECRET)
}

export async function signJWT(payload) {

    const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(JWT_AUTH_EXP)
    .sign(encodedSecret())
    
    return token
}

export async function verifyJWT(token) {
    try {
      const verified = await jose.jwtVerify(token, encodedSecret());
      return verified.payload; // Returnera payload om verifiering är framgångsrik
    } catch (error) {
      console.error("JWT verification failed", error);
      throw new Error("Invalid token");
    }
  }
  
