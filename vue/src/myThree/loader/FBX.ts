import {Loader} from "./main";

export class FBXLoaderModel extends Loader<THREE.Group>{
	load(){
		return Loader.FBX.loadAsync(this.src);
	}
}

export class FBXLoaderMotion extends Loader<THREE.AnimationClip>{
	private savedMotion: Record<string, THREE.AnimationClip> = {};

	constructor(
		protected name: string,
		src: string
	){
		super(src);
	}

	async load(){
		if(this.savedMotion[this.src]) return this.savedMotion[this.src];
		const group = await Loader.FBX.loadAsync(this.src);
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
		const group = await Loader.FBX.loadAsync(this.src);
		const mesh = group.children.find(a => a.name === this.name);
		if(!mesh) throw new Error();
		return mesh;
	}
}
