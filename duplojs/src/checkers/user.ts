import {createTypeInput, GetTypeInput} from "@duplojs/type-input";
import {prisma, Prisma} from "@plugins/prisma";

export const userInput = createTypeInput()
.add<"id", string>()
.add<"email", string>()
.add<"pseudo", string>()
.add<"emailOrPseudo", {email: string, pseudo: string}>()
.build();

export const checkUserExist = duplo.createChecker(
	"CheckUserExist",
	{
		async handler({name: key, value}: GetTypeInput<typeof userInput>, output, options){
			let where: Prisma.UserWhereInput;
			if(key === "emailOrPseudo"){
				where = {
					OR: [
						{
							email: {
								equals: value.email,
								mode: "insensitive"
							}
						},
						{
							pseudo: {
								equals: value.pseudo,
								mode: "insensitive"
							}
						}
					]
				};
			}
			else if(["email", "pseudo"].includes(key)){
				where = {
					[key]: {
						equals: value,
						mode: "insensitive"
					}
				};
			}
			else {
				where = {[key]: value};
			}

			const user = await prisma.user.findFirst({
				where,
				select: {
					id: options.id,
					email: options.email,
					pseudo: options.pseudo,
					models: options.models,
					colors: options.colors,
				}
			});

			if(!user) return output("user.notfound", null);
			else return output("user.exist", user);
		},
		outputInfo: ["user.exist", "user.notfound"],
		options: {
			id: true,
			email: false,
			pseudo: false,
			models: false,
			colors: false,
		}
	}
);
