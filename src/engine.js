// Role descriptions are shared with the private identity screen.
export const roles = {
  Devil: {
    team: 'evil',
    description: 'Agree on one living player to attack each night. Win when devils equal or outnumber the town.',
  },
  Oracle: {
    team: 'town',
    description: 'Each night, learn whether one other living player is a devil.',
  },
  Warden: {
    team: 'town',
    description: 'Protect one living player each night, including yourself. You cannot protect the same player on consecutive nights.',
  },
  Villager: {
    team: 'town',
    description: 'Listen, question, and vote. Find every devil to win.',
  },
};

// Create shared game state. A supplied random function allows repeatable shuffles.
export function createGame(names, random = Math.random) {
  if (names.length < 5 || names.length > 12) {
    throw new Error('Your table needs 5–12 players.');
  }

  const uniqueNames = new Set(names.map((name) => name.toLowerCase()));
  if (uniqueNames.size !== names.length) {
    throw new Error('Each player needs a unique name.');
  }

  // Larger tables have three devils; every table has one oracle and one warden.
  const devilCount = names.length >= 9 ? 3 : 2;
  const deck = ['Oracle', 'Warden', ...Array(devilCount).fill('Devil')];
  while (deck.length < names.length) {
    deck.push('Villager');
  }

  // Fisher–Yates shuffle: swap each card with a random card at or before it.
  for (let index = deck.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }

  return {
    players: names.map((name, id) => ({
      id,
      name,
      role: deck[id],
      alive: true,
    })),
    round: 1,
    previousProtection: null,
    attack: null,
    protection: null,
    log: [],
    winner: null,
  };
}

// Only living players count toward victory. Null means the game continues.
export function checkWinner(game) {
  const livingPlayers = game.players.filter((player) => player.alive);
  const devilCount = livingPlayers.filter((player) => player.role === 'Devil').length;
  const townCount = livingPlayers.length - devilCount;

  if (devilCount === 0) return 'town';
  if (devilCount >= townCount) return 'evil';
  return null;
}

// Apply night choices, update the game in place, and return a public report.
export function resolveNight(game) {
  const victim = game.players.find((player) => player.id === game.attack);
  if (victim && victim.alive && game.attack !== game.protection) {
    victim.alive = false;
  }

  const message = victim && !victim.alive
    ? `${victim.name} was found dead at dawn.`
    : 'Dawn breaks. Everyone survived the night.';

  // The UI excludes this player from protection choices on the next night.
  game.previousProtection = game.protection;
  game.log.unshift(`Day ${game.round}: ${message}`);
  game.winner = checkWinner(game);
  return message;
}

// Votes contain player IDs, with null representing an abstention.
export function resolveVote(game, votes) {
  const counts = new Map();
  votes.filter((vote) => vote !== null).forEach((vote) => {
    counts.set(vote, (counts.get(vote) || 0) + 1);
  });

  // Each entry is [player ID, vote count], ordered from most votes to fewest.
  const ranked = [...counts].sort((first, second) => second[1] - first[1]);
  let message = 'The vote was tied or everyone abstained. No one was exiled.';

  // A sole leader is exiled, even without a majority of all votes.
  if (ranked.length && (ranked.length === 1 || ranked[0][1] > ranked[1][1])) {
    const [playerId, voteCount] = ranked[0];
    const player = game.players.find((player) => player.id === playerId);
    player.alive = false;
    message = `${player.name} was exiled with ${voteCount} vote${voteCount === 1 ? '' : 's'}. Their role remains secret.`;
  }

  game.log.unshift(`Day ${game.round}: ${message}`);
  game.winner = checkWinner(game);
  return message;
}
