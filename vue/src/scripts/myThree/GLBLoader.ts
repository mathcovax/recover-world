import * as THREE from "three";
import {GLTFLoader, GLTF} from "three/examples/jsm/Addons.js";

export abstract class GLBLoader<loadValue = unknown>{
	protected static loaderFBX = new GLTFLoader();

	constructor(
		protected src: string
	){}

	abstract load(): Promise<loadValue>;
}

export class GLBLoaderGroup extends GLBLoader<GLTF>{
	load(){
		return GLBLoaderGroup.loaderFBX.loadAsync(this.src);
	}
}

export class GLBLoaderMotions extends GLBLoader<THREE.AnimationClip>{
	private savedMotion: Record<string, THREE.AnimationClip> = {};

	constructor(
		protected name: string,
		src: string
	){
		super(src);
	}

	async load(){
		if(this.savedMotion[this.src]) return this.savedMotion[this.src];
		const GLB = await GLBLoaderMotions.loaderFBX.loadAsync(this.src);
		const motion = GLB.animations.find(a => a.name.endsWith(this.name));
		if(!motion) throw new Error();
		return this.savedMotion[this.src] = motion;
	}
}
