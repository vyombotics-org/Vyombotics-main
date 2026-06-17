import { g as getAuth, a as getFirestore, b as getApps, i as initializeApp, c as cert, d as applicationDefault, e as getStorage } from "../_libs/firebase-admin.mjs";
function getFirebaseAdmin() {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  const projectId = process.env.FIREBASE_PROJECT_ID || "vyombotics73099";
  try {
    if (serviceAccountJson) {
      try {
        const serviceAccount = JSON.parse(serviceAccountJson);
        return initializeApp({
          credential: cert(serviceAccount),
          storageBucket: `${serviceAccount.project_id || projectId}.firebasestorage.app`
        });
      } catch (parseErr) {
        console.error(
          "[Firebase Admin] Failed to parse FIREBASE_SERVICE_ACCOUNT JSON string:",
          parseErr
        );
      }
    }
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (clientEmail && privateKey) {
      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey
        }),
        storageBucket: `${projectId}.firebasestorage.app`
      });
    }
    return initializeApp({
      credential: applicationDefault(),
      projectId,
      storageBucket: `${projectId}.firebasestorage.app`
    });
  } catch (err) {
    console.warn(
      "[Firebase Admin] Could not load credentials. Initializing with Project ID only for local dev/build phase."
    );
    return initializeApp({
      projectId,
      storageBucket: `${projectId}.firebasestorage.app`
    });
  }
}
const adminApp = getFirebaseAdmin();
const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);
getStorage(adminApp);
export {
  adminAuth as a,
  adminDb as b
};
