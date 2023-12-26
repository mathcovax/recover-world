import {GLTF} from "three/examples/jsm/Addons.js";
import {MyThree} from ".";

export async function FBXLoader<
	modelsObject extends Record<string, string>
>(models: modelsObject){
	const result: Record<string, any>  = {};
	const task: Promise<void>[] = [];
	Object.entries(models).forEach(([key, value]) => {
		task.push((async() => {
			result[key] = await MyThree.loadFBX(value);
		})());
	});
	await Promise.all(task);

	return result as any as Record<keyof modelsObject, THREE.Group<THREE.Object3DEventMap>>;
}

export async function GLTFLoader<
	modelsObject extends Record<string, string>
>(models: modelsObject){
	const result: Record<string, any>  = {};
	const task: Promise<void>[] = [];
	Object.entries(models).forEach(([key, value]) => {
		task.push((async() => {
			result[key] = await MyThree.loadGLTF(value);
		})());
	});
	await Promise.all(task);

	return result as any as Record<keyof modelsObject, GLTF>;
}

