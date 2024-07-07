import { Actor, Vector } from "excalibur";
import { Resources } from "../resources";
import engineOptions from "../config/engine-options.config";

const {
	resolution: { height: screenHeight, width: screenWidth },
} = engineOptions;
const {
	images: { Bird },
} = Resources;
export class BirdActor extends Actor {
	constructor() {
		super({
			x: screenWidth / 2 - Bird.width / 2,
			y: screenHeight / 2 - Bird.height / 2,
			width: Bird.width,
			height: Bird.height,
			anchor: Vector.Zero,
		});
    this.graphics.add(Bird.toSprite());
	}
}
