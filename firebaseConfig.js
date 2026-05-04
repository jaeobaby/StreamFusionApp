import { initializeApp, getApps, getApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCe1klvB0PcMJ9nFS-N6NaMYoqDAhVIcew",
  authDomain: "streamfusion-5aea2.firebaseapp.com",
  projectId: "streamfusion-5aea2",
  storageBucket: "streamfusion-5aea2.firebasestorage.app",
  messagingSenderId: "439873605921",
  appId: "1:439873605921:web:ded29edb3665f216712e60"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getApps().length === 0
  ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
  : getAuth(app);
