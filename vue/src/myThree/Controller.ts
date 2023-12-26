import * as THREE from "three";
import {Character} from "./Character";
import {MyThree} from ".";

export class Controller{
	constructor(myThree: MyThree, character: Character){
		this.myThree = myThree;
		this.character = character;

		this.computed = {
			midWidth: this.myThree.width / 2,
			midHeight: this.myThree.height / 2,
			gapRotate: Math.PI / 2,
		};

		this.setSpeed(0.6);
		this.speedClock = new THREE.Clock();

		this.functionOnMouseDown = this.onMouseDown.bind(this);
		this.functionOnMouseUp = this.onMouseUp.bind(this);
		this.functionOnMouseMove = this.onMouseMove.bind(this);
		this.functionOnKeyDown = this.onKeyDown.bind(this);
		this.functionOnKeyUp = this.onKeyUp.bind(this);
		this.functionOnRenderFrame = this.onRenderFrame.bind(this);

		window.addEventListener("mousedown", this.functionOnMouseDown);
		window.addEventListener("mouseup", this.functionOnMouseUp);
		window.addEventListener("mousemove", this.functionOnMouseMove);
		window.addEventListener("keydown", this.functionOnKeyDown);
		window.addEventListener("keyup", this.functionOnKeyUp);
		this.myThree.renderHook.addSubscriber(this.functionOnRenderFrame);

		if(this.myThree.isStarted()) this.myThree.restartRender();
	}

	private myThree: MyThree;
	private character: Character;
	private functionOnMouseDown: Controller["onMouseDown"];
	private functionOnMouseUp: Controller["onMouseUp"];
	private functionOnMouseMove: Controller["onMouseMove"];
	private functionOnKeyUp: Controller["onKeyUp"];
	private functionOnKeyDown: Controller["onKeyDown"];
	private functionOnRenderFrame: Controller["onRenderFrame"];

	private computed: {
		midWidth: number,
		midHeight: number,
		gapRotate: number,
	};
	private keyToActions = {
		z: "up",
		s: "down",
		d: "right",
		q: "left",
	};
	private pressedActions = {
		up: false,
		down: false,
		right: false,
		left: false,
	};
	private pressedClick = {
		right: false,
		left: false,
	};
	private mousePosition = {
		x: 0,
		y: 0,
	};

	private speed = 0;
	private speedClock: THREE.Clock;
	private speedDeltaRef = 0.007;
	private raycaster = new THREE.Raycaster();
	private raycasterVectorOrigin = new THREE.Vector3();
	private raycasterVectorDirection = new THREE.Vector3(0, -1, 0);
	private maxHeightDifference = 10;

	hooks = {
		onStartMove: new Hook(0),
		onStopMove: new Hook(0),
		onClick: new Hook<(rotate: number, x: number, y: number) => void>(3),
	};

	delete(){
		window.removeEventListener("mousedown", this.functionOnMouseDown);
		window.removeEventListener("mouseup", this.functionOnMouseUp);
		window.removeEventListener("keyup", this.functionOnKeyUp);
		window.removeEventListener("keydown", this.functionOnKeyDown);
		this.myThree.renderHook.removeSubscriber(this.functionOnRenderFrame);
		this.myThree.restartRender();
	}

	setSpeed(speed: number){
		this.speed = speed;
	}

	private onMouseDown(event: MouseEvent){
		if(event.button === 0){
			this.pressedClick.left = true;
			this.hooks.onStartMove.launchSubscriber();
		}
		else if(event.button === 2){
			this.pressedClick.right = true;
		}
	}

	private onMouseUp(event: MouseEvent){
		if(event.button === 0){
			this.pressedClick.left = false;
			this.hooks.onStopMove.launchSubscriber();
		}
		else if(event.button === 2){
			this.pressedClick.right = false;
		}
	}

	private onMouseMove(event: MouseEvent){
		this.mousePosition.x = event.x - this.computed.midWidth;
		this.mousePosition.y = event.y - this.computed.midHeight;
	}

	private onKeyDown(event: KeyboardEvent){
		const key = event.key as keyof typeof this.keyToActions;
		const action = this.keyToActions[key] as keyof typeof this.pressedActions | undefined;
		if(action === undefined || this.pressedActions[action] === true) return;
		this.pressedActions[action] = true;
	}

	private onKeyUp(event: KeyboardEvent){
		const key = event.key as keyof typeof this.keyToActions;
		const action = this.keyToActions[key] as keyof typeof this.pressedActions | undefined;
		if(action === undefined) return;
		this.pressedActions[action] = false;
	}

	private onRenderFrame(){
		const delta = this.speedClock.getDelta();
		const map = this.myThree.getMap();
		if(map && this.pressedClick.left){
			const {x: mouseX, y: mouseY} = this.mousePosition;
			let rotate = Math.atan(mouseX / mouseY) + this.computed.gapRotate;
			if(mouseY >= 0) rotate += Math.PI;
			this.character.ROTATE = rotate;

			const currentSpeed = (delta * this.speed / this.speedDeltaRef);
			const x = (Math.sin(rotate) * currentSpeed) + this.character.X;
			const z = (Math.cos(rotate) * currentSpeed) + this.character.Z;

			this.raycasterVectorOrigin.set(x, this.character.Y + this.maxHeightDifference, z);
			this.raycaster.set(this.raycasterVectorOrigin, this.raycasterVectorDirection);
			const intersects = this.raycaster.intersectObject(map.getFloor());
			if(!intersects[0] || Math.abs(this.character.Y - intersects[0].point.y) > this.maxHeightDifference) return;
			
			this.character.X = x;
			this.character.Z = z;
			this.character.Y = intersects[0].point.y;
			this.myThree.setCameraPosition(this.character.X, this.character.Y, this.character.Z);
		}
	}
}
