import {UserModel} from "./models/UserModel";
import {Character, Map, MyThree} from "@MYTHREE";

const myThree = new MyThree("#scene", {gapCamera: {x: -80, y: 200, z: 0}});

const mainUserModel = new UserModel(
	{body: 0, hair: 0}, 
	{
		body: {
			skin: "#000"
		},
		hair: {
			hair: "#0000FF"
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
const map = await MyThree.loadGLTF("/models/maps/floor.glb");
map.scene.scale.set(20, 20, 20);
myThree.setMap(new Map(map.scene));
	
myThree.startRender();
