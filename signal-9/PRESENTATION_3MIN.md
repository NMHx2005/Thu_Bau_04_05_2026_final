# SIGNAL LOST — Presentation script (~3 minutes)

Use with live demo: https://nmhx2005.github.io/Thu_Bau_04_05_2026/signal-9/

---

## 1. Concept (20 seconds)

"SIGNAL LOST is not a marketing website — it's an interactive story told through a fake phone. The player wakes in a room they can't name, calls a contact called Unknown, and tries to recover what they meant to say before they couldn't. Every puzzle is also a narrative device."

---

## 2. Flow (40 seconds)

"Prologue resets state and sets tone. Night 1: explore five hotspots — exploration changes dialogue — then a dial pad with a decoy wrong number, chat, and a canvas signal decode. Night 2: four phone apps, a memory timeline puzzle, free text, and a hidden unsent thread you must find to reach Night 3. Night 3: heartbeat puzzle, a twenty-second timed honesty chat, a word bank, then one of three endings."

---

## 3. Agency (40 seconds)

"Choices are real. Chat options call `addTrust` — positive and negative answers stack across three nights. Puzzles award clues once each, idempotently. The **status bar meter** shows connection (five bars) and fragments (four dots) so players see agency without a score popup. At the end, trust and clue count route to SIGNAL FOUND, STATIC, or NOT YET. Perfect play needs trust seven and at least three clues. The player's final sentence from the word bank appears on the FOUND screen — it's their words, not ours."

---

## 4. Live demo beats (60 seconds)

Show in order if time allows:

1. Tap **enable sound** on prologue (mobile-safe).
2. Open **note** hotspot → dial decoy wrong number → shake → correct number.
3. Night 2 **Notes** → expand **Drafts** → hidden thread + clue.
4. Optional: Night 3 word bank → FOUND (or show screenshot `05-ending-found.png`).

---

## 5. Tech (20 seconds)

"Vanilla HTML, CSS, and JavaScript — modular files, no React. Canvas for decode and heartbeat, Web Audio with licensed MP3 fallbacks, localStorage state, game frame that scales on mobile. jQuery only for one sortable puzzle. Full QA matrix and design doc are in the repo."

---

## QA matrix (one page — for handout)

| Test | Expected |
|---|---|
| Prologue reset | trust=0, clues=0, meter empty |
| Chat + trust | status bars rise/fall |
| Puzzle clue | next fragment dot fills |
| T=7, C=3 | ending FOUND |
| T=7, C=2 | STATIC |
| T=3, C=3 | STATIC |
| Hidden thread twice | clue +1 only once |
| Voicemail T≥5 | Play message button works |
| Dial | max 10 digits; ESC closes lightbox |
| Mobile | tap sound unlock; frame fits viewport |

See [QA.txt](QA.txt) for full steps.
