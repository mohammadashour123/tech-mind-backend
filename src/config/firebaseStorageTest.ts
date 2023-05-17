import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";
dotenv.config();

const {
  FIRE_BASE_API_KEY,
  FIRE_BASE_AUTH_DOMAIN,
  FIRE_BASE_PROJECT_ID,
  FIRE_BASE_STORAGE_BUCKET,
  FIRE_BASE_MESSAGING_SENDER_ID,
  FIRE_BASE_APP_ID,
  FIRE_BASE_MEASUREMENT_ID,
} = process.env;

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIRE_BASE_API_KEY,
  authDomain: FIRE_BASE_AUTH_DOMAIN,
  projectId: FIRE_BASE_PROJECT_ID,
  storageBucket: FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: FIRE_BASE_MESSAGING_SENDER_ID,
  appId: FIRE_BASE_APP_ID,
  measurementId: FIRE_BASE_MEASUREMENT_ID,
};

// Firebase storage reference
const storage = getStorage(initializeApp(firebaseConfig));
// const storage = "";
export default storage;
