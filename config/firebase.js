// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5GywxlVeGqML63LSVO6Sped1wGS-UrcA",
  authDomain: "shadow-fd0ec.firebaseapp.com",
  projectId: "shadow-fd0ec",
  storageBucket: "shadow-fd0ec.firebasestorage.app",
  messagingSenderId: "821110575808",
  appId: "1:821110575808:web:536f0a862e160605fb9325",
  measurementId: "G-NWQG0VMW9G",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
