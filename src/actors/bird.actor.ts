import { Actor, type Engine, Keys, Vector, clamp } from "excalibur";
import engineOptions from "../config/engine-options.config";
import { Resources } from "../resources";
import type { PipeActor } from "./pipe.actor";

const {
	resolution: { height: screenHeight, width: screenWidth },
} = engineOptions;
const {
	images: { Bird, Ground },
} = Resources;

export class BirdActor extends Actor {
	gravity = 20;
	dy = 0;

	constructor() {
		super({
			x: screenWidth / 2 - Bird.width / 2,
			y: screenHeight / 2 - Bird.height / 2,
			width: Bird.width,
			height: Bird.height,
			anchor: Vector.Zero,
			z: 2,
		});
		this.graphics.add(Bird.toSprite());
	}

	onInitialize(engine: Engine): void {
		super.onInitialize(engine);
		engine.input.pointers.primary.on("down", () => {
			this.dy = -5;
		});
	}
	/**
	 * AABB collision that expects a pipe, which will have an X and Y and reference
	 * global pipe width and height values.
	 */
	collides(pipe: PipeActor) {
		/**
		 * the 2's are left and top offsets
		 * the 4's are right and bottom offsets
		 * both offsets are used to shrink the bounding box to give the player
		 * a little bit of leeway with the collision
		 */
		if (
			this.pos.x + 2 + (this.width - 4) >= pipe.pos.x &&
			this.pos.x + 2 <= pipe.pos.x + pipe.width &&
			this.pos.y + 2 + (this.height - 4) >= pipe.pos.y &&
			this.pos.y + 2 <= pipe.pos.y + pipe.height
		) {
			return true;
		}
		return false;
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);
		this.dy += (this.gravity * delta) / 1000;

		const newBirdPosition = this.pos.y + this.dy;

		if (engine.input.keyboard.wasPressed(Keys.Space)) {
			this.dy = -5;
		}

		this.pos.y = clamp(
			newBirdPosition,
			0,
			screenHeight - Bird.height - Ground.height,
		);
	}
}
