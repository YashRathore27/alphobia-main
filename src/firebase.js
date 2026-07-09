import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Same Firebase project as the admin panel (altftool-bca36)
const firebaseConfig = {
  apiKey: "AIzaSyAYKc0SBXyY3bfKLkmcCrPf-NsPF8p_Z50",
  authDomain: "altftool-bca36.firebaseapp.com",
  projectId: "altftool-bca36",
  storageBucket: "altftool-bca36.firebasestorage.app",
  messagingSenderId: "111638030249",
  appId: "1:111638030249:web:caeabc577fba8b5b29c6b8",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
