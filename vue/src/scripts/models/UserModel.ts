import {CharacterModel, FBXLoaderModel, FBXLoaderMotion} from "@MYTHREE";

export class UserModel extends CharacterModel<
	{
		body: "eyes" | "skin" | "underwear" | "eyebrow" | "lips",
		hair: "hair",
	}
>{
	static loadersModel = {
		body: [new FBXLoaderModel("/assets/models/user/body/body_1.fbx")],
		hair: [
			new FBXLoaderModel("/assets/models/user/hair/hair_1.fbx"),
			new FBXLoaderModel("/assets/models/user/hair/hair_2.fbx"),
		],
	};
	static loadersMotion = [
		new FBXLoaderMotion("run", "/assets/models/user/motion/run.fbx"),
		new FBXLoaderMotion("standing_1", "/assets/models/user/motion/standing_1.fbx"),
		new FBXLoaderMotion("standing_2", "/assets/models/user/motion/standing_2.fbx"),
		new FBXLoaderMotion("sword_attack_1", "/assets/models/user/motion/sword_attack_1.fbx"),
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
