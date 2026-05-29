# SIGNAL LOST — Hướng dẫn đạt 90+

Tài liệu này tóm tắt **trạng thái hiện tại**, **khoảng cách tới 90+**, và **checklist hành động** cụ thể cho dự án SIGNAL LOST (`signal-9/`).

**Điểm ước lượng hiện tại:** ~82–87/100  
**Mục tiêu:** 90+ (Distinction)

---

## 1. Tóm tắt nhanh

SIGNAL LOST **không phải** website copy brand. Đây là **interactive narrative game** qua giao diện điện thoại giả — và theo rubric Major Project, bạn **đã mạnh** ở concept, narrative flow, interactivity và user agency.

Để lên **90+**, không cần làm lại dự án. Cần **đóng 4 lỗ hổng** giám khảo hay trừ điểm:

1. **Presentation** — README + demo online
2. **Mobile responsive**
3. **Production polish** — bug, state, asset, attribution
4. **Chứng minh agency** — present rõ trust/clue → ending + sâu thêm branching nhẹ

---

## 2. Đã đáp ứng gì (điểm mạnh)

### 2.1. Originality / Narrative — Đạt mạnh

| Yêu cầu rubric | Dự án có |
|---|---|
| Concept riêng | SIGNAL LOST — identity, ký ức, lời chưa nói |
| Story mở–thân–kết | Prologue → Night 1 → 2 → 3 → 3 ending |
| User agency | Trust, clues, free-text, word bank, hidden thread |
| Không copy layout brand | Concept độc lập, không phải e-commerce clone |

### 2.2. Interactivity — Vượt yêu cầu (2–3 tương tác mạnh)

Rubric yêu cầu ít nhất 2–3; dự án có **6–8 mechanic có ý nghĩa**:

- Khám phá hotspot + lightbox zoom
- Dial decoy (số sai → rung → số đúng)
- Canvas signal decode (Night 1)
- Memory drag sortable (Night 2)
- Hidden thread (Notes / Browser)
- Heartbeat puzzle (Night 3)
- Timed chat 20 giây
- Word bank → câu cuối hiện ở ending FOUND

Tương tác **ảnh hưởng story/kết quả**, không chỉ trang trí.

### 2.3. User choices ảnh hưởng kết quả — Đạt

- Chat choice → `addTrust()` trong `js/chat.js`
- Puzzle / hidden thread → `tryAwardClue()` trong `js/state.js`
- Night 3 routing: `T ≥ 7 && C ≥ 3` → FOUND; `T ≥ 4 || C ≥ 2` → STATIC; còn lại → NOT YET
- Free-text + word bank → câu cuối trong ending FOUND

> **Lưu ý:** Nhận xét “trust không hoạt động / fake agency” **không đúng** với code hiện tại. Agency **có thật**; chỉ là **branching dialogue chưa sâu**.

### 2.4. Technical proficiency — Khá–tốt

- Chia file rõ: `night1.js`, `night2.js`, `night3.js`, `chat.js`, `state.js`, `signalPuzzle.js`, `gameFrame.js`
- Extension pattern: `stateNight3Extend.js`, `audioNight3Extend.js`
- jQuery dùng có mục đích (sortable Night 2)
- Canvas, Web Audio, localStorage state
- Tài liệu nội bộ: `MAJOR_PROJECT_PROGRESS_VI.md`, `QA.txt`

### 2.5. Giải thích design → narrative — Đạt (nội bộ)

`MAJOR_PROJECT_PROGRESS_VI.md` đã giải thích rõ interactivity phục vụ narrative. Vấn đề là **giám khảo có đọc không** — cần README ngắn + present 3 phút.

---

## 3. Chưa đáp ứng gì (điểm trừ thật)

### 3.1. Design / production polish — Khá, chưa “pro max”

| Thiếu | Chi tiết |
|---|---|
| Visual identity hoàn chỉnh | Palette ổn; còn placeholder art/audio |
| Details đều chỗ | Night 2 nhiều inline HTML/style trong JS |
| Original graphics final | `LastLocation.png`, audio synthetic/placeholder |
| Attribution đầy đủ | `ATTRIBUTION.txt` chưa final cho nộp bài |

