import { Player } from "./player.js";
import { Game } from "./game.js";
export interface Room {
	game: Game;
	players: Player[];
}
