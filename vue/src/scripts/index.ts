import {Character} from "./myThree/Character";
import {myThree} from "./myThree";
import {UserModel} from "./models/UserModel";
import {map} from "./load";
import {Map} from "./myThree/Map";

const mainUserModel = new UserModel(
	{body: 0, haire: 0}, 
	{
		body: {
			skin: "#000"
		},
		haire: {
			haire: "#0000FF"
		}
	}
);
await mainUserModel.load();

const character = new Character(mainUserModel);
character.hooks.onAdd.addSubscriber(() => character.launchMotion("standing"));
myThree.addCharacter(character);
	
const controller = myThree.createController(character);
controller.hooks.onStartMove.addSubscriber(() => character.launchMotion("run"));
controller.hooks.onStopMove.addSubscriber(() => character.launchMotion("standing"));

// const cube = new THREE.Mesh(
// 	new THREE.BoxGeometry(100, 1, 100),
// 	new THREE.MeshLambertMaterial()
// );
// myThree.addModel(cube);

map.scene.scale.set(20, 20, 20);
myThree.setMap(new Map(map.scene));
	
myThree.startRender();
