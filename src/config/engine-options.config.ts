import type { EngineOptions } from "excalibur";

const engineOptions = {
	// set the viewport dimensions
	viewport: {
		width: 1280,
		height: 720,
	},
	// set the resolution
	resolution: {
		width: 512,
		height: 288,
	},
	// no more blurriness or filtering, important of a nice crisp, 2D look
	antialiasing: false,
} as const satisfies EngineOptions;

export default engineOptions;
