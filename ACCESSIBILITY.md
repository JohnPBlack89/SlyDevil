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
