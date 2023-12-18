import {zod} from "@duplojs/duplojs";
import dotenv from "dotenv";

dotenv.config({path: "../.env.local"});
dotenv.config({path: "../.env"});

const env = zod.object({
	ENVIRONMENT: zod.enum(["DEV", "PROD"]),

	ACCESS_TOKEN_KEY: zod.string(),
	ACCESS_TOKEN_EXPIRES_IN: zod.coerce.string(),

	POSTGRES_HOST: zod.string(),
	POSTGRES_PORT: zod.coerce.number(),
	POSTGRES_DB: zod.string(),
	POSTGRES_USER: zod.string(), 
	POSTGRES_PASSWORD: zod.string(),
	DATABASE_URL: zod.string(),
})
.parse({
	ENVIRONMENT: process.env.ENVIRONMENT,

	ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
	ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,

	POSTGRES_HOST: process.env.POSTGRES_HOST,
	POSTGRES_PORT: process.env.POSTGRES_PORT,
	POSTGRES_DB: process.env.POSTGRES_DB,
	POSTGRES_USER: process.env.POSTGRES_USER, 
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
	DATABASE_URL: process.env.DATABASE_URL,
});

Object.entries(env).forEach(([key, value]) => {
	if(typeof env[key as keyof typeof env] === "string"){
		(env[key as keyof typeof env] as any) = (env[key as keyof typeof env] as string).replace(
			/\$\{([a-zA-Z0-9_]+)\}/g, 
			(match, g1) => `${env[g1 as keyof typeof env]}`
		) as string;
	}
});

export {env};
