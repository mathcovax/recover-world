export class Model{
	constructor(model: THREE.Group<THREE.Object3DEventMap>){
		this.model = model;
	}

	protected model: THREE.Group<THREE.Object3DEventMap>;

	getModel(){
		return this.model;
	}
}
