# Sly Devil

An original, system-led social deduction game for 5–12 people in the same room. No human narrator is required: the browser assigns roles, handles private night turns, resolves attacks and protection, collects secret ballots, and checks victory conditions.

## Run

With Node.js 18 or newer (Node.js 22 is used in Docker), install the development tools with `npm ci`, then run `npm start` and visit http://localhost:3000. The start command compiles TypeScript before launching the server. The running app has no third-party runtime dependencies.

Run `npm test` to compile and run the game-rule checks, or `npm run typecheck` to check types without generating files.

## TypeScript development

Edit the `.ts` files in `src/` and `server.ts`. Shared game types live at the top of `src/engine.ts`; the browser's screen phases are defined in `src/app.ts`. Strict checking catches missing players, nullable choices, and unsafe DOM access.

`npm run build` writes JavaScript and source maps to `dist/`. Keep `.js` extensions in source imports, because Node and the browser load the compiled JavaScript. HTML and CSS remain in their original locations; the server maps browser URLs to the appropriate files.

For continuous compilation, run `npm run watch` in one terminal and `node dist/server.js` in another after the first build completes. Refresh the browser after editing client code; restart the server after editing `server.ts`. Generated files and `node_modules/` are ignored by Git. Commit `package-lock.json` so local and Docker builds use the same dependencies.

## Play

For a Docker-to-Render workflow without GitHub, see [DOCKER.md](DOCKER.md).

Enter player names, then pass the device for each private role reveal. Every living player receives a night turn so the turn order doesn't expose special roles. Two devils (three with 9–12 players) coordinate an attack; the first living devil selects it. The Oracle investigates, the Warden protects, and villagers wait. The system announces deaths at dawn without revealing roles.

Discuss aloud, then pass the device for private ballots. Each living player votes for a player or abstains. A unique highest vote total causes exile; ties cause no exile. Dead players cannot speak or vote. Town wins when all devils die. Devils win when they equal or outnumber the remaining town. All roles are revealed at game end.

## Prototype scope

This is a shared-device browser prototype. Game state stays in memory and refreshing ends the game. Privacy depends on players looking away: roles are present in browser memory and this is not a secure remote multiplayer implementation. There are no accounts, networking, computer players, or persistent games. A remote version needs server-owned secret state, private player sessions, reconnect support, and synchronized phase transitions.

The interface works without remote assets; optional Google Fonts fall back to system fonts.
