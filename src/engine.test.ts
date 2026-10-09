/*
import test from "node:test";
import assert from "node:assert/strict";
import {
	createGame,
	checkWinner,
	resolveNight,
	resolveVote,
} from "./engine.js";
import type { GameState, Role } from "./engine.js";

// Assert fixture IDs exist before accessing them, including under strict indexing.
function playerAt(game: GameState, id: number) {
  const player = game.players[id];
  assert.ok(player, `Fixture must include player ${id}`);
  return player;
}

// Fixed roles let tests address players by ID without a random shuffle.
// By default, player 4 is attacked while player 3 is protected.
const fixture = (): GameState => ({
  players: (['Devil', 'Devil', 'Oracle', 'Warden', 'Villager', 'Villager', 'Villager'] satisfies Role[])
    .map((role, id) => ({
      id,
      name: `Player ${id}`,
      role,
      alive: true,
    })),
  round: 1,
  previousProtection: null,
  log: [],
  attack: 4,
  protection: 3,
  winner: null,
});

test('evil wins condition', () => {
  const 
})

test('setup balances roles and rejects invalid tables', () => {
  // Check every supported table size, regardless of shuffled role order.
  for (let playerCount = 5; playerCount <= 12; playerCount++) {
    const names = Array.from({ length: playerCount }, (_, index) => `P${index}`);
    const game = createGame(names);

    assert.equal(
      game.players.filter((player) => player.role === 'Devil').length,
      playerCount >= 9 ? 3 : 2,
    );
    assert.equal(game.players.filter((player) => player.role === 'Oracle').length, 1);
    assert.equal(game.players.filter((player) => player.role === 'Warden').length, 1);
  }

  assert.throws(() => createGame(['A', 'B']));
  // Names must be unique even when capitalization differs.
  assert.throws(() => createGame(['A', 'a', 'B', 'C', 'D']));
});

test('night protection prevents a kill and remembers the protected player', () => {
  const game = fixture();
  game.protection = 4;

  resolveNight(game);

  assert.equal(playerAt(game, 4).alive, true);
  assert.equal(game.previousProtection, 4);
});

test('unprotected attacks kill without exposing roles', () => {
  const game = fixture();

  const report = resolveNight(game);

  assert.equal(playerAt(game, 4).alive, false);
  assert.equal(report.includes('Villager'), false);
});

test('ties and abstentions do not exile anyone', () => {
  const game = fixture();

  resolveVote(game, [0, 1, null]);
  assert.ok(game.players.every((player) => player.alive));

  resolveVote(game, [null, null]);
  assert.ok(game.players.every((player) => player.alive));
});

test('unique plurality exiles its target', () => {
  const game = fixture();

  resolveVote(game, [0, 0, 1, null]);

  assert.equal(playerAt(game, 0).alive, false);
  assert.equal(game.winner, null);
});

test('town wins with no devils; devils win at parity', () => {
  const townVictory = fixture();
  playerAt(townVictory, 0).alive = false;
  playerAt(townVictory, 1).alive = false;
  assert.equal(checkWinner(townVictory), 'town');

  // Removing the villagers leaves two devils and two town players alive.
  const devilVictory = fixture();
  devilVictory.players.slice(4).forEach((player) => {
    player.alive = false;
  });
  assert.equal(checkWinner(devilVictory), 'evil');
});
*/
