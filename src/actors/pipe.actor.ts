import { Actor, type ActorArgs, randomIntInRange, Vector } from "excalibur";
import engineOptions from "../config/engine-options.config";
import { Resources } from "../resources";

const {
	resolution: { width: screenWidth },
} = engineOptions;
const {
	images: { Pipe },
} = Resources;

export class PipeActor extends Actor {
	constructor(orientation: "top" | "bottom", yPos: number) {
		const actorArgs: ActorArgs = {
			x: screenWidth,
			y: orientation === "top" ? yPos + Pipe.height : yPos,
			width: Pipe.width,
			height: Pipe.height,
			anchor: Vector.Zero,
			scale: new Vector(1, orientation === "top" ? -1 : 1),
			z: randomIntInRange(1, 3),
		};
		super(actorArgs);
		this.graphics.add(Pipe.toSprite());
	}
}
