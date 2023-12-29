<script setup lang="ts">
import {Character, MyThree} from "@MYTHREE";
import {RegisterUserModel} from "@S/models/RegisterUserModel";
import {registerSelectColors} from "@SRC/composables/registerSelectColors";
import * as zod from "zod";

const googleIdToken = router.currentRoute.value.query.googleIdToken as string;

const {setToken, getInfo} = userStore();
const isFormValid = ref(false);
const pseudo = ref("");
const {colors, selectedColors} = registerSelectColors();
const selectedModels = reactive({body: 0, hair: 0});
let myThree: MyThree;
let userModel: RegisterUserModel;
let userCharacter: Character;

const pseudoRule = toFormRules(zod.string().min(3, "minimume 3 char").max(30, "maximume 30 char"));

async function submited(){
	if(!isFormValid.value) return;

	await dt.post<string>(
		"/register", 
		{
			pseudo: pseudo.value, 
			models: selectedModels,
			colors: selectedColors,
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
	for(const [key, value] of objectEntries(selectedModels)){
		if(value > RegisterUserModel.loadersModel[key].length - 1){
			selectedModels[key] = 0;
			return;
		}
		else if(value < 0){
			selectedModels[key] = RegisterUserModel.loadersModel[key].length - 1;
			return;
		}
	}

	let oldUserCharacter: Character | undefined;
	if(userCharacter){
		oldUserCharacter = userCharacter;
	}

	userModel = new RegisterUserModel(
		{
			body: selectedModels.body, 
			hair: selectedModels.hair
		},
		{
			body: {
				skin: selectedColors.skin,
				lips: selectedColors.lips,
				eyes: selectedColors.eyes,
				eyebrow: selectedColors.hair,
				underwear: selectedColors.underwear,
			},
			hair: {
				hair: selectedColors.hair,
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
	selectedModels,
	updateModels
);

watch(
	() => 
		selectedColors.skin + 
		selectedColors.lips +
		selectedColors.eyes +
		selectedColors.eyebrow +
		selectedColors.underwear,
	() => {
		userModel.setColor(
			"body", 
			{
				skin: selectedColors.skin,
				lips: selectedColors.lips,
				eyes: selectedColors.eyes,
				eyebrow: selectedColors.eyebrow,
				underwear: selectedColors.underwear,
			}
		);
	}
);

watch(
	() => selectedColors.hair,
	() => {
		userModel.setColor(
			"hair", 
			{
				hair: selectedColors.hair
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
	v-model="isFormValid"
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
						'!border-black border-2': selectedColors[key] === color
					}"
					:style="{background: color}"
					@click="selectedColors[key] = color"
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
			<div
			v-for="(value, key) in selectedModels"
			class="flex items-center justify-between gap-[5px] w-[150px]"
			>
				<VBtn
				density="compact"
				icon="mdi-arrow-left-bold-circle"
				elevation="0"
				@click="selectedModels[key]--"
				/>
				
				<span>{{ $t(`register.${key}`, {number: value + 1}) }}</span>

				<VBtn
				density="compact"
				icon="mdi-arrow-right-bold-circle"
				elevation="0"
				@click="selectedModels[key]++"
				/>
			</div>
		</div>
	</VForm>
</template>
