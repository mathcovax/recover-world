import * as THREE from "three";
import {Character} from "./Character";
import {MyThree} from "./MyThree";
import {Hook} from "../Hook";

export class Controller{
	constructor(myThree: MyThree, character: Character){
		this.myThree = myThree;
		this.character = character;

		this.computed = {
			midWidth: this.myThree.width / 2,
			midHeight: this.myThree.height / 2,
			gapRotate: Math.PI / 2,
			oneRad: Math.PI * 2,
			diagonalSpeed: 0,
		};

		this.setSpeed(0.6);
		this.speedClock = new THREE.Clock();

		this.functionOnClick = this.onClick.bind(this);
		this.functionOnKeyDown = this.onKeyDown.bind(this);
		this.functionOnKeyUp = this.onKeyUp.bind(this);
		this.functionOnRenderFrame = this.onRenderFrame.bind(this);

		window.addEventListener("click", this.functionOnClick);
		window.addEventListener("keydown", this.functionOnKeyDown);
		window.addEventListener("keyup", this.functionOnKeyUp);
		this.myThree.renderHook.addSubscriber(this.functionOnRenderFrame);

		if(this.myThree.isStarted()) this.myThree.restartRender();
	}

	private myThree: MyThree;
	private character: Character;
	private functionOnClick: Controller["onClick"];
	private functionOnKeyUp: Controller["onKeyUp"];
	private functionOnKeyDown: Controller["onKeyDown"];
	private functionOnRenderFrame: Controller["onRenderFrame"];

	private computed: {
		midWidth: number,
		midHeight: number,
		gapRotate: number,
		oneRad: number,
		diagonalSpeed: number,
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

	private rotateTo = 0;
	private speed = 0;
	private speedClock: THREE.Clock;
	private speedDelta = 0.007;
	private speedRotate = 0.08;

	hooks = {
		onStartMove: new Hook(0),
		onStopMove: new Hook(0),
		onClick: new Hook<(rotate: number, x: number, y: number) => void>(3),
	};

	delete(){
		window.removeEventListener("click", this.functionOnClick);
		window.removeEventListener("keyup", this.functionOnKeyUp);
		window.removeEventListener("keydown", this.functionOnKeyDown);
		this.myThree.renderHook.removeSubscriber(this.functionOnRenderFrame);
		this.myThree.restartRender();
	}

	setSpeed(speed: number){
		this.computed.diagonalSpeed = speed * speed / Math.sqrt(Math.pow(speed, 2) * 2);
		this.speed = speed;
	}

	private onClick(event: MouseEvent){
		if(!this.character) throw new Error();
		const x = event.x - this.computed.midWidth;
		const y = event.y - this.computed.midHeight;

		let rotate = Math.atan(x / y);
		if(y >= 0) rotate += Math.PI;

		this.hooks.onClick.launchSubscriber(rotate, x, y);

		if(controllerUtils.isInActions(this.pressedActions)) return;
		this.rotateTo = rotate + this.computed.gapRotate;
	}

	private onKeyDown(event: KeyboardEvent){
		const key = event.key as keyof typeof this.keyToActions;
		const action = this.keyToActions[key] as keyof typeof this.pressedActions | undefined;
		if(action === undefined || this.pressedActions[action] === true) return;
		this.pressedActions[action] = true;

		if(controllerUtils.hasContradictoryActions(this.pressedActions)){
			this.hooks.onStopMove.launchSubscriber();
			return;
		}

		this.hooks.onStartMove.launchSubscriber();
		this.rotateTo = controllerUtils.getRotateFromPressedActions(this.pressedActions) || this.rotateTo;
	}

	private onKeyUp(event: KeyboardEvent){
		const key = event.key as keyof typeof this.keyToActions;
		const action = this.keyToActions[key] as keyof typeof this.pressedActions | undefined;
		if(action === undefined) return;
		this.pressedActions[action] = false;

		if(!controllerUtils.isInActions(this.pressedActions)){
			this.hooks.onStopMove.launchSubscriber();
		}
		else {

			if(controllerUtils.hasContradictoryActions(this.pressedActions)){
				this.hooks.onStopMove.launchSubscriber();
				return;
			}

			this.hooks.onStartMove.launchSubscriber();
			this.rotateTo = controllerUtils.getRotateFromPressedActions(this.pressedActions) || this.rotateTo;
		}
	}

	private onRenderFrame(){
		const delta = this.speedClock.getDelta();
		const {up, down, left, right} = this.pressedActions;

		if(up && !down && !left && !right) this.character.X += controllerUtils.computedSpeed(delta, this.speed, this.speedDelta);
		else if(!up && down && !left && !right) this.character.X -= controllerUtils.computedSpeed(delta, this.speed, this.speedDelta);
		else if(!up && !down && !left && right) this.character.Z += controllerUtils.computedSpeed(delta, this.speed, this.speedDelta);
		else if(!up && !down && left && !right) this.character.Z -= controllerUtils.computedSpeed(delta, this.speed, this.speedDelta);

		else if(up && !down && !left && right){
			this.character.X += controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
			this.character.Z += controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
		}
		else if(up && !down && left && !right){
			this.character.X += controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
			this.character.Z -= controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
		}

		else if(!up && down && !left && right){
			this.character.X -= controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
			this.character.Z += controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
		}
		else if(!up && down && left && !right){
			this.character.X -= controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
			this.character.Z -= controllerUtils.computedSpeed(delta, this.computed.diagonalSpeed, this.speedDelta);
		}

		this.myThree.setCameraPosition(this.character.X, this.character.Z);

		if(this.rotateTo !== this.character.ROTATE){
			const dif = this.character.ROTATE - this.rotateTo;
			let coef = 1;
			if(dif > 0) coef = -1;
			if(dif % Math.PI < dif) coef *= -1;
			else if(dif < 0 && dif % Math.PI > dif) coef *= -1;

			const speed = controllerUtils.computedSpeed(delta, this.speedRotate, this.speedDelta) * coef;

			if(Math.abs(this.rotateTo - this.character.ROTATE) < speed) this.character.ROTATE = this.rotateTo;
			else {
				let add = this.character.ROTATE + speed;
				if(add < 0) add += this.computed.oneRad;
				this.character.ROTATE = add % this.computed.oneRad;
			}
		}
	}
}


export const controllerUtils = {
	getRotateFromPressedActions: (pressedActions: Controller["pressedActions"]) => {
		const {up, down, left, right} = pressedActions;
		if(up && !down && !left && !right) return Math.PI / 2;
		else if(!up && down && !left && !right) return 3 * Math.PI / 2;
		else if(!up && !down && !left && right) return 2 * Math.PI;
		else if(!up && !down && left && !right) return Math.PI;
		else if(up && !down && !left && right) return Math.PI / 4;
		else if(up && !down && left && !right) return 3 * Math.PI / 4;
		else if(!up && down && !left && right) return 7 * Math.PI / 4;
		else if(!up && down && left && !right) return 5 * Math.PI / 4;
	},
	isInActions: (pressedActions: Controller["pressedActions"]) => {
		return !(
			pressedActions.up === false &&
			pressedActions.down === false &&
			pressedActions.right === false &&
			pressedActions.left === false
		); 
	},
	computedSpeed: (delta: number, speed: number, deltaRef: number) => delta * speed / deltaRef,
	hasContradictoryActions: (pressedActions: Controller["pressedActions"]) => {
		const {up, down, left, right} = pressedActions;
		if(up && down) return true;
		else if(left && right) return true;
		else return false;
	},
};
