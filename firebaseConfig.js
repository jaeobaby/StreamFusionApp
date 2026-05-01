import { initializeApp, getApps, getApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCe1klvB0PcMJ9nFS-N6NaMYoqDAhVIcew",
  authDomain: "streamfusion-5aea2.firebaseapp.com",
  projectId: "streamfusion-5aea2",
  storageBucket: "streamfusion-5aea2.firebasestorage.app",
  messagingSenderId: "439873605921",
  appId: "1:439873605921:web:ded29edb3665f216712e60"
};

let app;
let auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp();
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export { auth };
