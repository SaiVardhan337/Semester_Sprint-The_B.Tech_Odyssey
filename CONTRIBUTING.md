# Contributing to Semester Sprint: The B.Tech Odyssey 🎓🏃‍♂️

First off, thank you for considering contributing to **Semester Sprint: The B.Tech Odyssey**! Contributions from the community are what make open-source projects fantastic places to learn, inspire, and create.

---

## 🌟 How Can You Contribute?

### 1. 🐛 Reporting Bugs
If you find a bug or unexpected behavior while playing:
* Check existing issues to see if it has already been reported.
* Open a new issue using the **Bug Report** template.
* Include details about your browser, device (Desktop/Mobile), and steps to reproduce.

### 2. 💡 Feature Requests & Ideas
Have an idea for a new level, campus obstacle, character skin, or power-up?
* Open an issue using the **Feature Request** template.
* Explain the idea, how it enhances gameplay, and how it fits the B.Tech student theme!

### 3. 🎯 Good First Issues (Beginner Friendly Tasks)
Looking for a quick place to start? Check out these ideas:
* **Add new trivia pairs**: Expand the DAA Viva (Level 3) or Technical Interview (Level 6) Q&A dictionary with funny/relevant computer science questions.
* **New Collectible Buffs**: Add new items like a "Canteen Samosa" or "Library Card" boost.
* **Audio FX Enhancements**: Tune waveform frequencies in `audio.js` for even richer retro chiptunes.
* **Accessibility**: Add keybinding customizer options or screen-reader text labels.

---

## 🛠️ Development Setup & Workflow

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Semester_Sprint-The_B.Tech_Odyssey.git
   cd Semester_Sprint-The_B.Tech_Odyssey
   ```

2. **Run Locally**:
   Simply open `index.html` in your web browser, or launch a simple local HTTP server:
   ```bash
   npx http-server
   # or: python -m http.server 8000
   ```

3. **Run Tests & Syntax Check**:
   Before submitting a Pull Request, make sure all JavaScript files pass syntax checks:
   ```bash
   npm test
   ```

4. **Submit a Pull Request**:
   * Create a feature branch (`git checkout -b feature/awesome-new-obstacle`).
   * Commit your changes with a clear message (`git commit -m "Feat: add Canteen Samosa collectible"`).
   * Push to your branch and open a Pull Request against `main`.

---

## 🎨 Code Style Guidelines
* **Vanilla First**: Maintain zero external framework dependencies (pure HTML Canvas, Vanilla JS, CSS3, Web Audio API).
* **Performance**: Avoid heavy garbage collection inside the `requestAnimationFrame` game loop. Reuse objects or use object pools where appropriate.
* **Comments**: Document game states and canvas rendering routines clearly.

Thank you for building with us! 🚀
