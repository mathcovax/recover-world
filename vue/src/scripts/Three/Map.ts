import {Character} from "./Character";
import {MyThree} from "./MyThree";

// update de toute les animation des character sur la scene
// const dt = this.clock.getDelta();
// this.characters.forEach(character => character.getMixer().update(dt)); 


export class Map{
	constructor(myThree: MyThree){
		this.myThree = myThree;
		
		this.myThree.renderHook.addSubscriber(this.characterMotion.bind(this));
	}

	private myThree: MyThree;
	private characters: Character[] = [];

	addCharacter(character: Character){
		this.characters.push(character);
		this.myThree.addModel(character);
	}

	removeCharacter(character: Character){
		const index = this.characters.findIndex(char => char === character);
		if(index !== -1) this.characters.slice(index, 1);
		this.myThree.removeModel(character);
	}

	private characterMotion(){
		this.characters.forEach(char => {
			const dt = char.clock.getDelta();
			char.getMixer().update(dt);
		});
	}

	init(){
		this.myThree.initRender();
	}
}
