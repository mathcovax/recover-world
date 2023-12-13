import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAuZgwV3SkJrSApqv7aAq2Isxdivac90Ps",
	authDomain: "recover-world.firebaseapp.com",
	projectId: "recover-world",
	storageBucket: "recover-world.appspot.com",
	messagingSenderId: "340979816703",
	appId: "1:340979816703:web:e2e9037a116289089154ca"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
