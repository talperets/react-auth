import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9va4ol-UVdDd71kHHcBRc8uL_LvBDdHc",
  authDomain: "react-auth-311dc.firebaseapp.com",
  projectId: "react-auth-311dc",
  storageBucket: "react-auth-311dc.appspot.com",
  messagingSenderId: "998982981596",
  appId: "1:998982981596:web:ae517cd76bfb510075e119",
  measurementId: "G-CCJ4G24Z8W",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
