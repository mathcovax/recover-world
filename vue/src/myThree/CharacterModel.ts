import * as THREE from "three";
import {FBXLoaderModel, FBXLoaderMotion} from "./loader";

export type CharacterSkinnedMesh = THREE.SkinnedMesh<
	THREE.BufferGeometry, 
	THREE.MeshPhongMaterial[] | THREE.MeshPhongMaterial
>;

export abstract class CharacterModel<
	models extends {body: string} & Record<string, string> = any, 
	keysModel extends keyof models = keyof models
>{
	protected model?: THREE.Group;
	private body?: CharacterSkinnedMesh;
	
	constructor(
		private indexModels: Record<keysModel, number>,
		private colors?: {
			[pm in keysModel]?: {
				[pc in models[pm]]?: string
			}
		}
	){}

	private async loadFBX(indexModels: Record<keysModel, number>){
		const queue: Promise<void>[] = [];
		const models: Record<string, THREE.Group> = {};
		const motions: THREE.AnimationClip[] = [];
		
		Object.entries(this.loadersModel).forEach(([key, value]) => {
			queue.push((async() => {
				if(
					value instanceof Array &&
					value[indexModels[key as keysModel]]
				){
					const loader = value[indexModels[key as keysModel]] as FBXLoaderModel;
					models[key] = await loader.load();
				}
				else {
					throw new Error();
				}
				
			})());
		});
		(this.loadersMotion || []).forEach((value) => {
			queue.push((async() => {
				motions.push(await value.load());
			})());
		});

		await Promise.all(queue);

		return {models, motions};
	}

	private addObject(mesh: CharacterSkinnedMesh, colors?: Partial<Record<string, string>>){
		if(!this.model || !this.body) throw new Error();
		
		mesh.skeleton = this.body.skeleton;
		mesh.parent = this.model;
		const materials = mesh.material instanceof Array ? mesh.material : [mesh.material];

		Object.entries(colors || {}).forEach(([materialName, color]) => {
			if(!color) return;
			const material = materials.find(m => m.name === materialName);
			if(!material) throw new Error();

			material.color.set(color);
			material.shininess = 0;
		});

		this.model.add(mesh);
	}

	addModel(mesh: CharacterSkinnedMesh, colors?: Partial<Record<string, string>>){
		
		
	}

	async load(){
		const {models, motions} = await this.loadFBX(this.indexModels);
		
		this.model = new THREE.Group();
		this.model.animations.push(...motions);
		
		if(!models.body) throw new Error();
		const body = models.body.children.find(v => v.name.toLowerCase() === "body") as CharacterSkinnedMesh | undefined;
		const armature = models.body.children.find(v => v.name.toLowerCase() === "armature");
		
		if(!body || !armature) throw new Error();
		this.model.add(armature);
		armature.parent = this.model;
		this.body = body;

		Object.entries(models).forEach(([key, value]) => {
			const mesh = value.children.find(v => v.name === key) as CharacterSkinnedMesh | undefined;
			if(!mesh) throw new Error();

			this.addObject(mesh, this.colors?.[key as keysModel]);
		});

		await this.onloadModel(this.model);
	}

	getModel(){
		if(!this.model) throw new Error();
		return this.model;
	}

	protected abstract onloadModel(model: THREE.Group): void | Promise<void>;

	protected abstract get loadersModel(): Record<keysModel, FBXLoaderModel[]>;
	protected abstract get loadersMotion():  FBXLoaderMotion[];

}
