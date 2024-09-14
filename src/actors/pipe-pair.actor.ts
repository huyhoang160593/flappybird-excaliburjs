import { Actor, type Engine } from "excalibur";
import engineOptions from "../config/engine-options.config";
import { GROUND_SCROLL_SPEED } from "../constansts/common.constants";
import { Resources } from "../resources";
import { PipeActor } from "./pipe.actor";

const GAP_HEIGHT = 90;
const {
	resolution: { width: screenWidth },
} = engineOptions;
const {
	images: { Pipe },
} = Resources;

export class PipePair extends Actor {
	public pipes: Record<"top" | "bottom", PipeActor> | undefined;
	public posX = screenWidth + 32;

	constructor(yPos: number) {
		super({
			x: 0,
			y: yPos,
		});
		this.pipes = {
			top: new PipeActor("top", yPos),
			bottom: new PipeActor("bottom", yPos + GAP_HEIGHT + Pipe.height),
		};

		for (const pipe of Object.values(this.pipes)) {
			this.addChild(pipe);
		}
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);
		if (this.posX > -Pipe.width) {
			this.posX -= GROUND_SCROLL_SPEED * (delta / 1000);
			if (!this.pipes) return;
			this.pipes.top.pos.x = this.posX;
			this.pipes.bottom.pos.x = this.posX;
		} else {
			this.kill();
		}
	}
}
