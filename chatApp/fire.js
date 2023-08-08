import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore,doc, setDoc ,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDssB1GnXNoqOBJIoFZU6Mt2lSdY-6bkvY",
    authDomain: "chat-app-b630e.firebaseapp.com",
    projectId: "chat-app-b630e",
    storageBucket: "chat-app-b630e.appspot.com",
    messagingSenderId: "1025472916860",
    appId: "1:1025472916860:web:bb9d1a91b34867cb3e48f9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage();

  export{auth,db,storage}