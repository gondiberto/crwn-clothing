import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZfQLovv2FmXFM67JAL4SHvlvdt340N3M",
  authDomain: "crwn-clothing-db-e91df.firebaseapp.com",
  projectId: "crwn-clothing-db-e91df",
  storageBucket: "crwn-clothing-db-e91df.appspot.com",
  messagingSenderId: "903974994071",
  appId: "1:903974994071:web:d12962df7cf14d377729d2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user doesnt exists -> create / set doc with data
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userDocRef;

  // if user data exists

  // return userDocsRef
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // its better to put all methods related to a service in a single place - better to change if needed
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  // its better to put all methods related to a service in a single place - better to change if needed
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
