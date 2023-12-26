import * as THREE from "three";
import {FBXLoader} from "three/examples/jsm/Addons.js";

export abstract class Loader<loadValue = unknown>{
	protected static loaderFBX = new FBXLoader();

	constructor(
		protected src: string
	){}

	abstract load(): Promise<loadValue>;
}

export class FBXLoaderModels extends Loader<THREE.Group>{
	load(){
		return Loader.loaderFBX.loadAsync(this.src);
	}
}

export class FBXLoaderMotions extends Loader<THREE.AnimationClip>{
	private savedMotion: Record<string, THREE.AnimationClip> = {};

	constructor(
		protected name: string,
		src: string
	){
		super(src);
	}

	async load(){
		if(this.savedMotion[this.src]) return this.savedMotion[this.src];
		const group = await FBXLoaderMotions.loaderFBX.loadAsync(this.src);
		const motion = group.animations[0];
		if(!motion) throw new Error();
		motion.name = this.name;
		return this.savedMotion[this.src] = motion;
	}
}

export class FBXLoaderMesh extends Loader<THREE.Object3D>{
	constructor(
		protected name: string,
		src: string
	){
		super(src);
	}

	async load(){
		const group = await FBXLoaderMesh.loaderFBX.loadAsync(this.src);
		const mesh = group.children.find(a => a.name === this.name);
		if(!mesh) throw new Error();
		return mesh;
	}
}
