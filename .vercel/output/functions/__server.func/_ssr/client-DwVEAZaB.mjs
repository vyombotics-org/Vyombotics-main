import "../_libs/firebase.mjs";
import { g as getAuth } from "../_libs/firebase__auth.mjs";
import { c as getApps, i as initializeApp, g as getApp } from "../_libs/firebase__app.mjs";
import "../_libs/firebase__logger.mjs";
import { g as getFirestore } from "../_libs/firebase__firestore.mjs";
import { g as getStorage } from "../_libs/firebase__storage.mjs";
const firebaseConfig = {
  apiKey: "AIzaSyBkcu62bvn5aSEmgT2WLEt42sjNG7rmGew",
  authDomain: "vyombotics73099.firebaseapp.com",
  projectId: "vyombotics73099",
  storageBucket: "vyombotics73099.firebasestorage.app",
  messagingSenderId: "853468934630",
  appId: "1:853468934630:web:4cf08e96a8b83f07566627",
  measurementId: "G-HFCR7G46KE"
};
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  const missing = [
    ...!firebaseConfig.apiKey ? ["VITE_FIREBASE_API_KEY"] : [],
    ...!firebaseConfig.projectId ? ["VITE_FIREBASE_PROJECT_ID"] : []
  ];
  console.error(`[Firebase Client] Missing configuration variables: ${missing.join(", ")}. Please check your .env settings.`);
}
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {
  auth as a,
  db as d,
  storage as s
};
