<table width="100%" border="0" style="border:none; border-collapse:collapse;">
  <tr>
    <td style="border:none;"><strong>C240 - Lesson 11</strong></td>
    <td style="border:none;" align="right"><img src="https://raw.githubusercontent.com/codeblazar/FileImageShare/main/Branding/RPnoTag.png" height="40"></td>
  </tr>
</table>

---

# Activity 01 - Plan, Build, and Debug a Pomodoro App (VS Code Copilot Chat)

**Name:** _(qiu zhitao)_
**Student ID:** _(24042078)_

---

## ⏱️ Duration

- 70 minutes
- All tables to be completed
- Complete and submit individually

---

## 🎯 Overview

In this activity you will:

- Create a `.github/copilot-instructions.md` file with three project rules of your own so Copilot Chat writes the kind of code you want
- Plan a multi-file project **before writing any code**, by asking Copilot Chat (in **Plan** mode) for a plan-only response
- Scaffold and build a Pomodoro web app feature by feature, starting a fresh chat session between features
- Let Copilot Chat drive VS Code's **built-in browser** (Playwright) so it can screenshot, click, and read the console of your running app
- Use Playwright to stress-test your app and practise **observational debugging** - asking the AI to *observe* before it guesses
- Write one tiny test and read its result
- Reflect on which model **Copilot Fusion** picked at each phase and where a manual override was tempting

---

## 📋 The Brief (recap of the lecture)

**FocusForge** pitches investors on Friday. They want a no-framework Pomodoro web app: 25-minute work block, 5-minute break, pause / resume / reset, circular progress visual, a sound on every transition, and a session counter that survives a page reload. Three files only - `index.html`, `style.css`, `app.js`. No build step.

One prompt will not get you there. You will plan, scaffold, build feature by feature, and when something breaks (it will) you will give Copilot Chat **eyes** with VS Code's built-in browser (**Playwright**) so it can see the bug instead of guessing.

