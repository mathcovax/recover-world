import {ImageLoader, Texture} from "three";
import {Loader} from "./main";

export class TextureLoaderImage extends Loader<THREE.Texture>{
	private static ImageLoader = new ImageLoader();
	private static savedImage = new Map<string, HTMLImageElement>();

	async fetchImage(){
		if(TextureLoaderImage.savedImage.get(this.src)){
			return TextureLoaderImage.savedImage.get(this.src);
		}

		const image = await TextureLoaderImage.ImageLoader.loadAsync(this.src);
		TextureLoaderImage.savedImage.set(this.src, image);
		return image;
	}

	async load(){
		const image = await this.fetchImage();
		return new Texture(image);
	}
}
