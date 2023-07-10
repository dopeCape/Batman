import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyCtxFMIGeKu7zRVSOpa_lfnLyM1fk5rCA4",
//   authDomain: "metridash.firebaseapp.com",
//   databaseURL: "https://metridash-default-rtdb.firebaseio.com",
//   projectId: "metridash",
//   storageBucket: "metridash.appspot.com",
//   messagingSenderId: "931994121049",
//   appId: "1:931994121049:web:36b8cf063a1a2e6c705248",
// };

const firebaseConfig = {
  apiKey: "AIzaSyByB8GiLsVISPe1Nu_mtWX2JaiCyx9YyhM",
  authDomain: "metridash-web.firebaseapp.com",
  projectId: "metridash-web",
  storageBucket: "metridash-web.appspot.com",
  messagingSenderId: "977489432973",
  appId: "1:977489432973:web:a56db742505b29a1d72dc4",
  measurementId: "G-J5CXVGMQEN"
};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const database = getDatabase(app);

const db = getFirestore(app)
export { auth, database };
