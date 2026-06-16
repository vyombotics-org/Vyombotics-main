import { initializeApp, getApps, cert, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

function getFirebaseAdmin() {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  try {
    if (clientEmail && privateKey) {
      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        storageBucket: `${projectId}.firebasestorage.app`,
      });
    }

    // Try default credentials first
    return initializeApp({
      credential: applicationDefault(),
      projectId,
      storageBucket: `${projectId}.firebasestorage.app`,
    });
  } catch (err) {
    console.warn(
      "[Firebase Admin] Could not load credentials. Initializing with Project ID only for local dev/build phase.",
    );
    return initializeApp({
      projectId,
      storageBucket: `${projectId}.firebasestorage.app`,
    });
  }
}

const adminApp = getFirebaseAdmin();
export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
