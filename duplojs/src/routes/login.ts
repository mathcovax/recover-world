import {OkHttpException, UnauthorizedHttpException} from "@duplojs/http-exception";
import {duplo} from "../../main";
import {zod} from "@duplojs/duplojs";
import {checkGoogleIdToken} from "../checkers/token";

export default (path: string) => 
	duplo
	.declareRoute("POST", path)
	.extract({
		body: zod.string(),
	})
	.check(
		checkGoogleIdToken,
		{
			input: p => p("body"),
			result: "token.google.valid",
			catch: (res, info) => {
				throw new UnauthorizedHttpException(info);
			},
			indexing: "userEmail"
		}
	)
	.handler(({d: {userEmail}}) => {
		throw new OkHttpException("user.info", userEmail);
	});
