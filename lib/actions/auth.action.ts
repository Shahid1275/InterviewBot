// @/lib/actions/auth.action.ts
"use server";
import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ONE_WEEK = 60 * 60 * 24 * 7;

interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export async function signIn(params: { email: string; idToken: string }) {
  try {
    await auth.getUserByEmail(params.email);

    const sessionCookie = await auth.createSessionCookie(params.idToken, {
      expiresIn: ONE_WEEK * 1000,
    });

    (await cookies()).set("session", sessionCookie, {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.code === "auth/user-not-found"
          ? "User not found"
          : "Authentication failed",
    };
  }
}

export async function signUp(params: {
  uid: string;
  name: string;
  email: string;
}) {
  try {
    await db.collection("users").doc(params.uid).set({
      name: params.name,
      email: params.email,
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create user",
    };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) return null;

    return {
      ...userDoc.data(),
      id: userDoc.id,
    } as User;
  } catch (e) {
    console.error("Error getting current user:", e);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
