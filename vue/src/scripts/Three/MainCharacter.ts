import {Character} from "./Character";

export class MainCharacter<
	motionsObject extends Record<string, THREE.Group<THREE.Object3DEventMap>> = any
> extends Character{
	constructor(model: THREE.Group<THREE.Object3DEventMap>, motions: motionsObject){
		super(model, motions);
	}
}
