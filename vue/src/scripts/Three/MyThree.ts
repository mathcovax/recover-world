import * as THREE from "three";
import {FBXLoader} from "three/examples/jsm/Addons.js";
import {Model} from "./Model";
import {Hook} from "../Hook";

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
		
		this.ambientLight = new THREE.AmbientLight(0xcccccc, 0.2); 
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
		this.directionalLight.position.set(-1, 0.9, 0.4);
		
		this.scene.add(this.ambientLight);
		this.scene.add(this.directionalLight);
		this.scene.add(this.camera);
	}

	private canvas: HTMLCanvasElement;
	readonly height: number;
	readonly width: number;
	private aspect: number;
	private fov = 70;

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	camera: THREE.PerspectiveCamera;

	private ambientLight: THREE.AmbientLight;
	private directionalLight: THREE.DirectionalLight;

	renderHook = new Hook(0);
	private started = false;

	addModel(model: Model){
		this.scene.add(model.getModel());
	}

	removeModel(model: Model){
		this.scene.remove(model.getModel());
	}

	initRender(){
		if(this.started) throw new Error();
		this.started = true;
		const buildedHook = this.renderHook.build();
		const render = () => {
			requestAnimationFrame(render);
			buildedHook();
			this.renderer.render(this.scene, this.camera);
		};
		render();
	}

	isStarted(){
		return this.started;
	}

	private static loaderFBX = new FBXLoader();

	static loadFBX(url: string){
		return this.loaderFBX.loadAsync(url);
	}
	
}
