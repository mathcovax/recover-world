import {myThree} from "./currentScene";
import {mainCharacter} from "./currentUser";
import {MyThree, Map} from "@MYTHREE";

myThree.addCharacter(mainCharacter);
	
const controller = myThree.createController(mainCharacter);
controller.hooks.onStartMove.addSubscriber(() => mainCharacter.launchMotion("run"));
controller.hooks.onStopMove.addSubscriber(() => mainCharacter.launchMotion("standing_1"));

const map = await MyThree.loadGLTF("/assets/models/maps/floor.glb");
map.scene.scale.set(20, 20, 20);
myThree.setMap(new Map(map.scene));
	
myThree.startRender();
