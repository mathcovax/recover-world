export const env = zod.object({
	ENVIRONMENT: zod.enum(["DEV", "PROD"]),

	ACCESS_TOKEN_KEY: zod.string(),
	ACCESS_TOKEN_EXPIRES_IN: zod.coerce.string(),

	POSTGRES_HOST: zod.string(),
	POSTGRES_PORT: zod.coerce.number(),
	POSTGRES_DB: zod.string(),
	POSTGRES_USER: zod.string(), 
	POSTGRES_PASSWORD: zod.string(),
	DATABASE_URL: zod.string(),

	MONGO_INITDB_ROOT_USERNAME: zod.string(),
	MONGO_INITDB_ROOT_PASSWORD: zod.string(), 
	MONGO_HOST: zod.string(),
	MONGO_PORT: zod.coerce.number(),
	MONGO_DB: zod.string(),
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

	MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
	MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
	MONGO_HOST: process.env.MONGO_HOST,
	MONGO_PORT: process.env.MONGO_PORT,
	MONGO_DB: process.env.MONGO_DB,
});