### 3.2. Responsive mobile — Chưa đạt

Game frame 1200px cố định. Rubric ghi **responsive ổn** — gap rõ nếu giám khảo test trên điện thoại.

### 3.3. Narrative branching depth — Đạt tối thiểu, chưa sâu

- Trust hoạt động, nhưng hầu hết choice **chỉ đổi điểm**, ít đổi dialogue
- Chỉ `visited.coat` có beat conditional; hotspot khác chưa
- Giám khảo strict có thể nói “agency có nhưng cảm giác linear”

### 3.4. Ending balance / rủi ro demo

- Perfect play mới FOUND; đa số chơi một lần → **STATIC**
- NOT YET gần như không thấy nếu chơi hết Night 3
- Giám khảo chơi nhanh có thể **không thấy payoff tốt nhất**

### 3.5. Code polish nhỏ

- `dialBuf` không giới hạn độ dài (`js/night1.js`)
- Lightbox thiếu ESC + focus
- `resetGame()` chưa xóa hết key Night 3 (`finalWords`, `notYetRound`, sessionStorage dial decoy)
- Một số chỗ dùng `innerHTML` thay `createElement` (ưu tiên thấp)

### 3.6. README / nộp bài

README hiện chỉ hướng dẫn cài Git + Live Server. Thiếu pitch, screenshot, link demo, hướng dẫn test FOUND ending.

### 3.7. Accessibility — Tối thiểu

Click-only; chưa `prefers-reduced-motion`; keyboard cho lightbox/chat hạn chế.

---

## 4. Ma trận rubric × trạng thái

| # | Yêu cầu 90+ | Trạng thái | Mức |
|---|---|---|---|
| 1 | Concept riêng | SIGNAL LOST — unique | ✅ Đạt |
| 2 | Narrative flow | Prologue → 3 nights → ending | ✅ Đạt |
| 3 | Design đồng nhất | CSS vars + phone UI; Night 2 inline; placeholder | ⚠️ Khá |
| 4 | 2–3 interactive có ý nghĩa | 6–8 mechanic | ✅ Vượt |
| 5 | Choice ảnh hưởng kết quả | Trust + clues → 3 ending | ✅ Đạt |
| 6 | Code sạch modular | Tốt; night2 inline; chưa tách data | ⚠️ Khá |
| 7 | Responsive mobile | Frame 1200px | ❌ Chưa |
| 8 | Reference page | Có nhưng chưa final | ⚠️ Chưa đủ |
| 9 | Không lỗi link/ảnh/button | Cần test trước nộp | ⚠️ Cần verify |
| 10 | Giải thích design → narrative | Progress doc xuất sắc | ✅ Đạt (nội bộ) |

---

## 5. Checklist bắt buộc (làm hết ≈ 90+)

### 5.1. README + demo online — Quan trọng nhất

Giám khảo thường chơi 5–10 phút qua link, không đọc progress doc 639 dòng.

**Làm gì:**

- Viết lại `README.md` gồm:
  - Pitch 2–3 câu (concept là gì)
  - Link **GitHub Pages** chơi trực tiếp
  - 4–5 screenshot (Prologue, explore, chat, Night 2 apps, ending)
  - Bảng ngắn: **Choice → Trust/Clue → Ending**
  - Hướng dẫn test **FOUND ending** (perfect play checklist)
  - Link `ATTRIBUTION.txt`
- Deploy `signal-9/` lên GitHub Pages (`index.html` = prologue)

**Done khi:** mở link trên điện thoại + laptop, chơi được từ đầu đến ending.

---

### 5.2. Mobile responsive — Gap lớn nhất trong rubric

**Làm gì:**

- Trong `css/game-frame.css`: viewport scale trên màn `< 768px` (frame co theo `100vw`, giữ 16:9)
- Test: iPhone Safari + Chrome Android
- Thêm nút **“Tap to enable sound”** ở prologue (Web Audio cần user gesture trên mobile)

**Done khi:** không bị cắt phone UI, nút bấm được, không overflow ngang.

---

### 5.3. Bug + state polish — 15–30 phút

