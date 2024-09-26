import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDonL0j5S4Wrut8hTLOK4K33dgxbXC5EUY",
  authDomain: "blogging-app-c0e1c.firebaseapp.com",
  projectId: "blogging-app-c0e1c",
  storageBucket: "blogging-app-c0e1c.appspot.com",
  messagingSenderId: "185414181617",
  appId: "1:185414181617:web:baa7adc76214b3928b7f50",
  measurementId: "G-2CHQGBY17P"
};


const app = initializeApp(firebaseConfig);
export default app