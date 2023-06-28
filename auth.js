import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './firebase';
import { updateDoc } from 'firebase/firestore';

const auth = getAuth(app);
const firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const updateTokens = async (user, newTokenValue) => {
  const userRef = doc(firestore, 'users', user.uid);
  await updateDoc(userRef, { tokens: newTokenValue });
};

export const updateModel = async (user, newModelValue) => {
  const userRef = doc(firestore, 'users', user.uid);
  await updateDoc(userRef, { model: newModelValue });
};

export const createUserWithEmail = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  const userData = {
    email: user.email,
    tokens: 100,
    model: 'text-davinci-002',
    isNewUser: true,
  };
  await setDoc(doc(firestore, 'users', user.uid), userData);
  return user;
};

export const signInWithEmail = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('User does not exist');
    } else {
      throw error;
    }
  }
};

export const signInWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);
  const userData = {
    email: user.email,
    tokens: 100,
    model: 'text-davinci-002',
    isNewUser: true,
  };
  await setDoc(doc(firestore, 'users', user.uid), userData, { merge: true });
  return user;
};

export const onUserSignedIn = async (user, router) => {
  const userDoc = await doc(firestore, 'users', user.uid).get();
  const isNewUser = userDoc.data().isNewUser;
  console.log('Is new user:', isNewUser);
  if (isNewUser) {
    console.log('Redirecting to /');
    router.push('/');
  } else {
    console.log('Redirecting to /');
    router.push('/');
  }
};
