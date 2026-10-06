import { roles, createGame, resolveNight, resolveVote } from "./engine.js";
import type { GameState, Player, Role, Vote } from "./engine.js";

// Fail clearly when the current screen is missing a required HTML element.
function requireElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Missing page element: ${selector}`);
  return element;
}
const app = requireElement<HTMLElement>("#app");
type Phase = "setup" | "reveal" | "night" | "day" | "vote" | "verdict" | "end";

// The UI follows setup → reveal → night → day → vote → verdict, until a winner.
// Game screens are only entered after createGame succeeds in the setup form.
let game: GameState;
let phase: Phase = "setup";
let queue: Player[] = []; // Players waiting for a private turn in the current phase.
let cursor = 0; // Index of the player whose turn is being shown.
let revealed = false; // Hide private content until the player confirms their name.
let result = ""; // Public reports or the oracle's private investigation result.
let votes: Vote[] = []; // Player IDs selected on ballots; null means abstention.

function currentActor(): Player {
  const actor = queue[cursor];
  if (!actor) throw new Error('There is no player waiting for a private turn.');
  return actor;
}

// Escape player names and reports before inserting them into HTML.
const escape = (text: string) =>
  String(text).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[
        character
      ] ?? character,
  );
const button = (text: string, action: string, className = "primary") =>
  `<button class="${className}" data-action="${action}">${text}</button>`;

let viewMounted = false;

// Move focus to the new heading after navigation so screen readers follow the view.
function finishView() {
  const heading = app.querySelector<HTMLElement>('.stage h2') || app.querySelector<HTMLElement>('h1');
  if (heading) {
    heading.tabIndex = -1;
    if (viewMounted) heading.focus();
  }
  viewMounted = true;
}

// Render the player-name form and the role overview.
function setup() {
  phase = "setup";
  const roleSummaries: Record<Role, string> = {
    Devil: "Hide in the crowd. Choose a victim each night.",
    Oracle: "See beyond appearances. Investigate a player.",
    Warden: "Stand between the town and the darkness.",
    Villager: "You have your voice. Make it count.",
  };

  app.innerHTML = `<section class="hero">` +
    `<div>` +
    `<span class="eyebrow">THE NIGHT HAS SECRETS.</span>` +
    `<h1>A familiar face.<br>A <em>hidden devil.</em></h1>` +
    `<p>Somewhere around your table, evil is hiding in plain sight. Read the room, follow your instincts, and decide who makes it to dawn.</p>` +
    `<div class="tags">` +
    `<span>Secret identities</span>` +
    `<span>Real conversations</span>` +
    `<span>System-led story</span></div></div>` +
    `<div class="moon-scene" aria-hidden="true">` +
    `<div class="orbit"></div>` +
    `<div class="moon"></div>` +
    `<span class="star s1">✦</span>` +
    `<span class="star s2">✧</span>` +
    `<span class="scene-label">WHEN DARKNESS FALLS, THE GAME BEGINS</span></div></section>` +
    `<div class="columns">` +
    `<section class="panel">` +
    `<div class="panel-top">` +
    `<h2>Gather your table</h2>` +
    `<span class="number">01 / SETUP</span></div>` +
    `<p class="subtle">One device. A room full of suspects. The system takes care of the rest.</p>` +
    `<label class="label" for="names">Who's playing?</label>` +
    `<textarea id="names" placeholder="Alex&#10;Jordan&#10;Sam&#10;Morgan&#10;Riley&#10;Casey" maxlength="600" aria-describedby="names-hint error"></textarea>` +
    `<p id="names-hint" class="hint">Enter one name per line. 5–12 players, with unique names.</p>` +
    `<div id="error" class="error" role="alert"></div>${button("Create a game <span>↗</span>", "start", "primary wide")}<div class="bottom-note">` +
    `<span>◈</span>` +
    `<span>Roles are revealed privately. Pass the device when prompted.<br>Closing or refreshing this page ends the game.<br>Using a screen reader? Use headphones for private turns.</span></div></section>` +
    `<aside class="panel">` +
    `<div class="panel-top">` +
    `<h2>Every face has a role</h2>` +
    `<span class="number">THE CAST</span></div>${([
    ["Devil", "☾", "EVIL"],
    ["Oracle", "✧", "TOWN"],
    ["Warden", "◇", "TOWN"],
    ["Villager", "♙", "TOWN"],
  ] as const)
    .map(
      ([name, icon, team]) =>
        `<div class="role ${team === "EVIL" ? "evil" : ""}">` +
          `<div class="role-icon" aria-hidden="true">${icon}</div>` +
          `<div>` +
          `<b>${name}</b>` +
          `<small>${team}</small>` +
          `<p>${roleSummaries[name]}</p></div></div>`,
    )
    .join("")}</aside></div>`;
  finishView();
}