> 🔗 **Reference build:** a working example of what you are aiming for is live at [https://codeblazar.github.io/pomodoro/](https://codeblazar.github.io/pomodoro/). Have a quick look so you know what "done" looks like - then build your own.

---

## 🔁 Reference: The Loop You Will Use Today

Every feature in this activity follows the same five-step rhythm:

1. Click the **+** at the top of the chat panel to **start a fresh chat** session (cheap context).
2. **Attach** the file or files the model needs (click **+** at the bottom left of the chat input and pick the file).
3. Write a clear, narrow prompt. Read the model line that comes back.
4. Read the diff. **Keep** or **Undo**. Run the app.
5. One-line journal entry: which model **Copilot Fusion** picked, what worked, what you would change.

Read every diff. Stay on **Copilot Fusion**. Override only when you can defend it.

---

## 🛠️ Exercise 1 - Setup (3 min)

You should already have **GitHub Copilot Chat** and **Live Server** installed and signed in from Lesson 10. If not, install them first (Extensions view: `Ctrl+Shift+X`).

1. In VSCode, open a new integrated terminal (``Ctrl+` `` - that is Ctrl plus the backtick key).
2. Create a fresh project folder for today and move into it. The VS Code terminal (PowerShell) is fine for these commands:

   ```
   mkdir C:\Users\<your user>\Documents\c240\projects\lesson11
   cd C:\Users\<your user>\Documents\c240\projects\lesson11
   ```
3. Open the folder in VSCode: `File > Open Folder...` and select `lesson11`. This is now your **workspace**.
4. Initialise an empty git repo so you can read clean diffs as you go:

   ```
   git init
   git commit --allow-empty -m "lesson 11 start"
   ```
5. Open the Copilot Chat panel (`Ctrl+Alt+B` opens the Secondary Side Bar). Confirm **Copilot Fusion** is your model in the model picker at the bottom of the chat input box. Fusion picks a model for each task based on how complex it is, so leave it selected.

   > **Note:** You may see a tip above the input (for example about `/fork`). **Ignore it for this lesson.**
   >

![Copilot Chat model picker showing Copilot Fusion](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/01-model-picker-fusion.png)

| Step                                                                   | Result |
| ---------------------------------------------------------------------- | ------ |
| `lesson11` folder created and opened as the VS Code workspace        | yes    |
| `git init` ran without errors                                        | yes    |
| Copilot Chat panel is visible and **Copilot Fusion** is selected | yes    |

---

## 📝 Exercise 2 - Project Instructions (5 min)

VS Code Copilot Chat reads a file called `.github/copilot-instructions.md` from your workspace and applies it to every chat turn. This is your **project memory**: rules the model should follow whenever it writes code in this project.

**Mission:** make Copilot Chat know your house style for this project.

**Think First:**

| Question                                                      | Your Answer |
| ------------------------------------------------------------- | ----------- |
| What should Copilot Chat **never** do in this project?  |             |
| What should Copilot Chat **always** do in this project? |             |
| Which of the rules above is the model most likely to forget?  |             |

**Try It:**

1. In the **Explorer** panel on the left (the top icon in the Activity Bar, or `Ctrl+Shift+E`), hover over your **LESSON11** workspace row. Four small icons appear on the right of that row: **New File**, **New Folder**, **Refresh**, **Collapse**. Click the **New Folder** icon (the folder with a `+`) and name the folder exactly `.github` (with the leading dot). Press **Enter**.
2. Click the new `.github` folder once to select it, then click the **New File** icon (the page with a `+`) on the workspace row. Name the file exactly `copilot-instructions.md`. Press **Enter** - the file opens in the editor, ready to type into.

   > **Tip:** if the new file lands at the workspace root instead of inside `.github`, drag it onto the `.github` folder in the Explorer to move it. You can also right-click the `.github` folder → **New File** as an alternative.
   >
3. Open the file and write a short header plus a `## House rules` section with **three rules of your own**. Examples (do not copy verbatim, write your own):

   - "No frameworks. Vanilla JS only."
   - "Browser-only. No Node APIs."
   - "Comments only when the why is non-obvious."
   - "Three files: `index.html`, `style.css`, `app.js`. Do not create others without asking."
4. Save (`Ctrl+S`). In the Copilot Chat panel, send a short prompt such as `What are the house rules for this project?` The reply should list your rules. Click **Completed ... steps** above the reply to see which model **Copilot Fusion** chose for that turn.

5. Commit:

   ```
   git add .github/copilot-instructions.md
   git commit -m "project instructions with house rules"
   ```

> **Tip:** Keep instructions short. Long, vague rules get ignored. Three crisp rules beat ten waffly ones.

**Checkpoint:**

| Item                                                             | Result |
| ---------------------------------------------------------------- | ------ |
| `.github/copilot-instructions.md` exists at the workspace root | no     |
| Your three rules are in your own words                           | yes    |
| Copilot Chat listed your house rules when you asked              | yes    |

**Reflect:**

| Question                                                                             | Your Answer                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Which of your three rules do you think the model is most likely to break first? Why? | The “three files only” rule is most likely to be broken first, especially in a scaffolding or debugging task where tests, assets, or documentation seem useful. Models often add extra files by default unless the constraint is kept explicit. The Browser-only/Vanilla-JS rules are also easy to violate with convenience APIs or framework-style patterns, but they are easier to catch in a code review. |

---

## 🗺️ Exercise 3 - Plan First (10 min)

Before any code, you will get Copilot Chat to produce a **file-by-file plan**. Note which complexity **Copilot Fusion** gives the plan turn. The aim is a plan you would actually follow, not one you have to argue with.

**Mission:** end this exercise with a `PLAN.md` you would happily build from.

**Think First:**

| Question                                                                               | Your Answer |
| -------------------------------------------------------------------------------------- | ----------- |
| What does a *good* plan include? List three things.                                  |             |
| How will you phrase your prompt so Copilot Chat produces **plan only**, no code? |             |

**Try It:**

1. Click the **+** button at the top of the chat panel to start a fresh chat session.
2. Below the chat input, click the mode button (it shows **Interactive**). The **Agent mode** menu opens. Choose **Plan**. Plan mode keeps Copilot Chat from writing files while you shape the plan.

3. Ask Copilot Chat for a plan only. A useful prompt looks roughly like this (write your own version):

   > Plan only, no code. We are building a Pomodoro web app: 25-minute work, 5-minute break, pause / resume / reset, circular progress, sound on transition, session counter persisted to localStorage. Three files: `index.html`, `style.css`, `app.js`. List each file with its responsibilities and the function signatures you would create. End with a sensible build order.
   >
4. Read the response. Note which model **Copilot Fusion** chose (shown above the response).GPT-6luna
5. In **Plan** mode the model may ask you clarifying questions before finalising the plan. Answer them honestly - this is where your project takes shape.

   ![Plan mode asking clarifying questions](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/04b-plan-questions.png)
6. When the plan is ready, Copilot shows **Plan review required** with a **Review Plan** box. Below it are **Implement with Autopilot** and **Reject**. Click **Open Full Plan** (top right of the box). The full plan opens in a new editor tab called `plan.md`.

   ![Plan review required, with the Review Plan box](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/04c-review-plan.png)

   > **Heads up:** this `plan.md` is kept in Copilot's own session folder, not in your workspace. We will copy it into a real `PLAN.md` in your project instead.
   >
7. **Copy the plan out.** Click anywhere inside the `plan.md` tab, then press `Ctrl+A` (select all) and `Ctrl+C` (copy).
8. **Create `PLAN.md` yourself.** In the Explorer panel, hover over the **LESSON11** workspace row and click the **New File** icon. Name it exactly `PLAN.md` and press Enter. The empty file opens.
9. **Paste and save.** `Ctrl+V` to paste the plan into `PLAN.md`, then `Ctrl+S` to save. Close the `plan.md` tab when done (the content is safely in your `PLAN.md`).
10. **Critique it.** Read each line of `PLAN.md` and edit anything you would change. The plan is yours, not the model's.

    > **Tip:** to read the plan with proper markdown formatting (headings, lists, code blocks rendered nicely - as we did in Lesson 01), right-click `PLAN.md` in the Explorer → **Open with markdown editor** (`Ctrl+Shift+Alt+M`).
    >
11. Switch the mode back to **Interactive** (click **Plan** below the chat input and choose **Interactive**) before the next exercise.

> **Tip:** do **not** click **Implement with Autopilot** yet - that tells Copilot to start coding straight away, which skips the critique step. The whole point of Plan mode is to shape the plan *before* code is written.

**Checkpoint:**

| Item                                                                   | Result |
| ---------------------------------------------------------------------- | ------ |
| `PLAN.md` exists with file list, responsibilities, and a build order | yes    |
| You edited at least one line of the plan                               | yes    |
| Model **Copilot Fusion** picked for the plan turn                | yes    |

**Reflect:**

| Question                                                                                                                 | Your Answer |
| ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| What did you change about the model's plan, and why?                                                                     |             |
| What complexity did **Copilot Fusion** give the plan turn (low, medium or high)? Did that match what you expected? |             |

---

## 🏗️ Exercise 4 - Scaffold (7 min)

Now turn the plan into empty files and stubs. Note which complexity **Copilot Fusion** gives the scaffold turn.

**Mission:** the three files exist with empty function stubs that match `PLAN.md`. The page loads in a browser without errors.

**Try It:**

1. Click the **+** at the top of the chat panel to start a fresh chat session.
2. Click **+** at the bottom left of the chat input and choose `PLAN.md` from the list so it is **attached** as context. A `PLAN.md` chip appears above your prompt.
3. Check the mode below the chat input says **Interactive**. A first prompt could be:

   > Scaffold the three files according to the attached `PLAN.md`. Empty function bodies. No timer logic yet. Make sure `index.html` loads `style.css` and `app.js` and shows a placeholder timer label.
   >

   ![Scaffold prompt being sent in Interactive mode](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/05-scaffold-prompt.png)
4. Read the diff carefully - then accept it.

   - To accept **all** of Copilot's changes at once: click the green **Keep** button at the bottom of the chat panel (next to **Undo**).
   - To accept **some but not all** changes: in the editor, each changed block has its own small **Keep** / **Undo** controls - click **Keep** on the blocks you want and **Undo** on the rest.

   For this scaffold step, reading the diff and clicking the chat-panel **Keep** is fine.

![Keep / Undo controls in the editor](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/06-keep-undo-controls.png)

5. Right-click `index.html` → **Open with Live Server** (or click **Go Live** in the status bar). Confirm the page loads at `http://127.0.0.1:5500/index.html` with **no** console errors (open DevTools with `F12`). A red `favicon.ico` 404 error is harmless - the page simply has no tab icon - so ignore it.

   ![Placeholder page loaded via Live Server](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/07-live-server-placeholder.png)
6. Commit:

   ```
   git add .
   git commit -m "scaffold from PLAN.md"
   ```

**Checkpoint:**

| Item                                                        | Result |
| ----------------------------------------------------------- | ------ |
| Three files exist                                           |        |
| `index.html` loads via Live Server with no console errors |        |
| Function names match `PLAN.md`                            |        |
| Model **Copilot Fusion** picked for the scaffold turn |        |

---

## 🚀 Exercise 5 - Build Features (18 min)

Build one feature per session. Click the **+** at the top of the chat panel between features. **This is the core habit of the lesson**. **Each fresh session = a cleaner context.**

![The + (new chat) button at the top of the chat panel](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/05-new-chat-button.png)

Recommended order (you may reorder if your `PLAN.md` says otherwise):

1. Work timer countdown and display.
2. Pause / resume / reset.
3. Auto-switch from work to break and back.
4. Circular progress visual.
5. Sound on transition.
6. Session counter persisted to `localStorage`.

For **each** feature:

1. Click the **+** at the top of the chat panel for a fresh chat session.
2. **Attach the files Copilot needs to read.** For most features that is just `app.js` (the timer logic lives there). For the circular progress feature you will also want `index.html` and `style.css` attached because the ring needs DOM and CSS changes too. **Rule of thumb:** attach the file you expect Copilot to *edit*, plus any file it needs to *read* to do that edit correctly. Do not attach `PLAN.md` here unless you want it to re-read the plan - the scaffold already encoded it.
   - **How to attach:** open the file in the editor first (click it in the Explorer), then click **+** at the bottom left of the chat input and pick it from the list. Repeat for each file. (If the file is open in the editor, Copilot may also suggest it as a faint chip above the prompt box - click the chip to attach it.) The attached file appears as a chip above the prompt box.
3. Stay in **Interactive** mode. Prompt → read the diff → click **Keep** or **Undo** → save and let Live Server reload to test in the browser.
   - If Copilot stops and asks to **run a command in the terminal** (with **Allow Once**, **Skip** and **Explain** buttons), read what it wants to run. **Allow Once** is fine for a quick check of your code; click **Skip** if you are not sure.

     ![Run in terminal prompt with Allow Once, Skip and Explain](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/09-run-in-terminal.png)
4. Fill in the row in the table below.

**Worked example - Feature 1 (Work timer countdown):**

For the very first feature, here is a prompt you can use as a starting point. Read it, adapt it to match the function names in your own `PLAN.md`, then send it.

> Implement the work-timer countdown in the attached `app.js`. Requirements:
>
> - 25-minute work duration, stored as a constant in seconds.
> - A `startTimer()` function that begins counting down once per second.
> - Update the timer label in the DOM each tick in `MM:SS` format (e.g. `24:59`, `24:58`).
> - When the countdown reaches `00:00`, stop the interval and log "work complete" to the console. Do **not** add the break phase yet - we will do that in a later feature.

After Copilot responds: read the diff carefully, click **Keep**, save, and watch Live Server reload. Click your start button - the timer should count down from `25:00`.

![Copilot's reply after a feature prompt, with Keep / Undo](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/09-feature-reply-keep.png)

**Reading the diff - what you are looking at:**

After a feature prompt, Copilot applies edits *but does not commit them yet*. The editor shows you the changes inline so you can review and accept (or reject) before they are written for good. There are **two Keep controls**, plus the green highlighting:

| Where it is                                                                                 | What it does                                                                                                                                        | When to use it                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Editor bottom bar** - **Keep / Undo / 1 of N / ↑ ↓**                        | Walks through the changes one block at a time. **Keep** accepts that block; **Undo** rejects it; the arrows move you to the next block. | When you want to **cherry-pick** - keep most changes but reject one or two.                                        |
| **Chat-panel bottom-right** - **Keep / Undo** (next to "1 file changed +48 -0") | Accepts (or rejects) **all** of Copilot's changes at once.                                                                                    | When you have read every change and want them all kept. **For most of this lesson, this is the button you click.** |
| **Green highlighted lines in the editor**                                             | Visual marker only - shows which lines Copilot added. Red would mean removed, but a fresh feature usually only adds.                                | Just for reading.                                                                                                        |

**The discipline:** *first* scroll through the editor and read every change - including the ones you cannot see without scrolling. *Then* click the chat-panel **Keep**. Clicking Keep before reading is how confident-but-wrong code lands in your file.

> **Notice what is *not* in that prompt:** "no frameworks", "vanilla JS only", "comments only when the why is non-obvious". Those rules already live in `.github/copilot-instructions.md` and Copilot reads that file every turn. Repeating house rules in every prompt clutters the message and teaches you not to trust your own project memory. **Write rules once, in the instructions file. Write per-feature requirements in the prompt.**

---

**Prompt scaffolding for the remaining features (fading help):**

The worked example above gave you a full prompt. For the rest, the help **gradually reduces** - by Feature 6 you should be writing the whole prompt yourself. This is deliberate: prompt-writing is the skill we are training.

**Feature 2 - Pause / Resume / Reset** *(most of the prompt is provided - fill in the one missing bullet)*

> Implement pause, resume, and reset controls in the attached `app.js`. Requirements:
>
> - `pauseTimer()` stops the countdown. The remaining time stays where it is.
> - Calling `startTimer()` while paused resumes from the remaining time (do not restart from `25:00`).
> - **`resetTimer()` should: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_** *(you write this - think about what state needs to change and what the user should see)*
> - Wire the Pause and Reset buttons to these functions. Do not change anything else.

**Feature 3 - Auto-switch work ↔ break** *(requirements list given - you write the prompt)*

Write a prompt that asks Copilot to make the timer auto-switch phases at `00:00`. Your prompt should cover these requirements (you decide the wording and order):

- Track the current phase (`"work"` or `"break"`).
- At `00:00`: switch phase and load the matching duration (5 minutes for a break, 25 minutes for work). Keep the countdown running.
- Display the current phase in the DOM next to the timer (label changes to "Work" or "Break").
- Reset always returns to `"work"` phase.
- Do **not** add sound, progress ring, or persistence yet.

> **Hint:** attach `index.html` as well as `app.js` for this one - the phase label needs DOM markup.

**Feature 4 - Circular progress ring** *(goal sentence only - you decide the requirements and write the prompt)*

> **Goal:** add a circular SVG ring around the timer that empties as the countdown progresses, and resets cleanly on phase change.

Decide for yourself: which files to attach, how the ring is structured (SVG? two circles? `stroke-dasharray`?), how the progress value is passed from JS to CSS, and what the prompt should say. Write the prompt and send it.

> **Hint:** if you are stuck, search "SVG circular progress stroke-dashoffset" - you only need the technique, not a copy-paste solution.

**Feature 5 - Sound on transition** *(one-line nudge only)*

> **Nudge:** browsers block audio until the user has clicked something. Plan around that.

Write your own prompt. Aim for short, distinct tones (e.g. WebAudio sine-wave beeps - no audio files). Use a different tone for work→break vs break→work. Also ask for a very short click beep whenever **any** button (Start, Pause, Reset) is pressed - that way you can hear the sound working straight away instead of waiting 25 minutes for a phase to end.

**Feature 6 - Session counter persisted to localStorage** *(no help - you are on your own)*

Look at the **Mission** for this exercise (top of the section) and write the prompt yourself. Decide what to attach, what state to track, when to write to `localStorage`, and what to render in the DOM.

**How to test it without waiting 25 minutes:** in your app's browser tab, press **F12**, click the **Console** tab, click on the empty line next to the `>`, paste the line below and press Enter. The console shows `undefined` - that is normal and means it worked.

```
localStorage.setItem("completedSessions", "3")
```

![The Console tab after running localStorage.setItem - undefined means it worked](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/10-console-localstorage.png)

Now refresh the page (**F5**). Your counter should show **3**. (Use the same key name your code uses - if Copilot picked a different name than `completedSessions`, check `app.js`.)

![After refreshing, Completed sessions shows 3](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/10b-counter-shows-3.png)

> **Reminder for every feature:** fresh chat (**+**), narrow attachment, read every diff, **Keep**, save, test in the browser, `git commit` before the next feature. If a later feature breaks something, `git diff` tells you which one.

![Example of a per-feature prompt in chat](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/10-feature-prompt-example.png)

For the remaining features, write your own prompts in the same shape: **what file, what behaviour, what to leave alone, one feature at a time**.

| # | Feature                        | Done? (yes/no) | Model **Copilot Fusion** picked | One thing that worked or did not |
| - | ------------------------------ | -------------- | ------------------------------------- | -------------------------------- |
| 1 | Work timer countdown           |                |                                       |                                  |
| 2 | Pause / resume / reset         |                |                                       |                                  |
| 3 | Work to break auto switch      |                |                                       |                                  |
| 4 | Circular progress              |                |                                       |                                  |
| 5 | Sound on transition            |                |                                       |                                  |
| 6 | Session counter (localStorage) |                |                                       |                                  |

> **Tip:** if you forget to start a fresh session, the chat fills with old context from earlier features. The fix is the **+** button at the top of the chat panel.

**Personalise the app (so your screenshot has your name on it):**

Once your six features are working, open `index.html` and change the visible heading (the `<h1>` line - Copilot may have called it something like `Pomodoro timer`) to **`Pomodoro by <Your Name>`** (replace `<Your Name>` with your actual name). Save - Live Server will reload, and the page now shows your name. Your final screenshot in Submission will include it. **No need to ask Copilot for this** - it is a one-line edit in `index.html`.

**Checkpoint:**

| Item                                                                                                                                                 | Result |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Timer counts down 25 minutes and switches to a 5-minute break                                                                                        |        |
| Pause, resume, and reset all work                                                                                                                    |        |
| A short beep plays when you press any button, and a sound plays on each transition (after the first user click - browsers block autoplay until then) |        |
| Session counter survives a browser refresh                                                                                                           |        |
| Page heading reads `Pomodoro by <Your Name>` with your actual name                                                                                 |        |

**Reflect:**

| Question                                                                                                                     | Your Answer |
| ---------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Which feature did **Copilot Fusion** rate the most complex? Was the prompt clear, or was it carrying too much context? |             |
| Did you ever skip the fresh-session step and regret it? What happened?                                                       |             |

---

## 🎭 Exercise 6 - Let Copilot See Your App (5 min)

VS Code now has its own built-in browser, and Copilot Chat can drive it with **Playwright** - open your app, take screenshots, click buttons, and read the console. This gives Copilot Chat **eyes**, which turns debugging from guessing into observing.

**Nothing to install.** You do not need a Playwright extension, an MCP server, or a `.vscode/mcp.json` file - this is built into VS Code.

1. Confirm Live Server is still running (the status bar should say **Port: 5500** rather than **Go Live**). If it has stopped, click **Go Live** again.
2. Start a **new chat** (**+** at the top of the chat panel) and check the mode button below the chat box says **Interactive**.
3. Send this prompt:

   ```
   Open http://127.0.0.1:5500/index.html and take a screenshot. Save it as pomodoro-shot.png in the workspace.
   ```
4. **Approve the prompts.** Copilot asks before it uses the browser. Each prompt appears only the first time in a session:

   - **Open Browser Page?** (or **Navigate Browser?** if the built-in browser is already open) - click **Allow in this Session**.
   - **Run Playwright Code?** (with a warning that it runs code from an untrusted source) - this is the code Copilot just wrote to drive the browser. Click **Allow in this Session**.

   ![Open Browser Page prompt](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/09b-open-browser-page.png)

   ![Run Playwright Code prompt](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/09c-run-playwright-code.png)
5. Copilot replies that it captured the page and saved it as `pomodoro-shot.png`. Confirm the file appears in your project (Explorer).

   ![Copilot's reply after saving the screenshot](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/11b-screenshot-saved.png)

| Step                                                          | Result |
| ------------------------------------------------------------- | ------ |
| Copilot opened the app in VS Code's built-in browser          |        |
| `pomodoro-shot.png` was created by Copilot Chat             |        |
| Model **Copilot Fusion** picked for the screenshot turn |        |

---

## 🐞 Exercise 7 - Stress-test with Playwright *(optional - 10 min)*

The workflow you are practising is called **observational debugging**: instead of asking the AI "what's wrong?", you give it eyes (Playwright) and ask it to *observe* - screenshots, console output, the page - before it guesses. A Pomodoro's work→break switch is 25 minutes away, so this probe tests the fast part instead: pause and resume.

**Think First:**

| Question                                                                                             | Your Answer |
| ---------------------------------------------------------------------------------------------------- | ----------- |
| What does a debug loop look like when the AI has eyes? List the steps in order.                      |             |
| What is the **first** thing you would ask the model to *do* before it guesses what is wrong? |             |

**Try It:**

1. **+** for a fresh debug session. Stay in **Interactive** mode. Attach `app.js`: click it in the Explorer so it is open in the editor, then click **+** at the bottom left of the chat input and pick it (or click the faint `app.js` chip above the chat box). Check `app.js` shows above the chat box before you send.
2. Send this prompt. It asks Copilot to **observe before guessing**, and gives each click a couple of seconds so the app can catch up:

   ```
   Open http://127.0.0.1:5500/index.html, click Start, wait 2 seconds, then click Pause, wait 2 seconds, and click Start again. Repeat Pause and Start 3 times. After each step, take a screenshot and read the console. Do not propose a fix yet - first describe what you observe.
   ```

   Approve any browser prompts the same way as in Exercise 6.
3. Read what Copilot says it saw: the button states, the time on the timer, and any console messages.

![Copilot describing what it observed during a pause/resume probe](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/12-probe-observation.png)

**Reflect:**

| Question                                                                                           | Your Answer |
| -------------------------------------------------------------------------------------------------- | ----------- |
| Describe the observational-debug loop in your own words (3–5 steps).                              |             |
| Why is "observe before guessing" stronger than "what's wrong with this code?"                      |             |
| What did Copilot see during the probe? Did anything surprise you? *(skip if you did not run it)* |             |

---

## ✅ Exercise 8 - One Tiny Test (5 min)

Tests are not the focus of this lesson, but writing **one** test trains the habit of asking the model to interpret a failure instead of guessing.

**Mission:** add one tiny test for the work-to-break transition. Run it. If it fails, have Copilot Chat interpret the output.

**Try It:**

1. Click the **+** at the top of the chat panel to start a fresh session.
2. In **Interactive** mode, with `app.js` attached, prompt Copilot Chat to add a single browser-based test in `test.html` that opens the app, fast-forwards the timer, and asserts the label switches from "work" to "break". Use whatever lightweight assertion style Copilot Chat suggests - no test framework needed.
3. Copilot may open `test.html` in the built-in browser for you. If not, open it via Live Server. Read the result (for example `PASS: Work switches to Break when the timer expires.`). Click **Keep**.
4. If it fails, paste the failure output back into the chat and ask:

   > This test is failing. What is the most likely cause given the current code? Do not propose a fix until you have explained the cause.
   >

| Item                                                         | Result |
| ------------------------------------------------------------ | ------ |
| `test.html` exists                                         |        |
| You ran it and saw a result (pass or fail)                   |        |
| If it failed, Copilot Chat explained the cause before fixing |        |
| Model **Copilot Fusion** picked for the test turn      |        |

> **Tip:** writing the assertion **before** the fix is the same discipline as writing a plan before code. Both stop you from accepting confident-but-wrong output.

![test.html showing a PASS result in the built-in browser](https://raw.githubusercontent.com/codeblazar/FileImageShare/main/PET/C240/Lesson11/13-test-pass.png)

> **A passing test is a valid result.** If the test runs green on the first try, you have not done anything wrong - you have evidence that the work→break transition works. The "ask Copilot to interpret the failure" step is only triggered if the test fails; if it passes, tick the Checkpoint and move on.

---

## 🪞 Reflection (5 min)

This is the most important block. Be honest. We grade engagement with the reflection, not whether your Pomodoro shipped.

| Question                                                                                                                                                             | Your Answer |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Did **Copilot Fusion** ever say a task had *high* complexity? Which task was it?                                                                             |             |
| Which exercise (2-8) used the most AI credits? (The credits used show at the bottom of each reply.) Why do you think that is?                                        |             |
| In which tasks did **Copilot Fusion** say *low* complexity? Which tasks did it rate *medium* or *high*?                                                  |             |
| Did you ever override **Copilot Fusion** with the model picker? If yes, why? If no, was there a moment you wished you had?                                     |             |
| What did Playwright let the model see that you could not have explained in words? *(or, if you skipped Exercise 7: what kind of bug do you think it would catch?)* |             |
| What is one thing about session hygiene (fresh chat, attaching files, narrow prompts) that you will keep doing in Lesson 12?                                         |             |

---

## 📤 Submission

1. Take a final screenshot of your working Pomodoro. The heading should read **`Pomodoro by <Your Name>`** with your actual name visible (you set this at the end of Exercise 5). Save it as `pomodoro-final.png`.
2. Save this worksheet with all tables filled in.
3. Save your `.github/copilot-instructions.md` and `PLAN.md`.
4. Post all four files to the **Lesson 11 channel on Microsoft Teams** before the end of class.

---

*Save this file (`Ctrl+S`) and submit via Microsoft Teams (MST) when done.*

---

<p align="center">© Republic Polytechnic, School of InfoComm</p>
