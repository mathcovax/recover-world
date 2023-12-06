import {MyThree} from "./Three/MyThree";
import {FBXLoader} from "./Three/FBXLoader";
import {MainCharacter} from "./Three/MainCharacter";

const myThree = new MyThree("#scene");

const models = await FBXLoader({
	y_bot: "/models/Y_Bot.fbx"
});

const motions = await FBXLoader({
	standing: "/motions/Standing_W_Briefcase_Idle.fbx"
});

const character = new MainCharacter(models["y_bot"], motions);

myThree.addCharacter(character);

character.launchMotion("standing");

character.setRotate(Math.PI);
console.log(character.getPos(), character.getRotate(), Math.PI);

console.log(character);

