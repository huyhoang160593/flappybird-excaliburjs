import { type Engine, Scene } from "excalibur";
import { BackgroundActor } from "../actors/background.actor";
import { Resources } from "../resources";
import engineOptions from "../config/engine-options.config";

const {
	resolution: { height: screenHeight },
} = engineOptions;
const {
	images: { Background, Ground },
} = Resources;

export class GameplayScene extends Scene {
	public readonly name = "gameplay";

	onInitialize(_engine: Engine): void {
		this.add(new BackgroundActor(0, 0, Background));
		this.add(new BackgroundActor(0, screenHeight - 16, Ground));
	}
}
