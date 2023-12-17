<script setup lang="ts">
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import {firebaseApp} from "@SRC/plugins/firebase";
import {dt} from "@SRC/plugins/duploTo";
import {userStore} from "@SRC/stores/userStore";
import {router} from "@SRC/router";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const {setToken, getInfo} = userStore();

async function sign(){
	// https://firebase.google.com/docs/auth/web/google-signin?hl=fr#web-modular-api_4
	try {
		const result = await signInWithPopup(auth, provider);
		const googleIdToken = await result.user.getIdToken();

		await dt.post<string>("/login", googleIdToken)
		.info<undefined>("user.notfound", () => {
			router.push({
				path: "/register",
				query: {googleIdToken}
			});
		})
		.s(accessToken => {
			setToken(accessToken);
			getInfo();
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
			Se connecter/S'inscrire avec Google
		</button>
	</div>
</template>
