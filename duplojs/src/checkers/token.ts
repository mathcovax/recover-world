import {firebaseAuth} from "@plugins/firebase";
import {verifAccessToken} from "@plugins/token";

export const checkAccessToken = duplo.createChecker(
	"CheckAccessToken",
	{
		handler(token: string | undefined, output, options){
			try {
				const userId = verifAccessToken(token);
				return output("token.valid", userId);
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
		async handler(token: string, output, options){
			try {
				const {email} = await firebaseAuth.verifyIdToken(token);
				if(!email){
					throw new Error("Missing email.");
				}
				return output("token.google.valid", email);
			  } catch (e){
				return output("token.google.invalid", null);
			  }
		},
		outputInfo: ["token.google.valid", "token.google.invalid"]
	}
);
