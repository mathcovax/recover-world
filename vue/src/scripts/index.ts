import {MyThree} from "./Three/MyThree";
import {FBXLoader} from "./Three/FBXLoader";
import {Map} from "./Three/Map";
import {Character} from "./Three/Character";
import {Controller} from "./Controller";

const models = await FBXLoader({
	y_bot: "/models/Y_Bot.fbx"
});

const motions = await FBXLoader({
	standing: "/motions/Standing_W_Briefcase_Idle.fbx"
});

const myThree = new MyThree("#scene");
const map = new Map(myThree);

const character = new Character(models["y_bot"], motions);
character.launchMotion("standing");

const controller = new Controller(myThree, character);
controller.enable();

map.addCharacter(character);
map.init();

// console.log(character.getPos(), character.getRotate(), Math.PI);
// console.log(character);

