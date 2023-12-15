import {FBXLoader} from "@S/myThree/3DLoader";
import {MyThree} from "@S/myThree/MyThree";

export const models = await FBXLoader({
	y_bot: "/models/y_bot.fbx",
});
	
export const motions = await FBXLoader({
	standing: "/motions/Standing_W_Briefcase_Idle.fbx",
	run: "/motions/Slow_Run.fbx",
});

export const map = await MyThree.loadGLTF("/models/floor.glb");
