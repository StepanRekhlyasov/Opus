import { initializeApp, } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAWOFluepo5iLLVDR5S7KssgriBm1wXUAg',
	authDomain: 'opus-test-2023.firebaseapp.com',
	databaseURL: 'https://opus-test-2023-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'opus-test-2023',
	storageBucket: 'opus-test-2023.appspot.com',
	messagingSenderId: '299111958189',
	appId: '1:299111958189:web:e537c303900fd9ba63a824',
	measurementId: 'G-F6HD5QDYDX'
};

const app = initializeApp(firebaseConfig);


export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
export const ui = new firebaseui.auth.AuthUI(auth);
export default firebase
