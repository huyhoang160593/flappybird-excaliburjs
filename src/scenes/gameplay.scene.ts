import { type Engine, Scene, Timer } from "excalibur";
import { BackgroundActor } from "../actors/background.actor";
import { BirdActor } from "../actors/bird.actor";
import engineOptions from "../config/engine-options.config";
import { Resources } from "../resources";
import { GROUND_SCROLL_SPEED } from "../constansts/common.constants";
import { PipeActor } from "../actors/pipe.actor";

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

		this.add(
			new BackgroundActor(
				0,
				screenHeight - 16,
				Ground,
				GROUND_SCROLL_SPEED,
				screenWidth,
        2
			),
		);

		this.addTimer(
			new Timer({
				interval: 2000,
				repeats: true,
				fcn: () => {
					this.add(new PipeActor());
				},
			}),
		);
    this.timers[0].start();

		this.add(new BirdActor());
	}
}
