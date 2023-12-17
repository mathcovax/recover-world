import {duplo} from "../../main";
import jwt from "jsonwebtoken";
import {firebaseAuth} from "../plugins/firebase";

export const checkAccessToken = duplo.createChecker(
	"CheckAccessToken",
	{
		handler(value: string, output, options){
			try {
				const content = jwt.verify(value, process.env.TOKEN_KEY as string) as string;
				return output("token.valid", content);
			}
			catch {
				return output("token.invalid", null);
			}
		},
		outputInfo: ["token.valid", "token.invalid"]
	}
);

export const checkGoogleIdToken = duplo.createChecker(
	"CheckGoogleIdToken",
	{
		async handler(value: string, output, options){
			try {
				const {email} = await firebaseAuth.verifyIdToken(value);
				if(!email){
					throw new Error("Missing email.");
				}
				return output("token.google.valid", email);
			  } catch (e){
				console.log(e);
				return output("token.google.invalid", null);
			  }
		},
		outputInfo: ["token.google.valid", "token.google.invalid"]
	}
);
