<script setup lang="ts">
import {Character, MyThree, TextureLoaderImage} from "@MYTHREE";
import {UserModel} from "@S/models/UserModel";
import * as zod from "zod";

const googleIdToken = router.currentRoute.value.query.googleIdToken as string | undefined;
if(!googleIdToken) router.push({name: "login"});

const {setToken, getInfo} = userStore();
const formData = reactive<{pseudo: string}>({pseudo: ""});
let myThree: MyThree;
let userModel: UserModel;
let userCharacter: Character;

const pseudoRule = toFormRules(zod.string().min(3, "minimume 3 char").max(30, "maximume 30 char"));
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

onMounted(async() => {
	userModel = new UserModel(
		{body: 0, hair: 0}
	);

	const [texture] = await Promise.all([
		new TextureLoaderImage("/assets/images/missing_textures.png").load(),
		userModel.load()
	]);
	
	userCharacter = new Character(userModel);
	userCharacter.hooks.onAdd.addSubscriber(() => userCharacter.launchMotion("standing"));
	
	myThree = new MyThree(
		"#scene_custom_character", 
		{
			gapCamera: {
				x: 0,
				y: 0,
				z: 50
			}, 
			positionCamera: {
				x: 0,
				y: 27,
				z: 0
			},
			backgroundImage: texture
		}
	);
	myThree.addCharacter(userCharacter);
	myThree.startRender();
});
</script>

<template>
	<VForm
	@submit.prevent="submited"
	class="flex flex-col items-center"
	>
		<canvas
		id="scene_custom_character"
		class="w-[500px] h-[500px]"
		/>

		<VTextField
		:label="$t('label.pseudo')"
		v-model="formData.pseudo"
		:rules="pseudoRule"
		class="w-[300px]"
		density="compact"
		variant="solo"
		single-line
		/>

		<VBtn type="submite">
			{{ $t("register.btn.register") }}
		</VBtn>
	</VForm>
</template>
