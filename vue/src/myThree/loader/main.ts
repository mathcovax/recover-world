export abstract class Loader<loadValue = unknown>{
	protected static saved = new Map<string, ArrayBuffer>();

	constructor(
		protected src: string
	){}

	async fetch(){
		if(Loader.saved.get(this.src)){
			return Loader.saved.get(this.src);
		}

		const result = await fetch(this.src);
		const blob = await result.blob();
		const arrayBuffer = await blob.arrayBuffer();
		Loader.saved.set(this.src, arrayBuffer);
		return arrayBuffer;
	}

	abstract load(): Promise<loadValue>;
}
