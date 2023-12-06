import * as THREE from "three";

export class Character<
	motionsObject extends Record<string, THREE.Group<THREE.Object3DEventMap>> = any
>{
	constructor(model: THREE.Group<THREE.Object3DEventMap>, motions: motionsObject){
		this.model = model;
		this.mixer = new THREE.AnimationMixer(this.model);
		this.motions = motions;

		this.model.scale.set(0.3, 0.3, 0.3);
	}

	private model: THREE.Group<THREE.Object3DEventMap>;
	private mixer: THREE.AnimationMixer;
	private motions: motionsObject;

	getModel(){
		return this.model;
	}

	getMixer(){
		return this.mixer;
	}

	launchMotion(name: keyof motionsObject){
		this.currentMotionName = name;
		this.currentMotion = this.mixer.clipAction(this.motions[name].animations[0]);
		this.currentMotion.play();
	}

	private currentMotionName?: keyof motionsObject;
	private currentMotion?: THREE.AnimationAction;

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

	translateTo(){
		// this.model.translateX()
	}
}
