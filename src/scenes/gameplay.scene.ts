import { type Engine, randomIntInRange, Scene, Timer } from "excalibur";
import { BackgroundActor } from "../actors/background.actor";
import { BirdActor } from "../actors/bird.actor";
import engineOptions from "../config/engine-options.config";
import { Resources } from "../resources";
import { GROUND_SCROLL_SPEED } from "../constansts/common.constants";
import { PipePair } from "../actors/pipe-pair.actor";

const {
	resolution: { height: screenHeight, width: screenWidth },
} = engineOptions;

const {
	images: { Background, Ground, Pipe },
} = Resources;

export class GameplayScene extends Scene {
	public readonly name = "gameplay";
  public lastY = -Pipe.height + randomIntInRange(1, 80) + 20;

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
        // modify the last Y coordinate we placed so pipe gaps aren't too far apart
        // no higher than 10 pixels below the top edge of the screen,
        // and no lower than a gap length (90 pixels) from the bottom
        const y = Math.max(-Pipe.height + 10, Math.min(this.lastY + randomIntInRange(-20,20), screenHeight - 90 - Pipe.height));
        this.lastY = y;
        this.add(new PipePair(y))
				},
			}),
		);
    this.timers[0].start();

		this.add(new BirdActor());
	}
  update(engine: Engine, delta: number): void {
    super.update(engine, delta);
    console.log(this.actors.length)
  }
}
