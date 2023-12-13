<script setup lang="ts">
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {firebaseApp} from "@SRC/plugins/firebase";
import {dt} from "@SRC/plugins/duploTo";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

async function sign(){
	// https://firebase.google.com/docs/auth/web/google-signin?hl=fr#web-modular-api_4
	try {
		const result = await signInWithPopup(auth, provider);
		await dt.post("/login", await result.user.getIdToken())
		.s(() => {

		})
		.result;
	}
	catch {
		
	}
}

</script>

<template>
	<div>
		<button @click="sign">
			test
		</button>
	</div>
</template>
