import {checkGoogleIdToken} from "@checkers/token";
import {checkUserExist, userInput} from "@checkers/user";
import {prisma} from "@plugins/prisma";
import {generateAccessToken} from "@plugins/token";
import {colorsZod, modelsZod} from "@utils/userModel";

/* PATH : /register */
export default (path: string) => 
	duplo
	.declareRoute("POST", path)
	.extract({
		body: {
			pseudo: zod.string().min(3).max(30).toLowerCase(),
			models: modelsZod,
			colors: colorsZod,
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
	.handler(async({d: {pseudo, userEmail: email, colors, models}}) => {
		const {id: userId} = await prisma.user.create({
			data: {
				pseudo,
				email,
				colors: JSON.stringify(colors),
				models: JSON.stringify(models),
			},
			select: {
				id: true
			}
		});

		const accessToken = generateAccessToken(userId);

		throw new OkHttpException("user.register", accessToken);
	});
