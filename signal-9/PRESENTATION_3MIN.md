# SIGNAL LOST — Presentation script (~3 minutes)

Use with live demo: https://nmhx2005.github.io/Thu_Bau_04_05_2026/signal-9/

---

## 1. Concept (20 seconds)

"SIGNAL LOST is not a marketing website — it's an interactive story told through a fake phone. The player wakes in a room they can't name, calls a contact called Unknown, and tries to recover what they meant to say before they couldn't. Every puzzle is also a narrative device."

---

## 2. Flow (45 seconds)

"The game has **25 HTML pages**, but one continuous story. Tap sound on `index.html` — state resets. Click through a short prologue chain, a March second flashback with one choice, then three nights on a simulated phone.

**Night 1:** five hotspots, a dial pad with a decoy wrong number, chat, and a canvas signal decode.  
**Night 2:** four apps — optional memory side pages in Notes and Browser — memory timeline puzzle, free text, and a hidden unsent thread you must find to reach Night 3.  
**Night 3:** heartbeat puzzle, a twenty-second timed honesty chat, a word bank with a short echo beat, then one of three endings on `ending-shell.html`. SIGNAL FOUND can show an extra line from earlier choices and a Credits link after nine seconds."

---

## 3. Agency (40 seconds)

"Choices are real. Chat options call `addTrust` — positive and negative answers stack across three nights. Puzzles award clues once each, idempotently. The **status bar meter** shows connection (five bars) and fragments (four dots).

At the end, trust and clue count route to SIGNAL FOUND, STATIC, or NOT YET. Perfect play still needs trust seven and at least three clues — **that math did not change** when we added more pages. The word bank sentence is the main line on FOUND; an earlier phrase from Night zero or Night two can appear underneath."

---

## 4. Live demo beats (55 seconds)

Show in order if time allows:

1. Tap **enable sound** on `index.html` (mobile-safe).
2. Skip quickly through prologue → **night0** choice (one click).
3. Night 1: open **note** → decoy dial → shake → correct number → one chat choice.
4. Night 2 **Notes** → **View full draft** (optional) → expand **Drafts** → hidden thread.
5. Optional: Night 3 word bank → FOUND → wait for **Credits** (or screenshot `06-ending-credits.png`).

---

## 5. Tech (20 seconds)

"Vanilla HTML, CSS, and JavaScript — modular files, no React. Twenty-five pages, shared `state.js`, canvas puzzles, Web Audio with licensed MP3s, a centered game frame on phone nights, fullscreen click-through prologue. jQuery only for one sortable puzzle. Full QA and design docs are in the repo."

---

## QA matrix (one page — for handout)

| Test | Expected |
|---|---|
| Prologue reset | trust=0, clues=0 |
| night0 choice | `getPhrases()[0]` set |
| Chat + trust | status bars rise/fall |
| Puzzle clue | fragment dot fills once |
| T=7, C=3 | ending FOUND + Credits link |
| Hidden thread twice | clue +1 only once |
| credits.html scroll | scroll inside game frame |
| Dial | max 10 digits; ESC closes lightbox |

See [QA.txt](QA.txt) for full steps.
