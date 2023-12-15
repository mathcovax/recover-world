import {createTypeInput, GetTypeInput} from "@duplojs/type-input";
import {duplo} from "../../main";

export const userInput = createTypeInput()
.add<"id", number>()
.add<"email", string>()
.build();

export const checkUserExist = duplo.createChecker(
	"CheckUserExist",
	{
		async handler({name, value}: GetTypeInput<typeof userInput>, output, options){

		},
		outputInfo: ["user.exist", "user.notfound"]
	}
);
