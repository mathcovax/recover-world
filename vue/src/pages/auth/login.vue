<script setup lang="ts">
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";

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
				name: "register",
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
	<div class="absolute">
		<button @click="sign">
			{{ $t("login.btn.connect") }}
		</button>
	</div>
</template>
