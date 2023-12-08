import {MyThree} from "./Three/MyThree";
import {FBXLoader} from "./Three/FBXLoader";
import {Character} from "./Three/Character";
import {Controller} from "./Three/Controller";

const models = await FBXLoader({
	y_bot: "/models/Y_Bot.fbx"
});

const motions = await FBXLoader({
	standing: "/motions/Standing_W_Briefcase_Idle.fbx",
	run: "/motions/Slow_Run.fbx",
});

const myThree = new MyThree("#scene");

const character = new Character(models["y_bot"], motions);
character.launchMotion("standing");
myThree.addCharacter(character);

const controller = new Controller(myThree, character);

myThree.startRender();

// console.log(character.getPos(), character.getRotate(), Math.PI);
// console.log(character);

