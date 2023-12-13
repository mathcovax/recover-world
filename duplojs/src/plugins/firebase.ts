import firebaseAdmin from "firebase-admin";
// https://console.firebase.google.com/u/0/project/recover-world/settings/serviceaccounts/adminsdk
import firebaseCreditial from "../../firebase.credential.json";

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(firebaseCreditial as any)
});

export const firebaseAuth = firebaseAdmin.auth();
