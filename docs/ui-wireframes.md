# Wireframe screens

The Expo screens follow `wireframes.excalidraw`: Home, Login, Create Account,
Create Room, Lobby, Game Room, and Game Over. Find a Room and Your Account use
the same components because they do not have separate frames in that file.

The shared UI is in `slydevil/src/components/screen-ui.tsx`. It supplies the
grayscale light/dark palettes, responsive screen container, labeled fields,
password visibility, checkboxes, selectors, voting rows, and action buttons.
`NavigationButton` uses these button styles with Expo Router links. The root
uses a stack so every screen can be opened without registering it as a tab.

## Preview flow

- Home → Create Room → Lobby → Preview game screen → Preview game over → Lobby.
- Enter sample code `X7K2Q9` on Home or Find a Room to preview the guest lobby.
- Room settings carry across screen navigation within the app session.
- Riley is not ready in the sample lobby, matching the wireframe. Start game is
  disabled; the separate preview link opens the game screen.
- The game screen demonstrates private role reveal, a local ballot, and leave
  confirmation. The countdown, other players, discussion, and results are samples.
- Login and registration validate inputs but do not authenticate or save data.
  Login also links to a sample account screen.

These screens do not create online rooms, synchronize players, send ballots,
or store accounts. Reloading resets the room preview. Invite links prefill the
sample room code; they are not invitations to a live multiplayer server.

## Validation

Run `npx tsc --noEmit`, `npm run lint`, and
`npx expo export --platform web` from `slydevil/`.
Native device verification is still needed for keyboard behavior, safe areas,
sharing, and screen-reader interactions.
