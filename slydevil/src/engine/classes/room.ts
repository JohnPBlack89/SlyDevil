import { Player } from "./player";
import { Gametype } from "../types/gametype";
import { State } from "../types/state.js";
import { Goal } from "../types/goal.js";
import { v7 } from "uuid";
import { live } from "../states/live";
import { dead } from "../statuses/dead";

export class Room {
	private _id: string;
	private _gametype: Gametype;
	private _players: Player[];
	private _states: State[];
	private _goals: Goal[];

	constructor(gametype: Gametype) {
		this._id = Room.generateId();
		this._gametype = gametype;
		this._players = [];
		this._states = [];
		this._goals = [];
	}

	private static generateId(): string {
		console.log("Need to add validation to ensure no duplicates");
		return v7().toString();
	}

	addPlayer(player: Player) {
		if (
			this._players.findIndex((existingPlayer) => existingPlayer == player) !=
			null
		)
			throw Error("Can't add player again");

		this._players.push(player);
	}
	removePlayer(player: Player) {
		if (
			this._players.findIndex((existingPlayer) => existingPlayer == player) ==
			null
		)
			throw Error("Can't find player");

		this._players = this._players.filter(
			(currentPlayer) => currentPlayer != player,
		);
	}
	get players(): readonly Player[] {
		return this._players;
	}

	startGame() {
		if (this._gametype.minPlayers <= this.players.length)
			throw new Error("Room doesn't have enough players for this gametype");

		if (this._gametype.minPlayers <= this.players.length)
			throw new Error("Room has too many players for this gametype");

		if (
			this._states.findIndex((currentStates) => currentStates == live) != null
		)
			throw new Error("Game has already started");

		this._states.push(live);
	}
	endGame() {
		if (
			this._states.findIndex((currentStates) => currentStates == dead) != null
		)
			throw new Error("Game has already ended");

		if (
			this._states.findIndex((currentStates) => currentStates == live) == null
		)
			throw new Error("Game hasn't started yet");

		this._states = this._states.filter((state) => state !== live);

		this._states.push(dead);
	}
	checkWinners() {
		for (var goal of this._goals) if (goal.met(this)) this.endGame();
	}
}
