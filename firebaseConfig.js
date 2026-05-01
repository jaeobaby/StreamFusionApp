import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCe1klvB0PcMJ9nFS-N6NaMYoqDAhVIcew",
  authDomain: "streamfusion-5aea2.firebaseapp.com",
  projectId: "streamfusion-5aea2",
  storageBucket: "streamfusion-5aea2.firebasestorage.app",
  messagingSenderId: "439873605921",
  appId: "1:439873605921:web:ded29edb3665f216712e60",
  measurementId: "G-999DFR72X2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
