export class Map{
	constructor(floor: THREE.Object3D<THREE.Object3DEventMap>){
		this.floor = floor;
	}

	private floor: THREE.Object3D<THREE.Object3DEventMap>;

	getFloor(){
		return this.floor;
	}
}
