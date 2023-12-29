import {Character} from "@MYTHREE";
import {UserModel} from "./models/UserModel";

const {data: {models, colors}} = userStore();

if(!models || !colors) throw new Error();


export const mainUserModel = new UserModel(
	{body: models.body, hair: models.hair}, 
	{
		body: {
			skin: colors.skin,
			eyes: colors.eyes,
			lips: colors.lips,
			eyebrow: colors.eyebrow,
			underwear: colors.underwear,
		},
		hair: {
			hair: colors.hair,
		}
	}
);
await mainUserModel.load();

export const mainCharacter = new Character(mainUserModel);
mainCharacter.hooks.onAdd.addSubscriber(
	() => mainCharacter.launchMotion("standing_1")
);
