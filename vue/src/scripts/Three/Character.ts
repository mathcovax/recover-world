import * as THREE from "three";
import {Model} from "./Model";

export class Character<
	motionsObject extends Record<string, THREE.Group<THREE.Object3DEventMap>> = any
> extends Model
{
	constructor(model: THREE.Group<THREE.Object3DEventMap>, motions: motionsObject){
		super(model);

		this.mixer = new THREE.AnimationMixer(this.model);
		this.motions = motions;
		this.clock = new THREE.Clock();

		this.model.scale.set(0.3, 0.3, 0.3);
	}

	private mixer: THREE.AnimationMixer;
	private motions: motionsObject;
	clock: THREE.Clock;

	private currentMotionName?: keyof motionsObject;
	private currentMotion?: THREE.AnimationAction;

	getMixer(){
		return this.mixer;
	}

	launchMotion(name: keyof motionsObject){
		this.currentMotionName = name;
		this.currentMotion = this.mixer.clipAction(this.motions[name].animations[0]);
		this.currentMotion.play();
	}

	getCurrentMotionName(){
		return this.currentMotionName;
	}

	setRotate(angle: number){
		this.model.rotation.y = angle;
	}

	getRotate(){
		return this.model.rotation.y;
	}

	getPos(){
		return {
			x: this.model.position.x,
			z: this.model.position.z,
		};
	}

	setPos(x: number, z: number){
		this.model.position.x = x;
		this.model.position.z = z;
	}
}
