import { Player } from "./player.js";
import { Gametype } from "./gametype.js";
import { State } from "./state.js";

export interface Room {
	id: string;
	gametype: Gametype;
	players: Player[];
	state: State[];
	addPlayers: (player: Player) => void;
}
