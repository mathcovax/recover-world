import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string){
	return jwt.sign(
		{userId}, 
		env.ACCESS_TOKEN_KEY, 
		{expiresIn: env.ACCESS_TOKEN_EXPIRES_IN}
	);
}

export function verifAccessToken(token?: string){
	const {userId} = jwt.verify(
		token || "", 
		env.ACCESS_TOKEN_KEY
	) as any;

	return userId as string;
}
