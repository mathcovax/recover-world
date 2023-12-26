import * as THREE from "three";
import {Hook} from "../Hook";
import {CharacterModel} from "./CharacterModel";

export class Character{
	private mixer: THREE.AnimationMixer;
	clock: THREE.Clock;

	private get model(){
		return this.characterModel.getModel();
	}

	private currentMotionName?: string;
	private currentMotion?: THREE.AnimationAction;

	hooks = {
		onAdd: new Hook(0),
		onRemove: new Hook(0),
	};

	constructor(
		private characterModel: CharacterModel
	){
		this.mixer = new THREE.AnimationMixer(this.model);
		this.clock = new THREE.Clock();
	}

	getModel(){
		return this.characterModel.getModel();
	}

	getMixer(){
		return this.mixer;
	}

	launchMotion(name: string){
		if(this.currentMotionName !== name && this.currentMotion) this.currentMotion.stop();
		
		const animation = this.model.animations.find(a => a.name.endsWith(name));
		if(!animation) throw new Error();

		this.currentMotionName = name;
		this.currentMotion = this.mixer.clipAction(animation);
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

	get Y(){
		return this.model.position.y;
	}

	set Y(value: number){
		this.model.position.y = value;
	}

	get Z(){
		return this.model.position.z;
	}

	set Z(value: number){
		this.model.position.z = value;
	}
}
