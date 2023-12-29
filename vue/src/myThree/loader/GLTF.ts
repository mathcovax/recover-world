import {GLTF, GLTFLoader} from "three/examples/jsm/Addons.js";
import {Loader} from "./main";

export class GLTFLoaderModel extends Loader<GLTF>{
	private static GLTFLoader = new GLTFLoader();

	async load(){
		const arrayBuffer = await this.fetch();
		return await GLTFLoaderModel.GLTFLoader.parseAsync(arrayBuffer, this.src);
	}
}
