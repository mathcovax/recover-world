<script setup lang="ts">
import {router} from "@SRC/router";
import {reactive} from "vue";
import {toFormRules} from "@SRC/plugins/toFormRules";
import * as zod from "zod";
import {dt} from "@SRC/plugins/duploTo";
import {userStore} from "@SRC/stores/userStore";

const googleIdToken = router.currentRoute.value.query.googleIdToken as string | undefined;
if(!googleIdToken) router.push("/login");

const {setToken, getInfo} = userStore();
const formData = reactive<{pseudo: string}>({pseudo: ""});

async function submited(){
	await dt.post<string>(
		"/register", 
		{
			pseudo: formData.pseudo, 
			googleIdToken,
		}
	)
	.s(accessToken => {
		setToken(accessToken);
		getInfo();
	})
	.result;
}

</script>

<template>
	<div>
		<VForm @submit.prevent="submited">
			<VTextField
			label="Pseudo"
			v-model="formData.pseudo"
			:rules="toFormRules(zod.string().min(3, 'minimume 3 char').max(30, 'maximume 30 char'))"
			/>

			<VBtn type="submite">
				S'inscrire
			</VBtn>
		</VForm>
	</div>
</template>
