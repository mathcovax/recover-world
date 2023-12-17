import {ZodError, ZodType} from "zod";

export function toFormRules(zod: ZodType){
	return [
		(value: unknown) => {
			try {
				zod.parse(value);
				return true;
			} catch (error){
				return (error as ZodError).errors[0].message;
			}
		}
	];
}
