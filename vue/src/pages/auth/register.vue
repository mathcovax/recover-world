<script setup lang="ts">
import * as zod from "zod";

const googleIdToken = router.currentRoute.value.query.googleIdToken as string | undefined;
if(!googleIdToken) router.push({name: "login"});

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

const pseudoRule = toFormRules(zod.string().min(3, "minimume 3 char").max(30, "maximume 30 char"));
</script>

<template>
	<div>
		<VForm @submit.prevent="submited">
			<VTextField
			label="Pseudo"
			v-model="formData.pseudo"
			:rules="pseudoRule"
			/>

			<VBtn type="submite">
				{{ $t("register.btn.register") }}
			</VBtn>
		</VForm>
	</div>
</template>
