<script setup lang="ts">
import {Character, MyThree} from "@MYTHREE";
import {RegisterUserModel} from "@S/models/RegisterUserModel";
import {registersSelectColors} from "@SRC/composables/registerSelectColors";
import * as zod from "zod";

const googleIdToken = router.currentRoute.value.query.googleIdToken as string | undefined;
if(!googleIdToken) router.push({name: "login"});

const {setToken, getInfo} = userStore();
const pseudo = ref("");
const {colors, selectedColor} = registersSelectColors();
const selectedModel = reactive({body: 0, hair: 0});
let myThree: MyThree;
let userModel: RegisterUserModel;
let userCharacter: Character;

const pseudoRule = toFormRules(zod.string().min(3, "minimume 3 char").max(30, "maximume 30 char"));

async function submited(){
	await dt.post<string>(
		"/register", 
		{
			pseudo: pseudo.value, 
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
	myThree = new MyThree(
		"#register_scene", 
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
			backgroundColor: {
				color: "#000",
				alpha: 0
			}
		}
	);

	myThree.startRender();
	
	await updateModels();
});

const updateModels = async() => {
	if(selectedModel.body > RegisterUserModel.loadersModel.body.length - 1){
		selectedModel.body = 0;
		return;
	}
	else if(selectedModel.body < 0){
		selectedModel.body = RegisterUserModel.loadersModel.body.length - 1;
		return;
	}

	if(selectedModel.hair > RegisterUserModel.loadersModel.hair.length - 1){
		selectedModel.hair = 0;
		return;
	}
	else if(selectedModel.hair < 0){
		selectedModel.hair = RegisterUserModel.loadersModel.hair.length - 1;
		return;
	}

	let oldUserCharacter: Character | undefined;
	if(userCharacter){
		oldUserCharacter = userCharacter;
	}

	userModel = new RegisterUserModel(
		{
			body: selectedModel.body, 
			hair: selectedModel.hair
		},
		{
			body: {
				skin: selectedColor.skin,
				lips: selectedColor.lips,
				eyes: selectedColor.eyes,
				eyebrow: selectedColor.hair,
				underwear: selectedColor.underwear,
			},
			hair: {
				hair: selectedColor.hair,
			}
		}
	);
	await userModel.load();
	
	userCharacter = new Character(userModel);
	userCharacter.hooks.onAdd.addSubscriber(() => userCharacter.launchMotion("standing_2"));
	
	if(oldUserCharacter)myThree.removeCharacter(oldUserCharacter);
	myThree.addCharacter(userCharacter);
};

watch(
	selectedModel,
	updateModels
);

watch(
	() => 
		selectedColor.skin + 
		selectedColor.lips +
		selectedColor.eyes +
		selectedColor.eyebrow +
		selectedColor.underwear,
	() => {
		userModel.setColor(
			"body", 
			{
				skin: selectedColor.skin,
				lips: selectedColor.lips,
				eyes: selectedColor.eyes,
				eyebrow: selectedColor.eyebrow,
				underwear: selectedColor.underwear,
			}
		);
	}
);

watch(
	() => selectedColor.hair,
	() => {
		userModel.setColor(
			"hair", 
			{
				hair: selectedColor.hair
			}
		);
	}
);
</script>

<template>
	<div class="absolute w-full h-full top-0 flex left-0 items-center justify-center">
		<canvas
		id="register_scene"
		class="h-full aspect-square"
		/>
	</div>

	<VForm
	@submit.prevent="submited"
	class="absolute w-full h-full top-0 left-0 p-[10px] grid grid-cols-3"
	>
		<div class="col-span-1 flex flex-col gap-[10px]">
			<div
			v-for="(value, key) in colors"
			class="bg-[white] p-[5px] w-[130px] flex flex-col items-center"
			>
				<span>{{ $t(`register.color.${key}`) }}</span>

				<div class="flex gap-[5px] flex-wrap w-full">
					<div
					v-for="color of value"
					class="w-[20px] h-[20px]"
					:class="{
						'!border-black border-2': selectedColor[key] === color
					}"
					:style="{background: color}"
					@click="selectedColor[key] = color"
					/>
				</div>
			</div>
		</div>

		<div class="col-span-1 flex flex-col justify-end items-center">
			<div>
				<VTextField
				:label="$t('label.pseudo')"
				v-model="pseudo"
				:rules="pseudoRule"
				class="w-[300px]"
				density="compact"
				variant="solo"
				single-line
				/>
			</div>

			<VBtn type="submite">
				{{ $t("register.btn.register") }}
			</VBtn>
		</div>

		<div class="col-span-1 flex flex-col items-end">
			<div class="flex items-center gap-[10px]">
				<VBtn
				density="compact"
				icon="mdi-arrow-left-bold-circle"
				elevation="0"
				@click="selectedModel.hair--"
				/>
				
				<span>{{ $t("register.color.hair") }} {{ selectedModel.hair + 1 }}</span>

				<VBtn
				density="compact"
				icon="mdi-arrow-right-bold-circle"
				elevation="0"
				@click="selectedModel.hair++"
				/>
			</div>

			<div class="flex items-center gap-[10px]">
				<VBtn
				density="compact"
				icon="mdi-arrow-left-bold-circle"
				elevation="0"
				@click="selectedModel.body--"
				/>
				
				<span>{{ $t("register.body") }} {{ selectedModel.body + 1 }}</span>

				<VBtn
				density="compact"
				icon="mdi-arrow-right-bold-circle"
				elevation="0"
				@click="selectedModel.body++"
				/>
			</div>
		</div>
	</VForm>
</template>
