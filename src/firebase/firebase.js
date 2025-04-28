import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfE4nH78Z-idWKeRtunVsv1Ek2bJYUArY",
  authDomain: "olx-clone-db5f7.firebaseapp.com",
  projectId: "olx-clone-db5f7",
  storageBucket: "olx-clone-db5f7.appspot.com",  
  messagingSenderId: "113657911806",
  appId: "1:113657911806:web:dba2466de461efc7f0c8af",
  measurementId: "G-YB6WKNFG3L"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
