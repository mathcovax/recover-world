import * as THREE from "three";
import {FBXLoader, ThreeMFLoader} from "three/examples/jsm/Addons.js";
import {Character} from "./Character";

export class MyThree{
	constructor(query: string){
		const canvas = document.querySelector(query);
		if(!canvas || !(canvas instanceof HTMLCanvasElement)) throw new Error();
		this.canvas = canvas;
		this.canvas.height = canvas.offsetHeight;
		this.canvas.width = canvas.offsetWidth;

		this.height = this.canvas.offsetHeight;
		this.width = this.canvas.offsetWidth;
		this.aspect = this.width / this.height;
		

		this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			this.aspect,
		);
		this.camera.position.set(-50, 100, -50);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.clock = new THREE.Clock();
		
		this.ambientLight = new THREE.AmbientLight(0xcccccc, 0.2); 
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
		this.directionalLight.position.set(-1, 0.9, 0.4);
		
		this.scene.add(this.ambientLight);
		this.scene.add(this.directionalLight);
		this.scene.add(this.camera);

		const render = () => {
			requestAnimationFrame(render);

			// update de toute les animation des character sur la scene
			const dt = this.clock.getDelta();
			this.characters.forEach(character => character.getMixer().update(dt)); 
			
			this.renderer.render(this.scene, this.camera);
		};
		render();
	}

	private canvas: HTMLCanvasElement;
	private height: number;
	private width: number;
	private aspect: number;
	private fov = 70;

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private clock: THREE.Clock;

	private ambientLight: THREE.AmbientLight;
	private directionalLight: THREE.DirectionalLight;

	addCharacter(character: Character){
		this.characters.push(character);
		this.scene.add(character.getModel());
	}

	private characters: Character[] = [];

	RemoveCharacter(character: Character){
		this.characters.filter(char => char !== character);
		this.scene.remove(character.getModel());
	}

	private static loaderFBX = new FBXLoader();

	static loadFBX(url: string){
		return this.loaderFBX.loadAsync(url);
	}
	
}
