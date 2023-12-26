import {CharacterModel} from "@S/myThree/CharacterModel";
import {FBXLoaderModels, FBXLoaderMotions} from "@S/myThree/FBXLoader";

export class UserModel extends CharacterModel<
	{
		body: "eyes" | "skin" | "underwear" | "eyebrow" | "lips",
		haire: "haire",
	}
>{
	private static loadersModel = {
		body: [
			new FBXLoaderModels("/models/user/body/body_1.fbx"),
			// new FBXLoaderModels("/models/user/body/2.fbx"),
		],
		haire: [
			new FBXLoaderModels("/models/user/haire/haire_1.fbx"),
			// new FBXLoaderModels("/models/user/haire/2.fbx"),
		],
	};
	private static loadersMotion = [
		new FBXLoaderMotions("run", "/models/user/motion/run.fbx"),
		new FBXLoaderMotions("standing", "/models/user/motion/standing.fbx"),
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