| Việc | File |
|---|---|
| Cap dial tối đa 10 số | `js/night1.js` |
| ESC đóng lightbox + focus nút × | `js/night1.js` |
| `resetGame()` xóa `finalWords`, `notYetRound`, sessionStorage dial decoy | `js/state.js`, `js/stateNight3Extend.js` |
| Chạy full QA theo `QA.txt`, fix link/ảnh hỏng | toàn project |

**Done khi:** chơi lại từ prologue → state sạch 100%.

---

### 5.4. Narrative agency sâu hơn — 2–3 giờ

Không cần cây dialogue lớn. Thêm **beat conditional** khi đã khám phá hotspot (Night 1 chat):

| Đã mở | Gợi ý dòng Unknown |
|---|---|
| `visited.note` | “You read the number before you dialled. Good. Smudged ink still counts.” |
| `visited.window` | “No reflection — you noticed. That’s not art direction. That’s the room refusing to lie.” |
| `visited.laptop` | “The draft on your laptop… same sentence, different screen.” |
| `visited.coat` | *(đã có)* “You already touched the coat…” |

**Done khi:** present được: “Khám phá phòng **đổi dialogue**, không chỉ decoration.”

---

### 5.5. ATTRIBUTION / reference page — Rubric bắt buộc

**Làm gì:**

- Hoàn thiện `ATTRIBUTION.txt` (hoặc thêm `reference.html`)
- Liệt kê: ảnh original, audio Freesound CC0, AI dùng ở đâu (nếu có)
- Link từ README

**Done khi:** không còn dòng “replace before submission”.

---

### 5.6. Asset + audio final (tối thiểu)

Không cần đổi hết art. Chỉ **3 thứ** giám khảo thấy rõ:

| Asset | Việc |
|---|---|
| `assets/audio/rain.mp3` | Ambience thật từ Freesound CC0 |
| `assets/images/LastLocation.png` | Ảnh decode đẹp hơn placeholder |
| Heartbeat Night 3 | Dùng `assets/audio/heartbeat.mp3` thay beep sine |

**Done khi:** Night 1 decode + Night 3 heartbeat nghe/nhìn professional.

---

### 5.7. Presentation 3 phút

**Script gợi ý:**

1. **Concept** (20s): “Interactive story qua điện thoại — những lời chưa nói.”
2. **Flow** (40s): Prologue → explore → call → 3 nights → ending.
3. **Agency** (40s): “Mỗi chat choice cộng/trừ trust; puzzle cho clue; cuối game trust + clue → 1 trong 3 ending.”
4. **Demo live** (60s): decoy dial → hidden thread → word bank → FOUND (hoặc screenshot FOUND).
5. **Tech** (20s): Vanilla JS, canvas, localStorage, modular files.

In/em **QA matrix 1 trang** (từ `QA.txt`) đính kèm nộp bài.

---

## 6. Nên làm thêm (đẩy lên 92–95)

| # | Việc | Effort |
|---|---|---|
| 8 | Refactor copy Night 2 ra `night2Data.js` | 2–3h |
| 9 | `prefers-reduced-motion` tắt blink/shake | 30m |
| 10 | Voicemail phát audio khi trust ≥ 5 | 1h |
| 11 | Video walkthrough 2 phút (FOUND path) embed README | 1–2h |
| 12 | Trang “How to play” ngắn trong README | 30m |

---

## 7. Không nên làm (tránh mất điểm vì lỗi mới)

| Việc | Lý do |
|---|---|
| Refactor sang React/Vite/build tool | Rủi ro lỗi cao; rubric không yêu cầu |
| Thêm Night 4 / ending mới | Scope creep |
| Viết test suite lớn | Rubric không bắt |
| Redesign toàn bộ visual | Chỉ polish asset chính |
| Sửa mọi `innerHTML` → `createElement` | Polish nhỏ, không đổi UX |
| Panic vì “thiếu interactivity” | Dự án **đã vượt** tiêu chí này |
| Panic vì “trust không hoạt động” | **Sai** — chỉ cần present rõ |

---

## 8. Lộ trình 5 ngày

```
Ngày 1  README mới + GitHub Pages + screenshot
Ngày 2  Mobile CSS + tap-to-enable-sound + test 2 thiết bị
Ngày 3  Bug fixes (reset, dial cap, ESC) + QA full pass
Ngày 4  3 beat hotspot + audio/art tối thiểu + ATTRIBUTION final
Ngày 5  Presentation script + video (optional) + test FOUND 1 lần nữa
```

