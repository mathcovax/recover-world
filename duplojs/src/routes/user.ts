import {NotFoundHttpException, OkHttpException} from "@duplojs/http-exception";
import {mustBeConnected} from "../security/connected";
import {checkUserExist, userInput} from "../checkers/user";

export default (path: string) => 
	mustBeConnected({pickup: ["userId"]})
	.declareRoute("GET", path)
	.check(
		checkUserExist,
		{
			input: p => userInput.id(p("userId")),
			result: "user.exist",
			catch: (res, info) => {
				throw new NotFoundHttpException(info);
			},
			indexing: "user"
		}
	)
	.handler(({d: {user}}) => {
		throw new OkHttpException("user.info", user);
	});