// Wrap each game screen with the shared heading, player list, and story log.
function shell(content: string) {
  let eyebrow = "THE TOWN GATHERS";
  let heading = `Day ${game.round}`;
  if (phase === "reveal") {
    eyebrow = "THE INTRODUCTION";
    heading = "Meet your secret self";
  } else if (phase === "night") {
    eyebrow = "AFTER DARK";
    heading = `Night ${game.round}`;
  } else if (phase === "end") {
    heading = "The truth comes out";
  }

  const livingCount = game.players.filter((player) => player.alive).length;
  const playerRows = game.players.map((player) => {
    // Identities remain private until the final screen, even for dead players.
    const status = phase === "end"
      ? player.role
      : player.alive ? "In the game" : "Dead";

    return `<div class="player ${player.alive ? "" : "dead"}">` +
      `<span>${escape(player.name)}</span>` +
      `<span class="pill">${status}</span></div>`;
  }).join("");

  const storyLog = game.log.length
    ? game.log.map((entry) => `<div class="log">${escape(entry)}</div>`).join("")
    : '<p class="subtle">The town is quiet. For now.</p>';

  app.innerHTML = `<div class="game-heading">` +
    `<div>` +
    `<span class="eyebrow">${eyebrow}</span>` +
      `<h1>${heading}</h1></div>` +
    button("End game", "reset", "secondary") +
    `</div>` +
      `<div class="game-grid">` +
    `<section class="panel stage">${content}</section>` +
      `<aside>` +
    `<section class="panel">` +
      `<div class="panel-top">` +
    `<h2>Your table</h2>` +
      `<span class="number">${livingCount} ALIVE</span></div>` +
    `${playerRows}</section>` +
    `<section class="panel" style="margin-top:20px">` +
      `<h2>The story so far</h2>` +
    `${storyLog}</section></aside></div>`;
  finishView();
}

// Build target choices, optionally including an abstention button for ballots.
function targets(players: Player[], allowAbstention = false) {
  const choices = players.map((player) =>
    `<button class="target" data-target="${player.id}">` +
    `${escape(player.name)} <span style="float:right">↗</span></button>`
  ).join("");
  const abstention = allowAbstention
    ? '<button class="target" data-target="skip">Abstain</button>'
    : "";

  return `<div class="targets">${choices}${abstention}</div>`;
}

