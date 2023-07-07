// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getRemoteConfig } from "firebase/remote-config";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByB8GiLsVISPe1Nu_mtWX2JaiCyx9YyhM",
  authDomain: "metridash-web.firebaseapp.com",
  projectId: "metridash-web",
  storageBucket: "metridash-web.appspot.com",
  messagingSenderId: "977489432973",
  appId: "1:977489432973:web:a56db742505b29a1d72dc4",
  measurementId: "G-J5CXVGMQEN"
};

const app = initializeApp(firebaseConfig);

let remoteConfigVar;
if (typeof window !== "undefined") {
  remoteConfigVar = getRemoteConfig(app);
  remoteConfigVar.settings.minimumFetchIntervalMillis = 100000;
}
const remoteConfig = remoteConfigVar;


const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, app, remoteConfig};