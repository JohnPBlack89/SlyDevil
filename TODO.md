# Sly Devil development checklist

Mark completed tasks with `[x]`. Add notes or links to commits beneath a task when
they help explain what is finished or what remains.

## First multiplayer milestone

- [ ] Two players on separate devices can join the same room and see the lobby update.

Get this working before implementing the full multiplayer game. It depends on
the frontend lobby, backend room/session handling, and synchronized updates.

## 1. Organize the project

- [x] Push the existing Git repository to GitHub.
- [x] Set up TypeScript.
- [x] Finish Engine drawing
- [x] Define types for players, roles, rooms, and game phases.
- [x] Separate shared types, game rules, frontend, and backend.
- [x] Keep the existing engine tests passing throughout the migration.

## 2. Build the Expo frontend

- [ ] Create an Expo app targeting web, iOS, and Android.
- [ ] Rebuild the current interface as reusable components.
- [ ] Add room creation and joining screens.
- [ ] Add a lobby screen showing connected players.
- [ ] Add private role, night action, voting, and results screens.
- [ ] Test layouts and accessibility in browsers and on phones.

## 3. Create the multiplayer backend

- [ ] Move authoritative game state and rule execution onto the Node server.
- [ ] Add room creation and joining with room codes.
- [ ] Give each player a private session.
- [ ] Send each player only the information they are allowed to see.
- [ ] Validate actions and votes on the server.
- [ ] Synchronize lobby changes and game turns across devices.
- [ ] Support disconnects and reconnects.

## 4. Connect MongoDB Atlas

- [ ] Create a database user for the app.
- [ ] Add the MongoDB driver to the backend.
- [ ] Configure `MONGODB_URI` as a server environment variable; keep credentials out of source control.
- [ ] Allow local development connections in Atlas.
- [ ] Save and load rooms and game state.
- [ ] Verify that games can resume after a server restart.

## 5. Deploy to Render

- [ ] Update the Dockerfile to install dependencies and build the necessary files.
- [ ] Test the container locally.
- [ ] Deploy the backend as a Render Web Service.
- [ ] Configure server environment variables.
- [ ] Allow Render's outbound IP ranges in Atlas.
- [ ] Configure the frontend to call the deployed API.
- [ ] Choose Render or Expo EAS Hosting for the web frontend and deploy it.

## 6. Test online

- [ ] Play a complete game using multiple devices.
- [ ] Verify that roles and ballots stay private.
- [ ] Test invalid actions, duplicate submissions, and room access.
- [ ] Test refreshing, disconnecting, and rejoining.
- [ ] Check server logs and database persistence.

## 7. Build and release mobile apps

- [ ] Configure Expo EAS Build.
- [ ] Create Android and iOS testing builds.
- [ ] Test both platforms on real devices.
- [ ] Set up Apple and Google developer accounts.
- [ ] Prepare store descriptions, screenshots, and privacy information.
- [ ] Use EAS Submit to upload builds.
- [ ] Complete store review and release.

# Accessibility review

Target: WCAG 2.2 Level AA. This is a source review with calculated color contrast, not a completed conformance audit.

## Improvements made

- Native buttons retain keyboard activation and have a 44px minimum height.
- A skip link lets keyboard users move directly to the game.
- After a screen change, focus moves to its main prompt. The initial page does not steal focus.
- Player-name instructions and validation errors are associated with the labeled input. Invalid input is marked and focused; editing clears the error.
- Decorative role icons and button arrows are hidden from assistive technology.
- Dead-player text stays readable; the explicit word “Dead” conveys state without relying on color.
- Input and secondary-button borders have stronger contrast. Placeholder and focus colors are explicit.
- Headers, tags, panel titles, and footers wrap; long names can wrap; ballot targets use one column on small screens.
- Game screens use headings rather than an automatically announced live region containing secret identities. Screen-reader users should use headphones during private turns.

## Verified

- JavaScript syntax check.
- Calculated WCAG contrast ratios for body text, muted/dead text, red labels, primary buttons and hover, private instructions, control borders, placeholders, keyboard focus, and selected text.
- Source inspection of labels, native controls, focus transitions, headings, and decorative content.

## Still required before claiming conformance

- Complete a game using only keyboard input, including invalid setup, all night abilities, ballots, canceling End game, and replay.
- Test with NVDA and a browser, and VoiceOver/Safari where available. Confirm every screen change is understandable, secret content is accessible only on the intended turn, and errors are announced without confusing repetition.
- Check actual rendered pages at a 320 CSS-pixel viewport and 400% zoom, with increased text spacing and long player names. Confirm no horizontal scrolling or clipped controls.
- Run an automated browser accessibility scan on setup and every game phase; resolve findings and review anything automation cannot determine.
- Check operating-system high-contrast/forced-color modes.

The current prototype relies on in-person discussion and one shared device. A source audit does not establish the accessibility of that social experience or compliance with jurisdiction-specific laws.

Reference: [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/).

## Decisions and notes

- Planned frontend: Expo with React Native and TypeScript, targeting web and mobile.
- Planned backend: Node.js on Render, deployed with Docker.
- Planned database: MongoDB Atlas.
- Source history: Git, with a remote repository on GitHub.
- Web hosting choice: pending (Render or Expo EAS Hosting).
- Current prototype: shared-device browser game; game state lives in browser memory.
- Existing resources: [README](README.md), [Docker deployment guide](DOCKER.md),
  and [accessibility notes](ACCESSIBILITY.md).
