import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyDhVHeNd-dSW17jDD_DihqwX8fGTxXQSdA",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "fir-ecommerce-ecca5.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    "fir-ecommerce-ecca5",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "fir-ecommerce-ecca5.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    "577134197188",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:577134197188:web:df52fed77a6bc2e93c8c91",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "",
};

const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

const configStatus = hasFirebaseConfig
  ? "configured"
  : "missing";

let app = null;
let analytics = null;
let auth = null;
let db = null;

if (hasFirebaseConfig) {
  try {
    const existingApps = getApps();
    app = existingApps.length ? existingApps[0] : initializeApp(firebaseConfig);
    analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase initialization failed. Continuing without Firebase features.", error);
  }
} else {
  console.warn(
    `[Firebase] Config is incomplete for this deployment. Expected VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, and VITE_FIREBASE_APP_ID. Current status: ${configStatus}.`
  );
}

export { app, analytics, auth, db, hasFirebaseConfig, configStatus };