// Render the current phase, keeping private content behind the pass-device screen.
function render() {
  if (game.winner) {
    phase = "end";
    shell(
      `<span class="eyebrow">GAME OVER</span>` +
        `<h2 class="winner">${game.winner === "town" ? "Town wins." : "Devils win."}</h2>` +
        `<p>${game.winner === "town" ? "Every devil has been found. The town can sleep again." : "The devils have taken control of the town."}</p>` +
        `<p>All identities are now revealed at the table.</p>${button("Play again", "again")}`,
    );
    return;
  }
  if (phase === "day") {
    shell(
      `<span class="eyebrow">DAWN REPORT</span>` +
        `<h2 style="margin-top:16px">${escape(result)}</h2>` +
        `<p>Everyone opens their eyes. Share what you learned, ask difficult questions, and make your case.</p>` +
        `<div class="private">Living players each cast one private vote. The player with the most votes is exiled. A tie means no exile. Dead players may listen, but cannot speak or vote. Roles stay secret until the game ends.</div>${button("Open the vote", "vote")}`,
    );
    return;
  }
  if (phase === "verdict") {
    shell(
      `<span class="eyebrow">THE TOWN HAS SPOKEN</span>` +
        `<h2 style="margin-top:16px">${escape(result)}</h2>` +
        `<p>Night is approaching. All players close their eyes while the device passes around the table.</p>${button("Begin the next night", "next-night")}`,
    );
    return;
  }
  const actor = currentActor();
  // Each private turn starts with a handoff, before showing identities or actions.
  if (!revealed) {
    shell(
      `<span class="eyebrow">PRIVATE TURN · ${cursor + 1} OF ${queue.length}</span>` +
        `<h2 style="margin-top:20px">Pass the device to ${escape(actor.name)}.</h2>` +
        `<p>Everyone else looks away. Make sure only ${escape(actor.name)} can see the screen before continuing.</p>` +
        `<div class="private">${phase === "night" ? "Keep your turn quiet and your expression unreadable. Every living player receives a turn to conceal who has a night ability." : "Your identity is secret. Do not say your role aloud."}</div>${button("I'm " + escape(actor.name) + " · Continue", "reveal")}`,
    );
    return;
  }
  if (phase === "reveal") {
    const allies = game.players.filter(
      (player) => player.role === "Devil" && player.id !== actor.id,
    );
    shell(
      `<span class="eyebrow">YOUR SECRET IDENTITY</span>` +
        `<h2 style="font-size:42px;margin-top:20px">${actor.role}</h2>` +
        `<p>${roles[actor.role].description}</p>${actor.role === "Devil" ? `<div class="private">Your fellow devils: ${allies.map((player) => escape(player.name)).join(", ")}. Quietly coordinate a target. The first living devil chooses the pack's attack each night.</div>` : ""}${button("Hide role & pass device", "advance")}`,
    );
    return;
  }
  if (phase === "vote") {
    shell(
      `<span class="eyebrow">PRIVATE BALLOT</span>` +
        `<h2 style="margin-top:20px">${escape(actor.name)}, who do you suspect?</h2>` +
        `<p>Choose someone to exile, or abstain. Your vote stays private.</p>${targets(
        game.players.filter((player) => player.alive),
        true,
      )}`,
    );
    return;
  }
  if (result) {
    shell(
      `<span class="eyebrow">FOR YOUR EYES ONLY</span>` +
        `<h2 style="margin-top:20px">${escape(result)}</h2>` +
        `<p>Keep this information to yourself until discussion begins.</p>${button("Hide & pass device", "advance")}`,
    );
    return;
  }
  // Start with the quiet turn used by villagers and non-leading devils.
  let eligible = game.players.filter((player) => player.alive);
  let prompt = "The town sleeps.";
  let description =
    "You have no action tonight. Take a quiet moment before passing the device.";
  // Only the first living devil chooses the shared attack.
  if (
    actor.role === "Devil" &&
    actor.id === queue.find((player) => player.role === "Devil")?.id
  ) {
    eligible = eligible.filter((player) => player.role !== "Devil");
    prompt = "Choose the pack’s victim.";
    description =
      "Your fellow devils share this attack. Choose one player to kill tonight.";
  } else if (actor.role === "Oracle") {
    eligible = eligible.filter((player) => player.id !== actor.id);
    prompt = "Whose identity will you investigate?";
    description = "The system will tell you whether your target is a devil.";
  } else if (actor.role === "Warden") {
    eligible = eligible.filter((player) => player.id !== game.previousProtection);
    prompt = "Who will you protect?";
    description =
      "You may protect yourself, but cannot protect the same person two nights in a row.";
  } else {
    eligible = [];
  }
  shell(
    `<span class="eyebrow">${actor.role.toUpperCase()} · PRIVATE TURN</span>` +
      `<h2 style="margin-top:20px">${prompt}</h2>` +
      `<p>${description}</p>${eligible.length ? targets(eligible) : button("Finish my turn", "advance")}`,
  );
}

