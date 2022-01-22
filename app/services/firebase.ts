// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import type { Student } from "~/types/studentTypes";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * @param collectionName collection name from where to fetch the data
 * @returns fetched dataset
 */
export async function getFromFirebase(collectionName='logs') {
  const col = collection(db, collectionName);
  const dataSnapshot = await getDocs(col);

  return dataSnapshot.docs.map((doc) => doc.data());
}

/**
 * @param payload data to insert into firebase
 * @param collectionName collection to insert into
 * @returns newly entered data with id
 */
export async function addToFirebase(payload:any, collectionName='logs') {
  const col = collection(db, collectionName);
  const newData = await addDoc(col, payload);

  return newData;
}
