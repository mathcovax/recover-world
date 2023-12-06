import {zod} from "@duplojs/duplojs";
import {OkHttpException, BadRequestHttpException} from "@duplojs/http-exception";
import {duplo} from "../../main";
import {isOdd} from "../checkers/isOdd";
	
duplo
.declareRoute("GET", "/")
.extract(
	{
		query: {
			number: zod.coerce.number(),
		}
	},
	(response) => {
		throw new BadRequestHttpException("error", "Need query number !");
	}
)
.check(
	isOdd,
	{
		input: (pickup) => pickup("number"),
		result: "odd",
		catch: (response, info, data) => {
			throw new BadRequestHttpException(info, data + " is not odd !");
		},
		indexing: "result"
	}
)
.handler(({d: {result}}) => {
	throw new OkHttpException("success", result + " is odd !");
});

