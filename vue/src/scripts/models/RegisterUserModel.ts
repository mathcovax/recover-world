import {CharacterSkinnedMesh, FBXLoaderMotion} from "@MYTHREE";
import {UserModel} from "./UserModel";

export class RegisterUserModel extends UserModel{
	static loadersMotion = [new FBXLoaderMotion("standing_2", "/assets/models/user/motion/standing_2.fbx")];

	get loadersMotion(){
		return RegisterUserModel.loadersMotion;
	}

	setColor(meshName: string, colors: Record<string, string>){
		if(!this.model) throw new Error();

		const mesh = this.model.children.find(c => c.name === meshName) as CharacterSkinnedMesh | undefined;
		if(!mesh) throw new Error();

		const materials = mesh.material instanceof Array ? mesh.material : [mesh.material];

		Object.entries(colors).forEach(([materialName, color]) => {
			if(!color) return;
			const material = materials.find(m => m.name === materialName);
			if(!material) throw new Error();

			material.color.set(color);
			material.shininess = 0;
		});
	}
}
