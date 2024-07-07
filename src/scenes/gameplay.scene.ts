import { type Engine, Scene } from "excalibur";
import { BackgroundActor } from "../actors/background.actor";
import engineOptions from "../config/engine-options.config";
import { Resources } from "../resources";
import { BirdActor } from "../actors/bird.actor";

const {
	resolution: { height: screenHeight, width: screenWidth },
} = engineOptions;

const {
	images: { Background, Ground },
} = Resources;

export class GameplayScene extends Scene {
	public readonly name = "gameplay";

	onInitialize(_engine: Engine): void {
		this.add(new BackgroundActor(0, 0, Background, 30, 413));
		this.add(new BackgroundActor(0, screenHeight - 16, Ground, 60, screenWidth));
    this.add(new BirdActor())
	}
}
