import {FBXLoader} from "@S/myThree/FBXLoader";

export const models = await FBXLoader({
	y_bot: "/models/Y_Bot.fbx"
});
	
export const motions = await FBXLoader({
	standing: "/motions/Standing_W_Briefcase_Idle.fbx",
	run: "/motions/Slow_Run.fbx",
});
