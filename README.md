# Semester Sprint: The B.Tech Odyssey 🏃‍♂️🎓

[![HTML5 Canvas](https://img.shields.io/badge/Engine-HTML5%20Canvas-orange.svg?style=for-the-badge&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Vanilla JS](https://img.shields.io/badge/Code-Vanilla%20JS-yellow.svg?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Audio-Web%20Audio%20API-blue.svg?style=for-the-badge&logo=webassembly)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Semester Sprint: The B.Tech Odyssey** is an action-packed 2D side-scrolling retro runner game built entirely using **HTML Canvas**, **Vanilla JavaScript**, and **CSS3**. Navigate the chaotic life of a B.Tech college student running late for DAA exams and fighting to get placed in the campus drive!

---

## 🕹️ Features & Story Campaigns

The game is divided into two distinct story campaigns featuring **6 unique levels** with custom-made retro backdrops, obstacles, and music:

### 🎒 Campaign 1: The Morning Commute (Vardhan's Sprint)
1. **Level 1 - City Streets**: Sprint through busy roads, dodging potholes, stray dogs, cows, and speeding auto-rickshaws to reach the college gates before the bell rings.
2. **Level 2 - Campus Corridor**: Dodge fellow classmates, wet floor signs, backpacks, and benches. Watch out for Sharma Sir trying to catch latecomers!
3. **Level 3 - Classroom (DAA Viva Boss Fight)**: Face the Examiner. Dodge floating laser questions and jump/slide to collect correct answers to clear your Viva exam!

### 💼 Campaign 2: The Placement Campaign (Securing the Dream Job)
4. **Level 4 - Campus Gardens**: Run past the lush green KL campus building facade. Dodge campus security guards and peers on a dark asphalt road.
5. **Level 5 - Corporate Hallway**: Duck under floating test papers, leap over hot coffee spills, and dodge walking HR executives.
6. **Level 6 - Placement Cell (Technical Interview Boss Fight)**: The Grand Finale! Dodge question lasers shot by the floating Interviewer Boss and collect correct CS/IT bubbles (QuickSort complexity, deadlocks, SQL clauses) to get officially placed!

---

## 🎮 Game Controls

### ⌨️ Keyboard Controls (Desktop)
| Key | Action | Context |
| :--- | :--- | :--- |
| **Spacebar** / **W** / **↑** | Jump (Double Jump supported) | In-Game |
| **S** / **↓** | Slide / Duck | In-Game |
| **M** | Toggle Mute | Anywhere |
| **Escape** | Pause / Resume | In-Game |
| **Spacebar** | Select / Confirm / Start | Menus |

### 📱 Touch Controls (Mobile)
* **Swipe Up**: Jump / Double Jump
* **Swipe Down**: Slide / Duck
* **Side Toggle Button**: Seamlessly switch campaigns (Morning Commute 🔁 Placement Drive) right from the title screen.

---

## 🏗️ Technical Architecture
The game relies on a clean, single-threaded model centered around a deterministic game loop driven by `requestAnimationFrame`.

```mermaid
graph TD
    A[Browser Window] -->|Inputs: Keyboard/Swipe| B(Game Engine)
    B --> C{Game Loop: requestAnimationFrame}
    C --> D[Update Phase]
    C --> E[Render Phase]
    D --> D1[Player Physics: gravity, jumping, sliding]
    D --> D2[Obstacles & Collectibles: spawner patterns]
    D --> D3[Precise Collision: AABB overlap filters]
    D --> D4[Progress States: attendance decay, interview progress]
    E --> E1[Draw Scrolling Parallax Backdrops]
    E --> E2[Draw Active Entities: Player, Bosses, Sparks]
    E --> E3[Draw HUD: Attendance, Commits, Score]
    D3 -->|Collision SFX| F[Audio Engine: Web Audio Synth]
    F -->|Programmatic chiptunes| G[Audio Output]
```

---

## 🚀 Key Engineering Highlights

### 1. Programmatic 8-Bit Synth (Web Audio API)
All audio is generated **programmatically at runtime** using the Web Audio API (saving load times and assets storage):
* **Custom chiptune themes**: Features high-tempo gameplay music and boss themes (Level 3 Viva theme, Level 5 cyberpunk chiptune, Level 6 final boss theme).
* **Low footprint**: Zero external `.mp3` or `.wav` dependencies.

### 2. AABB Collision Detection with Safe Padding
A custom Axis-Aligned Bounding Box (AABB) system computes precise overlap bounds. It includes custom hit-box padding for player-friendly collision boxes, preventing frustrating near-miss crashes:
```javascript
getHitbox() {
    return {
        x: this.x + 4,
        y: this.y + 4,
        w: this.width - 8,
        h: this.height - 8
    };
}
```

### 3. Real-Time Canvas Pixel Manipulation
Filters sprite images dynamically on load:
* **Background removal**: Detects off-white background colors (RGB > 220) and sets their alpha values to 0 dynamically, allowing smooth transparent sprite rendering.

---

## 📂 Repository Folder Structure
```text
btech-runner/
├── index.html          # Entrypoint HTML game layout
├── style.css           # Styling & CRT monitor layout overlay
├── game.js            # Main loop, renderer, and campaign logic
├── obstacles.js       # Game entity class definitions and spawner rules
├── player.js          # Player physics, sprite maps, and jump/slide triggers
├── audio.js           # Programmatic chiptune synthesizer sequencer
├── assets/            # Pixel-art and character assets
│   ├── gardens_bg.jpg
│   ├── campus_greenery_bg.jpg
│   ├── corporate_hallway_bg.jpg
│   ├── boardroom_boss_bg.jpg
│   ├── interviewer_boss.jpg
│   ├── hr_executive.jpg
│   └── ...
└── README.md          # Project documentation
```

---

## 🛠️ How to Run Locally

### Option A: Open Directly
Simply open `index.html` in any web browser of your choice.

### Option B: Local Web Server (Recommended)
Running a local web server ensures correct CORS origin policies for canvas pixel manipulation:

#### Using Node.js:
```bash
npx http-server
```

#### Using Python:
```bash
# Python 3
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.