### Nếu chỉ còn 1–2 ngày — thứ tự ưu tiên

1. GitHub Pages + README
2. Mobile pass
3. reset + dial cap + ESC
4. 3 beat hotspot
5. ATTRIBUTION + 1 asset/audio thay placeholder

---

## 9. Checklist nộp bài — “100% sẵn sàng 90+”

Đánh dấu khi hoàn thành:

- [x] Link demo online chạy ổn (README + root redirect → `signal-9/`)
- [x] Mobile không vỡ layout (game-frame + night.css `@media 480px`)
- [x] README giải thích trust → ending
- [x] Reset game sạch từ prologue (`stateNight3Extend` wrap `resetGame`)
- [ ] Không lỗi console khi chơi full (verify locally)
- [x] ≥3 hotspot ảnh hưởng dialogue (`night1Data.js` beats)
- [x] ATTRIBUTION đầy đủ + `reference.html`
- [x] Audio/art Pixabay/Pexels (see ATTRIBUTION.txt)
- [x] `QA.txt` cập nhật boundary + voicemail + reset
- [x] Present được 3 phút (`PRESENTATION_3MIN.md`)

---

## 10. Hướng dẫn test FOUND ending (perfect play)

Dùng cho README và tự QA trước nộp:

| Bước | Hành động | Trust | Clue |
|---|---|---|---|
| Night 1 chat | Chọn tích cực cả 3 lần (+1 mỗi lần) | +3 | — |
| Night 1 puzzle | Hoàn thành signal decode | — | +1 |
| Night 2 chat | Chọn “I'm still here.” | +2 | — |
| Night 2 memory | Sắp xếp đúng thứ tự | — | +1 |
| Night 2 hidden | Mở thread trong Notes hoặc Browser | — | +1 |
| Night 3 heartbeat | Khóa đúng 3 peak | — | +1 |
| Night 3 timed chat | Chọn “I hear you.” | +2 | — |
| **Tổng** | | **T = 7** | **C = 4** |

**Kết quả:** `T ≥ 7 && C ≥ 3` → **SIGNAL FOUND** (`ending-shell.html?outcome=found`)

### Boundary cases (từ `QA.txt`)

| Trust (T) | Clue (C) | Ending |
|---|---|---|
| T ≥ 7 và C ≥ 3 | | **FOUND** |
| T ≥ 4 hoặc C ≥ 2 | | **STATIC** |
| T < 4 và C < 2 | | **NOT YET** → cuối cùng STATIC |

Ví dụ: T=3, C=3 → STATIC (vì C ≥ 2). T=7, C=2 → STATIC (vì C < 3).

---

## 11. Bảng trust trong game

| Vị trí | Lựa chọn tích cực | Trust |
|---|---|---|
| Night 1 | “I'm listening.” / “I remember the weight.” | +1 mỗi lần (3 lần max) |
| Night 1 | Tiêu cực / trung lập | -1 hoặc 0 |
| Night 2 | “I'm still here.” | +2 |
| Night 2 | “Prove it.” | -2 |
| Night 3 | “I hear you.” | +2 |
| Night 3 | “I don't believe you.” | -2 |

Trust cũng mở **Voicemail** app ở Night 2 khi T ≥ 5.

---

## 12. Tài liệu liên quan

| File | Mục đích |
|---|---|
| `MAJOR_PROJECT_PROGRESS_VI.md` | Design doc đầy đủ |
| `MAJOR_PROJECT_PROGRESS_EN.md` | Bản tiếng Anh |
| `QA.txt` | Manual QA matrix |
| `ATTRIBUTION.txt` | Credits / reference |
| `README.md` | Hướng dẫn chạy + pitch + demo URL |
| `PRESENTATION_3MIN.md` | Script trình bày 3 phút |
| `reference.html` | Trang credits |

---

*Tài liệu này bổ sung cho `MAJOR_PROJECT_PROGRESS_VI.md` — tập trung vào mục tiêu điểm số và hành động trước khi nộp.*
