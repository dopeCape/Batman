import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { updateDoc } from "firebase/firestore";
// import { db } from './firebaseConfig';
import { app } from "./firebaseConfig";
const auth = getAuth(app);

const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const readTokens = async (user) => {
  const userRef = doc(firestore, "users", user.uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  if (userData) {
    return userData.tokens;
  }
  return null;
};

export const getRealTimeToken = async (user) => {
  let value;
  const tokenRef = doc(firestore, "users", user.uid);
  await onSnapshot(tokenRef, (snapshot) => {
    value = snapshot.data().tokens;
    console.log("this is real time data " + value);
  });
  return value;

  // if (doc1.exists) {
  //   console.log("this is real time data "+doc1.data().tokens)
  //   return doc1
  // } else {
  //   return null;
  // }
};

export const generateRealTimeToken = (user) => {
  // Get the current user's token
  if (!user) return null;
  let token = getUserToken(user);
  const tokenRef = doc(firestore, "users", user.uid);
  // Listen for changes to the token
  onSnapshot(tokenRef, (newToken) => {
    // Update the token if it has changed
    if (newToken !== token) {
      token = newToken;
    }
  });

  // Return the current token
  return token;
};

export const getUserToken = async (user) => {
  if (!user) return null;

  const tokenRef = doc(firestore, "users", user.uid);
  const doc1 = await getDoc(tokenRef);

  if (doc1.exists) {
    console.log("getuserToken" + doc1.data().tokens);
    return doc1.data().tokens;
  } else {
    return null;
  }
};

// export const updateTokens = async (user, newTokenValue) => {
//   const userRef = doc(firestore, 'users', user.uid);
//   await updateDoc(userRef, { tokens: newTokenValue });
// };
export const updateTokens = async (user, newTokenValue) => {
  const userRef = doc(firestore, "users", user.uid);

  await updateDoc(userRef, { tokens: newTokenValue });
};

export const updateModel = async (user, newModelValue) => {
  const userRef = doc(firestore, "users", user.uid);
  await updateDoc(userRef, { model: newModelValue });
};

export const createUserWithEmail = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const userData = {
    email: user.email,
    tokens: 100,
    model: "text-davinci-002",
    isNewUser: true,
    uid: user.uid,
  };
  await setDoc(doc(firestore, "users", user.uid), userData);
  return user;
};

export const signInWithEmail = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error("User does not exist");
    } else {
      throw error;
    }
  }
};

export const Logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);

  const userRef = collection(db, "users");
  const q = query(userRef, where("email", "==", user.email));

  const querySnapshot = await getDocs(q);
  let checkUser = [];
  querySnapshot.forEach((doc) => {
    checkUser.push({ id: doc.id, ...doc.data() });
  });

  if (checkUser.length > 0) return;

  const userData = {
    email: user.email,
    tokens: 100,
    model: "text-davinci-002",
    isNewUser: true,
    uid: user.uid,
  };
  await setDoc(doc(firestore, "users", user.uid), userData, { merge: true });
  return user;
};

export const onUserSignedIn = async (user, router) => {
  const userDoc = await doc(firestore, "users", user.uid).get();
  const isNewUser = userDoc.data().isNewUser;
  console.log("Is new user:", isNewUser);
  if (isNewUser) {
    console.log("Redirecting to /");
    router.push("/");
  } else {
    console.log("Redirecting to /");
    router.push("/");
  }
};
