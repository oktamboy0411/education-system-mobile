// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTdfjJFo_HmAMro1PeT8M87MbXARRPjH8",
  authDomain: "education-system-5e841.firebaseapp.com",
  projectId: "education-system-5e841",
  storageBucket: "education-system-5e841.firebasestorage.app",
  messagingSenderId: "331317825675",
  appId: "1:331317825675:web:a4643757ad3a7191d4048e",
  measurementId: "G-MB49C7CE29"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
