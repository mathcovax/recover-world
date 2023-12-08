import * as THREE from "three";
import {MyThree} from "./Three/MyThree";
import {FBXLoader} from "./Three/FBXLoader";
import {Character} from "./Three/Character";

const models = await FBXLoader({
	y_bot: "/models/Y_Bot.fbx"
});

const motions = await FBXLoader({
	standing: "/motions/Standing_W_Briefcase_Idle.fbx",
	run: "/motions/Slow_Run.fbx",
});

const myThree = new MyThree("#scene");

const character = new Character(models["y_bot"], motions);
character.hooks.onAdd.addSubscriber(() => character.launchMotion("standing"));
myThree.addCharacter(character);

const controller = myThree.createController(character);
controller.hooks.onStartMove.addSubscriber(() => character.launchMotion("run"));
controller.hooks.onStopMove.addSubscriber(() => character.launchMotion("standing"));

const cube = new THREE.Mesh(
	new THREE.BoxGeometry(100, 1, 100),
	new THREE.MeshLambertMaterial()
);
myThree.addModel(cube);

myThree.startRender();

// console.log(character.getPos(), character.getRotate(), Math.PI);
// console.log(character);

