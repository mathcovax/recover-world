import {OkHttpException} from "@duplojs/http-exception";
import {mustBeConnected} from "../security/connected";

export default (path: string) => 
	mustBeConnected({pickup: ["userId"]})
	.declareRoute("GET", path)
	.handler(({d: {userId}}) => {
		throw new OkHttpException("user.info");
	});
