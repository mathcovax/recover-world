import {MyThree} from "./MyThree";

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
