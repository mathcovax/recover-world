import jwt from "jsonwebtoken";
import {checkGoogleIdToken} from "@checkers/token";
import {checkUserExist, userInput} from "@checkers/user";

/* PATH : /login */
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
	.check(
		checkUserExist,
		{
			input: p => userInput.email(p("userEmail")),
			result: "user.exist",
			catch: (res, info) => {
				throw new NotFoundHttpException(info);
			},
			indexing: "user",
		}
	)
	.handler(({d: {user}}) => {
		const accessToken = jwt.sign(user.id, process.env.TOKEN_KEY as string);

		throw new OkHttpException("user.login", accessToken);
	});
