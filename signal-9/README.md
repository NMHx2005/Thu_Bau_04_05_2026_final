# SIGNAL LOST

Interactive narrative game in the browser, told through a simulated phone. Explore a room, decode a signal, recover unsent messages, and choose how honestly you engage with a voice on the line — trust and clues determine one of three endings.

**Live demo (GitHub Pages):**  
https://nmhx2005.github.io/Thu_Bau_04_05_2026/signal-9/

---

## Concept

You wake without a name. **Unknown** calls. The story is about identity, memory, and words you never finished saying. A **signal meter** on the phone status bar shows your connection (trust) and recovered fragments (clues) — chat and puzzles move both, and together they choose one of three endings.

---

## How to play

1. Open the demo link (or run locally — see below).
2. **Tap to enable sound** on `index.html` (required on mobile).
3. Click through the prologue chain: `index.html` → `prologue-2/3/4` → `waking-up.html` → `night0.html` (March 2 choice) → **Night 1**.
4. **Night 1**: open all five hotspots → dial → chat → signal decode → `continue-to-night2.html`.
5. **Night 2**: four apps (memory side links in Notes/Browser/Voicemail) → memory puzzle → chat → free text → hidden thread → `between-nights.html` → `continue-to-night3.html`.
6. **Night 3**: heartbeat → timed chat → word bank → ending (`ending-shell.html`). SIGNAL FOUND shows a **Credits** link after ~9s.

Full design doc: [MAJOR_PROJECT_PROGRESS_VI.md](MAJOR_PROJECT_PROGRESS_VI.md) (Vietnamese) · [MAJOR_PROJECT_PROGRESS_EN.md](MAJOR_PROJECT_PROGRESS_EN.md)

### Game logic vs. navigation

| Unchanged | Added (narrative only) |
|---|---|
| Trust 0–10, clues 0–4, all puzzles, 3 endings | Prologue split across 6 pages + `night0` choice |
| Hidden thread required for Night 3 | Bridge text pages between nights |
| Perfect-play FOUND: T=7, C≥3 | Optional memory/lore/voicemail pages (`history.back`) |
| Dial decoy, chat scripts | FOUND: extra phrase line + Credits / epilogue |

---

## All HTML pages (25 in `signal-9/`)

| # | File | Role |
|---|------|------|
| 1 | `index.html` | Start: sound unlock + reset |
| 2–4 | `prologue-2/3/4.html` | Prologue slides + title |
| 5 | `waking-up.html` | Wake-up slides |
| 6 | `night0.html` | March 2 flashback + choice |
| 7 | `night1.html` | Night 1 gameplay |
| 8 | `continue-to-night2.html` | Bridge |
| 9 | `night2.html` | Night 2 gameplay |
| 10–13 | `memory-draft`, `memory-east-entrance`, `memory-three-weeks`, `voicemail-transcript` | Side reads |
| 14 | `between-nights.html` | Bridge |
| 15 | `continue-to-night3.html` | Night 3 gate |
| 16 | `night3.html` | Night 3 gameplay |
| 17–18 | `lore-window.html`, `lore-coat.html` | Lore deep-read |
| 19 | `ending-shell.html` | Main endings |
| 20–22 | `ending-found/static/notyet.html` | Legacy URLs |
| 23–24 | `credits.html`, `after.html` | Post-game |
| 25 | `reference.html` | Asset attribution |

Repo root `../index.html` redirects here.

---

## Player agency (trust + clues → ending)

| Mechanic | Effect |
|---|---|
| **Status bar meter** | 5 bars = trust (0–10); 4 dots = clues (0–4) |
| Chat choices | Add or subtract **trust** (0–10) |
| Puzzles / hidden thread | Award **clues** (0–4), once each |
| Night 1 exploration | Extra Unknown lines if you visited objects first |
| Word bank (Night 3) | Your sentence is the main line in **SIGNAL FOUND** |
| Night 0 choice / Night 2 free-text | Optional `you said, once: "…"` on FOUND |

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
| `index.html` → `prologue-2/3/4`, `waking-up`, `night0` | Prologue chain + March 2 choice |
| `continue-to-night2.html`, `between-nights.html` | Bridge flavour between nights |
| `memory-*.html`, `lore-*.html`, `voicemail-transcript.html` | Side pages (`history.back`) |
| `js/night1.js` / `night1Data.js` | Explore, dial decoy, chat, decode |
| `js/night2.js` / `night2Data.js` | Apps, memory, hidden thread |
| `js/night3.js` | Heartbeat, timed chat, word bank, routing |
| `js/state.js` / `stateNight3Extend.js` | Trust, clues, reset |
| `ending-shell.html` | Three endings via `?outcome=` |
| `credits.html`, `after.html` | Post-game credits and epilogue |

---

## QA & submission docs

| Doc | Purpose |
|---|---|
| [QA.txt](QA.txt) | Manual test matrix (full flow) |
| [MAJOR_PROJECT_PROGRESS_VI.md](MAJOR_PROJECT_PROGRESS_VI.md) | Full design doc (VI) |
| [MAJOR_PROJECT_PROGRESS_EN.md](MAJOR_PROJECT_PROGRESS_EN.md) | Full design doc (EN summary) |
| [HUONG_DAN_DAT_90_PLUS.md](HUONG_DAN_DAT_90_PLUS.md) | 90+ submission checklist |
| [PRESENTATION_3MIN.md](PRESENTATION_3MIN.md) | 3-minute presentation script |
| [credits.html](credits.html) | Submission credits page |
| [reference.html](reference.html) / [ATTRIBUTION.txt](ATTRIBUTION.txt) | Third-party assets |

---

## Screenshots

Add captures under [docs/screenshots/](docs/screenshots/) (see README there). Suggested: prologue title, night0 choice, explore, chat, Night 2 side link, FOUND + Credits.

---

## Credits

Audio: Pixabay (see [ATTRIBUTION.txt](ATTRIBUTION.txt)).  
`LastLocation.png`: Pexels.  
Details: [reference.html](reference.html)
