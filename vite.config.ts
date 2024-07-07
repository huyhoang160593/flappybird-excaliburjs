import { defineConfig } from "vite";

export default defineConfig({
	base: "./",
	build: {
		/**
		 * Make sure all your assets are present in the dist folder and not in a separate folder. This
		 * will prevent errors when you try to publish to itch.io.
		 */
		assetsDir: "",
	},
});
