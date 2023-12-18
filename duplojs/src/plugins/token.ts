import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string){
	return jwt.sign(
		{userId}, 
		process.env.ACCESS_TOKEN_KEY as string, 
		{expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
	);
}

export function verifAccessToken(token: string){
	const {userId} = jwt.verify(
		token, 
		process.env.ACCESS_TOKEN_KEY as string
	) as any;

	return userId as string;
}
