import * as admin from "firebase-admin";
import { getDatabase } from "firebase/database";
let app;

if (!admin.apps.length) {
  try {
    let firebaseKeys = process.env.FIREBASE_KEYS;
    const firebase_private_key_b64 = Buffer.from(firebaseKeys, "base64");
    const firebase_private_key = firebase_private_key_b64.toString("utf8");

    app = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(firebase_private_key)),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error) {
    console.error("Error initializing Firebase Admin SDK:", error);
  }
}
export const db = admin.firestore();
