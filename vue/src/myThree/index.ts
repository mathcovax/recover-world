import * as THREE from "three";
import {FBXLoader, GLTFLoader} from "three/examples/jsm/Addons.js";
import {Character} from "./Character";
import {Controller} from "./Controller";
import {Map} from "./Map";

export * from "./Character";
export * from "./CharacterModel";
export * from "./loader";
export * from "./Map";

export interface MyThreeParams{
	gapCamera?: {
		x: number,
		y: number,
		z: number,
	},
	positionCamera?: {
		x: number,
		y: number,
		z: number,
	},
	backgroundImage?: THREE.Texture,
	backgroundColor?: {
		color: string,
		alpha?: number,
	}
}

export class MyThree{
	constructor(query: string, params?: MyThreeParams){
		const canvas = document.querySelector(query);
		if(!canvas || !(canvas instanceof HTMLCanvasElement)) throw new Error();
		this.canvas = canvas;
		this.canvas.height = canvas.offsetHeight;
		this.canvas.width = canvas.offsetWidth;

		this.height = this.canvas.offsetHeight;
		this.width = this.canvas.offsetWidth;
		this.aspect = this.width / this.height;

		this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, alpha: true});
		if(params?.backgroundColor){
			this.renderer.setClearColor(
				params.backgroundColor.color, 
				params.backgroundColor.alpha
			);
		}
		
		this.scene = new THREE.Scene();
		if(params?.backgroundImage){
			this.scene.background = params?.backgroundImage;
		}

		this.camera = new THREE.PerspectiveCamera(
			this.fov,
			this.aspect,
		);
		if(params?.gapCamera){
			this.gapCamera = params.gapCamera;
		}
		if(params?.positionCamera){
			this.positionCamera = params.positionCamera;
		}
		this.setCameraPosition(
			this.positionCamera.x,
			this.positionCamera.y,
			this.positionCamera.z
		);
		
		this.ambientLight = new THREE.AmbientLight(0xcccccc, 0.2); 
		this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
		this.directionalLight.position.set(-1, 0.9, 0.4);
		
		this.scene.add(this.ambientLight);
		this.scene.add(this.directionalLight);
		this.scene.add(this.camera);

		this.renderHook.addSubscriber(this.characterMotion.bind(this));
	}

	private canvas: HTMLCanvasElement;
	readonly height: number;
	readonly width: number;
	private aspect: number;
	private fov = 70;

	private renderer: THREE.WebGLRenderer;
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private gapCamera = {
		x: 0,
		y: 0,
		z: 0,
	};
	private positionCamera = {
		x: 0,
		y: 0,
		z: 0,
	};

	private ambientLight: THREE.AmbientLight;
	private directionalLight: THREE.DirectionalLight;

	renderHook = new Hook(0);
	private currentFrameId = 0;
	private started = false;
	private characters: Character[] = [];
	private map?: Map;

	addModel(model: THREE.Object3D<THREE.Object3DEventMap>){
		this.scene.add(model);
	}

	removeModel(model: THREE.Object3D<THREE.Object3DEventMap>){
		this.scene.remove(model);
	}

	startRender(){
		if(this.started) throw new Error();
		this.started = true;
		const buildedHook = this.renderHook.build();
		const render = () => {
			this.currentFrameId = requestAnimationFrame(render);
			buildedHook();
			this.renderer.render(this.scene, this.camera);
		};
		render();
	}

	stopRender(){
		cancelAnimationFrame(this.currentFrameId);
		this.started = false;
	}

	restartRender(){
		this.stopRender();
		this.startRender();
	}

	isStarted(){
		return this.started;
	}

	setCameraPosition(x: number, y: number, z: number){
		this.positionCamera.x = x;
		this.positionCamera.y = y;
		this.positionCamera.z = z;
		this.camera.position.set(
			x + this.gapCamera.x, 
			y + this.gapCamera.y, 
			z + this.gapCamera.z,
		);
		this.camera.lookAt(new THREE.Vector3(x, y, z));
	}

	addCharacter(character: Character){
		this.characters.push(character);
		this.addModel(character.getModel());
		character.hooks.onAdd.launchSubscriber();
	}

	removeCharacter(character: Character){
		const index = this.characters.findIndex(char => char === character);
		if(index !== -1) this.characters.slice(index, 1);
		this.removeModel(character.getModel());
		character.hooks.onRemove.launchSubscriber();
	}

	hasCharacter(character: Character){
		return !!this.characters.find(char => char === character);
	}

	private characterMotion(){
		this.characters.forEach(char => {
			const dt = char.clock.getDelta();
			char.getMixer().update(dt);
		});
	}

	createController(character: Character){
		if(!this.characters.find(char => char === character)) throw new Error();
		return new Controller(this, character);
	}

	setMap(map: Map){
		if(this.map){
			this.removeModel(this.map.getFloor());
		}
		this.map = map;
		this.addModel(this.map.getFloor());
	}

	getMap(){
		return this.map;
	}

	setGapCamera(x: number, y: number, z: number){
		this.gapCamera.x = x;
		this.gapCamera.y = y;
		this.gapCamera.z = z;

		this.setCameraPosition(
			this.positionCamera.x,
			this.positionCamera.y,
			this.positionCamera.z
		);
	}

	private static loaderFBX = new FBXLoader();
	private static loaderGLTF = new GLTFLoader();

	static loadFBX(url: string){
		return this.loaderFBX.loadAsync(url);
	}
	static loadGLTF(url: string){
		return this.loaderGLTF.loadAsync(url);
	}
	
}
