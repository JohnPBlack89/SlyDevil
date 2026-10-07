import { Player } from "./player.js";
import { Game } from "./game.js";
import { State } from "./state.js";
export interface Room {
	id: string;
	game: Game;
	players: Player[];
	state: State[];
}
