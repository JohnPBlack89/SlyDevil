# Sly Devil development checklist

Mark completed tasks with `[x]`. Add notes or links to commits beneath a task when
they help explain what is finished or what remains.

## First multiplayer milestone

- [ ] Two players on separate devices can join the same room and see the lobby update.

Get this working before implementing the full multiplayer game. It depends on
the frontend lobby, backend room/session handling, and synchronized updates.

## 1. Organize the project

- [ ] Push the existing Git repository to GitHub.
- [ ] Set up TypeScript.
- [ ] Define types for players, roles, rooms, and game phases.
- [ ] Define a character type if characters become separate from game roles.
- [ ] Separate shared types, game rules, frontend, and backend.
- [ ] Keep the existing engine tests passing throughout the migration.

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

## Decisions and notes

- Planned frontend: Expo with React Native and TypeScript, targeting web and mobile.
- Planned backend: Node.js on Render, deployed with Docker.
- Planned database: MongoDB Atlas.
- Source history: Git, with a remote repository on GitHub.
- Web hosting choice: pending (Render or Expo EAS Hosting).
- Current prototype: shared-device browser game; game state lives in browser memory.
- Existing resources: [README](README.md), [Docker deployment guide](DOCKER.md),
  and [accessibility notes](ACCESSIBILITY.md).
