import { roles, createGame, resolveNight, resolveVote } from "./engine.js";
const app = document.querySelector("#app");
let game,
	phase = "setup",
	queue = [],
	cursor = 0,
	revealed = false,
	result = "",
	votes = [];
const escape = (s) =>
	String(s).replace(
		/[&<>"']/g,
		(c) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				c
			],
	);
const button = (text, action, cls = "primary") =>
	`<button class="${cls}" data-action="${action}">${text}</button>`;
function setup() {
	phase = "setup";
	app.innerHTML = `<section class="hero"><div><span class="eyebrow">THE NIGHT HAS SECRETS.</span><h1>A familiar face.<br>A <em>hidden devil.</em></h1><p>Somewhere around your table, evil is hiding in plain sight. Read the room, follow your instincts, and decide who makes it to dawn.</p><div class="tags"><span>Secret identities</span><span>Real conversations</span><span>System-led story</span></div></div><div class="moon-scene" aria-hidden="true"><div class="orbit"></div><div class="moon"></div><span class="star s1">✦</span><span class="star s2">✧</span><span class="scene-label">WHEN DARKNESS FALLS, THE GAME BEGINS</span></div></section><div class="columns"><section class="panel"><div class="panel-top"><h2>Gather your table</h2><span class="number">01 / SETUP</span></div><p class="subtle">One device. A room full of suspects. The system takes care of the rest.</p><label class="label" for="names">Who's playing?</label><textarea id="names" placeholder="Alex&#10;Jordan&#10;Sam&#10;Morgan&#10;Riley&#10;Casey" maxlength="600"></textarea><p class="hint">Enter one name per line. 5–12 players, with unique names.</p><div id="error" class="error" role="alert"></div>${button("Create a game <span>↗</span>", "start", "primary wide")}<div class="bottom-note"><span>◈</span><span>Roles are revealed privately. Pass the device when prompted.<br>Closing or refreshing this page ends the game.</span></div></section><aside class="panel"><div class="panel-top"><h2>Every face has a role</h2><span class="number">THE CAST</span></div>${[
		["Devil", "☾", "EVIL"],
		["Oracle", "✧", "TOWN"],
		["Warden", "◇", "TOWN"],
		["Villager", "♙", "TOWN"],
	]
		.map(
			([name, icon, team]) =>
				`<div class="role ${team === "EVIL" ? "evil" : ""}"><div class="role-icon">${icon}</div><div><b>${name}</b><small>${team}</small><p>${name === "Devil" ? "Hide in the crowd. Choose a victim each night." : name === "Oracle" ? "See beyond appearances. Investigate a player." : name === "Warden" ? "Stand between the town and the darkness." : "You have your voice. Make it count."}</p></div></div>`,
		)
		.join("")}</aside></div>`;
}
function shell(content) {
	app.innerHTML = `<div class="game-heading"><div><span class="eyebrow">${phase === "reveal" ? "THE INTRODUCTION" : phase === "night" ? "AFTER DARK" : "THE TOWN GATHERS"}</span><h1>${phase === "reveal" ? "Meet your secret self" : phase === "night" ? `Night ${game.round}` : phase === "end" ? "The truth comes out" : `Day ${game.round}`}</h1></div>${button("End game", "reset", "secondary")}</div><div class="game-grid"><section class="panel stage" aria-live="polite">${content}</section><aside><section class="panel"><div class="panel-top"><h3>Your table</h3><span class="number">${game.players.filter((p) => p.alive).length} ALIVE</span></div>${game.players.map((p) => `<div class="player ${p.alive ? "" : "dead"}"><span>${escape(p.name)}</span><span class="pill">${phase === "end" ? p.role : p.alive ? "In the game" : "Dead"}</span></div>`).join("")}</section><section class="panel" style="margin-top:20px"><h3>The story so far</h3>${game.log.length ? game.log.map((l) => `<div class="log">${escape(l)}</div>`).join("") : '<p class="subtle">The town is quiet. For now.</p>'}</section></aside></div>`;
}
function targets(players, skip = false) {
	return `<div class="targets">${players.map((p) => `<button class="target" data-target="${p.id}">${escape(p.name)} <span style="float:right">↗</span></button>`).join("")}${skip ? '<button class="target" data-target="skip">Abstain</button>' : ""}</div>`;
}
function render() {
	if (game.winner) {
		phase = "end";
		shell(
			`<span class="eyebrow">GAME OVER</span><div class="winner">${game.winner === "town" ? "Town wins." : "Devils win."}</div><p>${game.winner === "town" ? "Every devil has been found. The town can sleep again." : "The devils have taken control of the town."}</p><p>All identities are now revealed at the table.</p>${button("Play again", "again")}`,
		);
		return;
	}
	if (phase === "day") {
		shell(
			`<span class="eyebrow">DAWN REPORT</span><h2 style="margin-top:16px">${escape(result)}</h2><p>Everyone opens their eyes. Share what you learned, ask difficult questions, and make your case.</p><div class="private">Living players each cast one private vote. The player with the most votes is exiled. A tie means no exile. Dead players may listen, but cannot speak or vote. Roles stay secret until the game ends.</div>${button("Open the vote", "vote")}`,
		);
		return;
	}
	if (phase === "verdict") {
		shell(
			`<span class="eyebrow">THE TOWN HAS SPOKEN</span><h2 style="margin-top:16px">${escape(result)}</h2><p>Night is approaching. All players close their eyes while the device passes around the table.</p>${button("Begin the next night", "next-night")}`,
		);
		return;
	}
	const actor = queue[cursor];
	if (!revealed) {
		shell(
			`<span class="eyebrow">PRIVATE TURN · ${cursor + 1} OF ${queue.length}</span><h2 style="margin-top:20px">Pass the device to ${escape(actor.name)}.</h2><p>Everyone else looks away. Make sure only ${escape(actor.name)} can see the screen before continuing.</p><div class="private">${phase === "night" ? "Keep your turn quiet and your expression unreadable. Every living player receives a turn to conceal who has a night ability." : "Your identity is secret. Do not say your role aloud."}</div>${button("I'm " + escape(actor.name) + " · Continue", "reveal")}`,
		);
		return;
	}
	if (phase === "reveal") {
		const allies = game.players.filter(
			(p) => p.role === "Devil" && p.id !== actor.id,
		);
		shell(
			`<span class="eyebrow">YOUR SECRET IDENTITY</span><h2 style="font-size:42px;margin-top:20px">${actor.role}</h2><p>${roles[actor.role].description}</p>${actor.role === "Devil" ? `<div class="private">Your fellow devils: ${allies.map((p) => escape(p.name)).join(", ")}. Quietly coordinate a target. The first living devil chooses the pack's attack each night.</div>` : ""}${button("Hide role & pass device", "advance")}`,
		);
		return;
	}
	if (phase === "vote") {
		shell(
			`<span class="eyebrow">PRIVATE BALLOT</span><h2 style="margin-top:20px">${escape(actor.name)}, who do you suspect?</h2><p>Choose someone to exile, or abstain. Your vote stays private.</p>${targets(
				game.players.filter((p) => p.alive),
				true,
			)}`,
		);
		return;
	}
	if (result) {
		shell(
			`<span class="eyebrow">FOR YOUR EYES ONLY</span><h2 style="margin-top:20px">${escape(result)}</h2><p>Keep this information to yourself until discussion begins.</p>${button("Hide & pass device", "advance")}`,
		);
		return;
	}
	let eligible = game.players.filter((p) => p.alive),
		prompt = "The town sleeps.",
		description =
			"You have no action tonight. Take a quiet moment before passing the device.";
	if (
		actor.role === "Devil" &&
		actor.id === queue.find((p) => p.role === "Devil")?.id
	) {
		eligible = eligible.filter((p) => p.role !== "Devil");
		prompt = "Choose the pack’s victim.";
		description =
			"Your fellow devils share this attack. Choose one player to kill tonight.";
	} else if (actor.role === "Oracle") {
		eligible = eligible.filter((p) => p.id !== actor.id);
		prompt = "Whose identity will you investigate?";
		description = "The system will tell you whether your target is a devil.";
	} else if (actor.role === "Warden") {
		eligible = eligible.filter((p) => p.id !== game.previousProtection);
		prompt = "Who will you protect?";
		description =
			"You may protect yourself, but cannot protect the same person two nights in a row.";
	} else eligible = [];
	shell(
		`<span class="eyebrow">${actor.role.toUpperCase()} · PRIVATE TURN</span><h2 style="margin-top:20px">${prompt}</h2><p>${description}</p>${eligible.length ? targets(eligible) : button("Finish my turn", "advance")}`,
	);
}
function night() {
	phase = "night";
	queue = game.players.filter((p) => p.alive);
	cursor = 0;
	revealed = false;
	result = "";
	game.attack = null;
	game.protection = null;
	render();
}
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
app.addEventListener("click", (e) => {
	const el = e.target.closest("button");
	if (!el) return;
	const action = el.dataset.action;
	if (action === "start") {
		try {
			const names = document
				.querySelector("#names")
				.value.split("\n")
				.map((n) => n.trim())
				.filter(Boolean);
			if (names.some((n) => n.length > 24))
				throw new Error("Keep names to 24 characters or fewer.");
			game = createGame(names);
			phase = "reveal";
			queue = game.players;
			cursor = 0;
			revealed = false;
			render();
		} catch (err) {
			document.querySelector("#error").textContent = err.message;
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
		queue = game.players.filter((p) => p.alive);
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
	if (el.dataset.target !== undefined) {
		const id = el.dataset.target === "skip" ? null : Number(el.dataset.target);
		if (phase === "vote") {
			votes.push(id);
			advance();
		} else {
			const actor = queue[cursor];
			if (actor.role === "Oracle") {
				result = `${game.players[id].name} ${game.players[id].role === "Devil" ? "is a devil." : "is not a devil."}`;
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
