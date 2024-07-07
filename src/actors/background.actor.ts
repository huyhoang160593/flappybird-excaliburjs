import { Actor, type Engine, type ImageSource, Vector } from "excalibur";

export class BackgroundActor extends Actor {

	scrollXPosition = 0;
	scrollSpeed = 0;
	loopingPoint = 0;

	constructor(
		x: number,
		y: number,
		imageSource: ImageSource,
		scrollSpeed = 30,
		loopingPoint = 0,
	) {
		super({
			x,
			y,
			width: imageSource.width,
			height: imageSource.height,
			anchor: Vector.Zero,
		});
		this.scrollSpeed = scrollSpeed;
		this.loopingPoint = loopingPoint;

		this.graphics.add(imageSource.toSprite());
	}

	update(engine: Engine, delta: number): void {
		super.update(engine, delta);
    this.updateBackgroundPosition(delta);
	}

	private updateBackgroundPosition(delta: number) {
		if (!this.graphics.current) return;
		if (!this.scrollSpeed || !this.loopingPoint) return;
		this.scrollXPosition =
			(this.scrollXPosition + this.scrollSpeed * (delta / 1000)) %
			this.loopingPoint;

		this.graphics.current.transform.setPosition(-this.scrollXPosition, 0);
	}
}
