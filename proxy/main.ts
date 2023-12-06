import Fastify from "fastify";
import fastifyProxy from "@fastify/http-proxy";
import fastifyStatic from "@fastify/static";
import dotenv from "dotenv";
import {resolve} from "path";
import {createReadStream} from "fs";

dotenv.config({path: "../.env.local"});
dotenv.config({path: "../.env"});

const fastify = Fastify();

fastify.register(fastifyProxy, {
	upstream: "http://duplojs:80",
	prefix: "/duplojs",
});

if(process.env.ENVIRONMENT === "DEV"){
	fastify.register(fastifyProxy, {
		upstream: "http://vue:80",
	});
}
else if(process.env.ENVIRONMENT === "PROD"){
	const distDir = resolve(__dirname, "..", "dist");
	const indexDistDir = resolve(distDir, "index.html");

	fastify.get("/", (req, res) => {
		res.header("content-type", "text/html; charset=utf-8");
		createReadStream(indexDistDir).pipe(res.raw);
	});

	fastify.register(fastifyStatic, {
		root: distDir,
	});
}

fastify.listen(
	{
		port: 80, 
		host: "0.0.0.0"
	}, 
	() => console.log("Proxy is ready !")
);
