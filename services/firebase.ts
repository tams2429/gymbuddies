import { initializeApp, getApps, FirebaseApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import functions from '@react-native-firebase/functions';

// Firebase configuration will be added via google-services.json (Android) 
// and GoogleService-Info.plist (iOS) files
let app: FirebaseApp;

if (getApps().length === 0) {
  app = initializeApp();
} else {
  app = getApps()[0];
}

export const firebaseApp = app;
export const firebaseAuth = auth();
export const firebaseFirestore = firestore();
export const firebaseStorage = storage();
export const firebaseFunctions = functions();

export default {
  app: firebaseApp,
  auth: firebaseAuth,
  firestore: firebaseFirestore,
  storage: firebaseStorage,
  functions: firebaseFunctions,
};
