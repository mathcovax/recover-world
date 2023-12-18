import Duplo from "@duplojs/duplojs";
import duploDestructFloor from "@duplojs/destruct-floor";
import duploHttpException from "@duplojs/http-exception";
import duploRoutesDirectory, {matchScriptFile} from "@duplojs/routes-directory";
import dotenv from "dotenv";

dotenv.config({path: "../.env.local"});
dotenv.config({path: "../.env"});

export const duplo = Duplo({
	port: 80, 
	host: "0.0.0.0", 
	environment: process.env.ENVIRONMENT as "DEV" | "PROD",
});

duplo.use(duploDestructFloor);
duplo.use(duploHttpException);

import("./global").then(async() => {
	await duplo.use(
		duploRoutesDirectory, 
		{
			path: "./src/routes",
			matchs: [matchScriptFile(p => import(p))]
		}
	);
	
	duplo.launch();
});
