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
						{email: value.email},
						{pseudo: value.pseudo}
					]
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
		}
	}
);
