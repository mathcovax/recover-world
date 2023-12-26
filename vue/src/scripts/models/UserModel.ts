import {CharacterModel} from "@S/myThree/CharacterModel";
import {FBXLoaderModels, FBXLoaderMotions} from "@S/myThree/FBXLoader";

export class UserModel extends CharacterModel<
	{
		body: "eyes" | "skin" | "underwear" | "eyebrow" | "lips",
		hair: "hair",
	}
>{
	private static loadersModel = {
		body: [new FBXLoaderModels("/models/user/body/body_1.fbx")],
		hair: [new FBXLoaderModels("/models/user/hair/hair_1.fbx")],
	};
	private static loadersMotion = [
		new FBXLoaderMotions("run", "/models/user/motion/run.fbx"),
		new FBXLoaderMotions("standing", "/models/user/motion/standing.fbx"),
		new FBXLoaderMotions("sword_attack_1", "/models/user/motion/sword_attack_1.fbx"),
	];

	get loadersModel(){
		return UserModel.loadersModel;
	}
	get loadersMotion(){
		return UserModel.loadersMotion;
	}

	protected onloadModel(model: THREE.Group): void | Promise<void>{
		model.scale.set(0.3, 0.3, 0.3);
	}
}
