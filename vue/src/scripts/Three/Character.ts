import * as THREE from "three";

export class Character<
	motionsObject extends Record<string, THREE.Group<THREE.Object3DEventMap>> = any
>{
	constructor(model: THREE.Group<THREE.Object3DEventMap>, motions: motionsObject){
		this.model = model;
		this.mixer = new THREE.AnimationMixer(this.model);
		this.motions = motions;
		this.clock = new THREE.Clock();

		this.model.scale.set(0.3, 0.3, 0.3);
	}

	protected model: THREE.Group<THREE.Object3DEventMap>;
	private mixer: THREE.AnimationMixer;
	private motions: motionsObject;
	clock: THREE.Clock;

	private currentMotionName?: keyof motionsObject;
	private currentMotion?: THREE.AnimationAction;

	getModel(){
		return this.model;
	}

	getMixer(){
		return this.mixer;
	}

	launchMotion(name: keyof motionsObject){
		if(this.currentMotionName !== name && this.currentMotion) this.currentMotion.stop();
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

	get ROTATE(){
		return this.model.rotation.y;
	}

	set ROTATE(value: number){
		this.model.rotation.y = value;
	}

	get X(){
		return this.model.position.x;
	}

	set X(value: number){
		this.model.position.x = value;
	}

	get Z(){
		return this.model.position.z;
	}

	set Z(value: number){
		this.model.position.z = value;
	}
}
