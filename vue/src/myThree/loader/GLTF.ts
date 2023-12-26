import {GLTF} from "three/examples/jsm/Addons";
import {Loader} from "./main";

export class GLTFLoaderModel extends Loader<GLTF>{
	load(){
		return Loader.GLTF.loadAsync(this.src);
	}
}

export class GLTFLoaderMotion extends Loader<THREE.AnimationClip>{
	private savedMotion: Record<string, THREE.AnimationClip> = {};

	constructor(
		protected name: string,
		src: string
	){
		super(src);
	}

	async load(){
		if(this.savedMotion[this.src]) return this.savedMotion[this.src];
		const GLB = await Loader.GLTF.loadAsync(this.src);
		const motion = GLB.animations.find(a => a.name.endsWith(this.name));
		if(!motion) throw new Error();
		return this.savedMotion[this.src] = motion;
	}
}
