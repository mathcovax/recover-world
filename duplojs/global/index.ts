import {zod} from "@duplojs/duplojs";
import * as he from "@duplojs/http-exception";
import {duplo} from "../main";
import {env} from "../src/plugins/env";

//@ts-ignore
global.zod = zod;
//@ts-ignore
global.duplo = duplo;
//@ts-ignore
global.env = env;
Object.entries(he).forEach(([key, value]) => {
	//@ts-ignore
	global[key] = value;
});
