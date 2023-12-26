import {Loader} from "./main";

export class TextureLoaderImage extends Loader<THREE.Texture>{
	load(){
		return Loader.Texture.loadAsync(this.src);
	}
}
