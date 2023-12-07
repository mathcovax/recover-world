import {Character} from "./Three/Character";
import {MyThree} from "./Three/MyThree";

export class Controller{
	constructor(myThree: MyThree, character?: Character){
		this.myThree = myThree;
		this.character = character;

		this.math = {
			midWidth: this.myThree.width / 2,
			midHeight: this.myThree.height / 2,
			correctAngle: Math.PI / 4,
		};
	}

	private myThree: MyThree;
	private character?: Character;
	private functionOnMouseMove?: Controller["onMouseMove"];

	private math: {
		midWidth: number,
		midHeight: number,
		correctAngle: number,
	};

	disable(){
		if(!this.functionOnMouseMove) throw new Error();
		
		window.removeEventListener("mousemove", this.functionOnMouseMove);
		this.functionOnMouseMove = undefined;
	}

	enable(){
		if(this.functionOnMouseMove) throw new Error();
		if(!this.character) throw new Error();

		this.functionOnMouseMove = this.onMouseMove.bind(this);
		window.addEventListener("mousemove", this.functionOnMouseMove);
	}

	setCharacter(character?: Character){
		if(this.functionOnMouseMove) throw new Error();
		this.character = character;
	}

	private onMouseMove(event: MouseEvent){
		if(!this.character) throw new Error();
		const x = event.x - this.math.midWidth;
		const y = event.y - this.math.midHeight;

		let rotate = Math.atan(x / y);
		if(y >= 0) rotate += Math.PI;
		
		this.character.setRotate(rotate + this.math.correctAngle);
	}
}
