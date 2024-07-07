import { Actor, type Engine, randomIntInRange, Vector } from "excalibur";
import engineOptions from "../config/engine-options.config";
import { Resources } from "../resources";
import { GROUND_SCROLL_SPEED } from "../constansts/common.constants";

const {
	resolution: { height: screenHeight, width: screenWidth },
} = engineOptions;
const {
	images: { Pipe },
} = Resources;

export class PipeActor extends Actor {
	constructor() {
    const randomY = randomIntInRange(screenHeight / 2, screenHeight - 10);
		super({
			x: screenWidth,
			y: randomY,
			width: Pipe.width,
			height: Pipe.height,
			anchor: Vector.Zero,
      z: randomIntInRange(1, 3),
		});
		this.graphics.add(Pipe.toSprite());
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);

		this.pos.x -= (delta / 1000) * GROUND_SCROLL_SPEED;
	}
}
