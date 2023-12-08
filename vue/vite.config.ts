import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {resolve} from "path";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(), 
		AutoImport({
			dirs: [
				"./src/stores/**",
				"./src/router/**",
				"./src/components/**",
			],
			imports: [
				"vue",
				"vue-router",
			]
		})
	],
	resolve: {
		alias: {
			"@P": resolve(__dirname, "src", "pages"),
			"@C": resolve(__dirname, "src", "components"),
			"@S": resolve(__dirname, "src", "scripts"),
		}
	},
	build: {
		outDir: "../dist",
		emptyOutDir: true,
	},
	server: {
		port: 80,
		host: "0.0.0.0"
	}
});
