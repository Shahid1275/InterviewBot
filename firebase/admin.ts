import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";

const adminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
};

const adminApp =
  getApps().length === 0 ? initializeApp(adminConfig) : getApps()[0];

// Export as auth (not adminAuth) for consistency
export const auth = getAdminAuth(adminApp);
export const db = getAdminFirestore(adminApp);
