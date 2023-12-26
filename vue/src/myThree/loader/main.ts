import {TextureLoader} from "three";
import {FBXLoader, GLTFLoader} from "three/examples/jsm/Addons.js";

export abstract class Loader<loadValue = unknown>{
	protected static FBX = new FBXLoader();
	protected static GLTF = new GLTFLoader();
	protected static Texture = new TextureLoader();

	constructor(
		protected src: string
	){}

	abstract load(): Promise<loadValue>;
}
