import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  
} from 'firebase/auth'
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyASOuVLdI7B5dnI14WdWcx2xNllvvtHKNI",
  authDomain: "bankio-f9794.firebaseapp.com",
  projectId: "bankio-f9794",
  storageBucket: "bankio-f9794.appspot.com",
  messagingSenderId: "763087503796",
  appId: "1:763087503796:web:cab982aaa80e1d59cbb2e1"
};


initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createUserAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;

  const getUserDoc = doc(db, 'users', userAuth.uid);
  const userSnapsShot = await getDoc(getUserDoc);

  if (!userSnapsShot.exists()) {
    const { displayName, email } = userAuth;
    const createAdt = new Date();

    try {
      await setDoc(getUserDoc, {
        displayName,
        email,
        createAdt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return getUserDoc;
}

export const createUserEmail = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signWithEmail = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);