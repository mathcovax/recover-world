import {Loader} from "./main";
import {FBXLoader} from "three/examples/jsm/Addons.js";

export class FBXLoaderModel extends Loader<THREE.Group>{
	private static FBXLoader = new FBXLoader();

	async load(){
		const arrayBuffer = await this.fetch();
		return FBXLoaderModel.FBXLoader.parse(arrayBuffer, this.src);
	}
}

export class FBXLoaderMotion extends Loader<THREE.AnimationClip>{
	private static FBXLoader = new FBXLoader();

	constructor(
		protected name: string,
		src: string
	){
		super(src);
	}

	async load(){
		const arrayBuffer = await this.fetch();
		const group = FBXLoaderMotion.FBXLoader.parse(arrayBuffer, this.src);
		const motion = group.animations[0];
		if(!motion) throw new Error();
		motion.name = this.name;
		return motion;
	}
}
