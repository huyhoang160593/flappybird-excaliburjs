import { Actor, type ActorArgs, Vector, randomIntInRange } from "excalibur";
import { Resources } from "../resources";

const {
	images: { Pipe },
} = Resources;

export class PipeActor extends Actor {
	constructor(orientation: "top" | "bottom", yPos: number) {
		const actorArgs: ActorArgs = {
			x: 0,
			y: orientation === "top" ? yPos + Pipe.height : yPos,
			width: Pipe.width,
			height: Pipe.height,
			anchor: Vector.Zero,
			z: randomIntInRange(1, 3),
		};
		super(actorArgs);
		this.graphics.add(Pipe.toSprite());
	}
}
