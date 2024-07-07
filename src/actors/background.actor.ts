import { Actor, type ImageSource, Vector } from "excalibur";

export class BackgroundActor extends Actor {
  constructor(x: number, y: number, imageSource: ImageSource) {
    super({
      x,
      y,
      width: imageSource.width,
      height: imageSource.height,
      anchor: Vector.Zero
    });
    this.graphics.add(imageSource.toSprite())
  }
}