// Start a fresh night. Every living player gets a turn to conceal active roles.
function night() {
  phase = "night";
  queue = game.players.filter((player) => player.alive);
  cursor = 0;
  revealed = false;
  result = "";
  game.attack = null;
  game.protection = null;
  render();
}

// Hide private information and move to the next player or resolve the phase.
function advance() {
  cursor++;
  revealed = false;
  result = "";
  if (cursor >= queue.length) {
    if (phase === "reveal") {
      night();
      return;
    }
    if (phase === "night") {
      result = resolveNight(game);
      phase = "day";
    } else if (phase === "vote") {
      result = resolveVote(game, votes);
      phase = "verdict";
    }
  }
  render();
}

// One delegated listener handles buttons even after the view HTML is replaced.
app.addEventListener("click", (event) => {
  // Event targets may be non-element objects; narrow before calling closest.
  if (!(event.target instanceof Element)) return;
  const clickedButton = event.target.closest("button");
  if (!clickedButton) return;
  const action = clickedButton.dataset.action;
  if (action === "start") {
    try {
      const names = requireElement<HTMLTextAreaElement>("#names")
        .value.split("\n")
        .map((name) => name.trim())
        .filter(Boolean);
      if (names.some((name) => name.length > 24)) {
        throw new Error("Keep names to 24 characters or fewer.");
      }
      game = createGame(names);
      phase = "reveal";
      queue = game.players;
      cursor = 0;
      revealed = false;
      render();
    } catch (error) {
      const namesField = requireElement<HTMLTextAreaElement>('#names');
      namesField.setAttribute('aria-invalid', 'true');
      requireElement<HTMLElement>('#error').textContent = error instanceof Error
        ? error.message : 'Unable to create the game.';
      namesField.focus();
    }
    return;
  }
  if (action === "reset") {
    if (confirm("End this game? All roles and progress will be lost.")) setup();
    return;
  }
  if (action === "again") {
    setup();
    return;
  }
  if (action === "reveal") {
    revealed = true;
    render();
    return;
  }
  if (action === "advance") {
    advance();
    return;
  }
  if (action === "vote") {
    phase = "vote";
    queue = game.players.filter((player) => player.alive);
    cursor = 0;
    revealed = false;
    votes = [];
    render();
    return;
  }
  if (action === "next-night") {
    game.round++;
    night();
    return;
  }
  if (clickedButton.dataset.target !== undefined) {
    const id = clickedButton.dataset.target === "skip" ? null : Number(clickedButton.dataset.target);
    if (phase === "vote") {
      votes.push(id);
      advance();
    } else {
      const actor = currentActor();
      // Abstention belongs to ballots; night actions must name a living player.
      const target = game.players.find((player) => player.id === id && player.alive);
      if (!target) return;
      // Investigation is shown privately; attacks and protection resolve at dawn.
      if (actor.role === "Oracle") {
        result = `${target.name} ${target.role === "Devil" ? "is a devil." : "is not a devil."}`;
        render();
      } else {
        if (actor.role === "Devil") game.attack = id;
        if (actor.role === "Warden") game.protection = id;
        advance();
      }
    }
  }
});
setup();

// Clear name-validation feedback as the user edits the form.
app.addEventListener('input', (event) => {
  if (event.target instanceof HTMLTextAreaElement && event.target.id === 'names') {
    event.target.removeAttribute('aria-invalid');
    requireElement<HTMLElement>('#error').textContent = '';
  }
});
