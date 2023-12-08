import * as THREE from "three";
import {Character} from "./myThree/Character";
import {models, motions} from "./load";
import {myThree} from "./myThree";
	
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
