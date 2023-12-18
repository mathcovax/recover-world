import jwt from "jsonwebtoken";
import {checkGoogleIdToken} from "@checkers/token";
import {checkUserExist, userInput} from "@checkers/user";
import {prisma} from "@plugins/prisma";

/* PATH : /register */
export default (path: string) => 
	duplo
	.declareRoute("POST", path)
	.extract({
		body: {
			pseudo: zod.string().min(3).max(30),
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
			},
			indexing: "userEmail"
		}
	)
	.check(
		checkUserExist,
		{
			input: p => userInput.emailOrPseudo({
				email: p("userEmail"),
				pseudo: p("pseudo"),
			}),
			result: "user.notfound",
			catch: (res, info, data, p) => {
				throw new ConflictHttpException(
					data.email === p("userEmail") ?
						"user.alreadyExist" :
						"user.pseudo.alreadyUse"
				);
			},
			options: {
				email: true,
				id: false,
			}
		}
	)
	.handler(async({d: {pseudo, userEmail: email}}) => {
		const {id: userId} = await prisma.user.create({
			data: {
				pseudo,
				email,
			},
			select: {
				id: true
			}
		});

		const accessToken = jwt.sign(userId, process.env.TOKEN_KEY as string);

		throw new OkHttpException("user.create", accessToken);
	});
