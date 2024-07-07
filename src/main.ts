import { Engine } from "excalibur";
import { loader } from "./resources";
import engineOptions from "./config/engine-options.config";
import { GameplayScene } from "./scenes/gameplay.scene";

class Game extends Engine {
	constructor() {
		super(engineOptions);
	}
	initialize() {
		const gameplayScene = new GameplayScene();
		this.addScene(gameplayScene.name, gameplayScene);

		this.start(loader).then(() => {
			this.goToScene(gameplayScene.name);
		});
	}
}

export const game = new Game();
game.initialize();
