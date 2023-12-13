import {zod} from "@duplojs/duplojs";
import {duplo} from "../../main";
import {checkAccessToken} from "../checkers/token";
import {ForbiddenHttpException} from "@duplojs/http-exception";

export const mustBeConnected = duplo.declareAbstractRoute("MustBeConnected")
.extract({
	headers: {
		access_token: zod.string()
	}
})
.check(
	checkAccessToken,
	{
		input: p => p("access_token"),
		result: "token.valid",
		catch: (res, info) => {
			throw new ForbiddenHttpException(info);
		},
		indexing: "userId"
	}
)
.build(["userId"]);
