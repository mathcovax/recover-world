import {checkAccessToken, checkGoogleIdToken} from "@checkers/token";
import {mustBeConnected} from "@security/connected";

duplo
.declareRoute("GET", "/entry/login")
.handler(() => {
	throw new NoContentHttpException("user.canEntry");
});

duplo
.declareRoute("GET", "/entry/register")
.extract({
	query: {
		googleIdToken: zod.string(),
	}
})
.check(
	checkGoogleIdToken,
	{
		input: p => p("googleIdToken"),
		result: "token.google.valid",
		catch: (res, info) => {
			throw new UnauthorizedHttpException(info);
		}
	}
)
.handler(() => {
	throw new NoContentHttpException("user.canEntry");
});

/* PATH : /entry* */
export default (path: string) => 
	mustBeConnected()
	.declareRoute("GET", path)
	.handler(() => {
		throw new NoContentHttpException("user.canEntry");
	});
