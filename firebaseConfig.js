// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase";

const app = initializeApp(firebaseConfig);

let remoteConfigVar;
if (typeof window !== "undefined") {
  remoteConfigVar = getRemoteConfig(app);
  remoteConfigVar.settings.minimumFetchIntervalMillis = 100000;
}
const remoteConfig = remoteConfigVar;

const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

export { auth, database, app, remoteConfig, db };
