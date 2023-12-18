import {zod} from "@duplojs/duplojs";
import {duplo} from "../main";
import * as he from "@duplojs/http-exception";

//@ts-ignore
global.zod = zod;
//@ts-ignore
global.duplo = duplo;
Object.entries(he).forEach(([key, value]) => {
	//@ts-ignore
	global[key] = value;
});
