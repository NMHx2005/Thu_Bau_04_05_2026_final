# SIGNAL LOST

Interactive narrative game in the browser, told through a simulated phone. Explore a room, decode a signal, recover unsent messages, and choose how honestly you engage with a voice on the line — trust and clues determine one of three endings.

**Live demo (GitHub Pages):**  
https://nmhx2005.github.io/Thu_Bau_04_05_2026/signal-9/

---

## Concept

You wake without a name. **Unknown** calls. The story is about identity, memory, and words you never finished saying. There is no traditional HUD: only hotspots, apps, puzzles, and chat that carry state across nights.

---

## How to play

1. Open the demo link (or run locally — see below).
2. **Tap to enable sound** on the prologue screen (required on mobile).
3. Click through prologue slides → **Night 1**: open all five hotspots → dial → chat → signal decode.
4. **Night 2**: open four apps → memory order puzzle → chat → free text → find **hidden thread** in Notes or Browser.
5. **Night 3**: heartbeat puzzle → timed chat → word bank → ending.

Full design doc: [MAJOR_PROJECT_PROGRESS_VI.md](MAJOR_PROJECT_PROGRESS_VI.md)

---

## Player agency (trust + clues → ending)

| Mechanic | Effect |
|---|---|
| Chat choices | Add or subtract **trust** (0–10) |
| Puzzles / hidden thread | Award **clues** (0–4), once each |
| Night 1 exploration | Extra Unknown lines if you visited objects first |
| Word bank (Night 3) | Your sentence appears in **SIGNAL FOUND** |

### Ending rules

| Condition | Ending |
|---|---|
| Trust ≥ 7 **and** clues ≥ 3 | **SIGNAL FOUND** |
| Trust ≥ 4 **or** clues ≥ 2 | **STATIC** |
| Otherwise | **NOT YET** (then routes to STATIC) |

### Perfect play → SIGNAL FOUND

| Step | Action | Trust | Clue |
|---|---|---|---|
| Night 1 chat | Positive choices all 3 times | +3 | — |
| Night 1 | Complete signal decode | — | +1 |
| Night 2 chat | "I'm still here." | +2 | — |
| Night 2 | Correct memory order | — | +1 |
| Night 2 | Open hidden thread (Notes or Browser) | — | +1 |
| Night 3 | Complete heartbeat puzzle | — | +1 |
| Night 3 timed chat | "I hear you." | +2 | — |
| **Total** | | **7** | **4** |

---

## Run locally

### Requirements

- [Git](https://git-scm.com)
- [VS Code](https://code.visualstudio.com) + [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (or any static server)

### Steps

```bash
git clone https://github.com/NMHx2005/Thu_Bau_04_05_2026.git
cd Thu_Bau_04_05_2026/signal-9
```

Open `signal-9` in VS Code → right-click `index.html` → **Open with Live Server**.

Or from repo root, open `index.html` (redirects to `signal-9/`).

---

## Tech stack

- Vanilla HTML, CSS, JavaScript (no framework, no build step)
- Canvas puzzles (`signalPuzzle.js`), reusable chat runner (`chat.js`)
- `localStorage` / `sessionStorage` state
- Web Audio + MP3 assets; jQuery UI sortable (Night 2 only)

### Key files

| File | Role |
|---|---|
| `js/night1.js` / `night1Data.js` | Explore, dial decoy, chat, decode |
| `js/night2.js` / `night2Data.js` | Apps, memory, hidden thread |
| `js/night3.js` | Heartbeat, timed chat, word bank, routing |
| `js/state.js` / `stateNight3Extend.js` | Trust, clues, reset |
| `ending-shell.html` | Three endings via `?outcome=` |

---

## QA & submission docs

- [QA.txt](QA.txt) — manual test matrix
- [HUONG_DAN_DAT_90_PLUS.md](HUONG_DAN_DAT_90_PLUS.md) — 90+ checklist
- [PRESENTATION_3MIN.md](PRESENTATION_3MIN.md) — 3-minute presentation script
- [reference.html](reference.html) / [ATTRIBUTION.txt](ATTRIBUTION.txt) — credits

---

## Screenshots

Add captures under [docs/screenshots/](docs/screenshots/) (see README there). Suggested: prologue, explore, chat, Night 2 apps, FOUND ending.

---

## Credits

Audio: Pixabay (see [ATTRIBUTION.txt](ATTRIBUTION.txt)).  
`LastLocation.png`: Pexels.  
Details: [reference.html](reference.html)
