# Test Plan: Pip-Boy Intro Animation

**Objective**: Verify that the Pip-Boy intro animation plays correctly for every user session to mimic a "new user" experience, including on page refresh.

## 1. Test Scope
- **Component**: `PipBoyIntro.vue`
- **Context**: Application initialization in `app.vue`.
- **Environment**: Local development (localhost:3000) and production build.

## 2. Expected Behavior
1.  **Initial Load**: When a user visits the site, the intro sequence (Please Stand By screen) should appear immediately.
2.  **Duration**: The intro should remain visible for approximately 4 seconds.
3.  **Transition**: The intro should exit with a CRT "turn-off" animation (collapsing into a horizontal line/dot).
4.  **Content Reveal**: After the animation, the main portfolio content should be visible.
5.  **Refresh/Reload**: If the user refreshes the browser, the sequence should repeat from step 1. No persistence (cookies/localStorage) should prevent it from playing.

## 3. Verification Steps (Manual)
1.  Open the browser to the root URL `/`.
2.  Observe the first 5 seconds.
    - *Pass Criteria*: "Please Stand By" image is visible.
3.  Wait for the main content to appear.
4.  Press F5 or click the Refresh button.
5.  Observe immediate feedback.
    - *Pass Criteria*: The screen turns black/intro appears immediately, covering the main content again.

## 4. Automated Verification Results (2026-01-10)
- **Status**: PASSED
- **Findings**:
    - The `showIntro` ref in `app.vue` initializes to `true` on every mount.
    - Browser automation confirmed the presence of the intro container `div.fixed.bg-black` immediately upon reload.
    - Resource `please-stand-by.png` is requested and loaded.

## 5. Known Issues / Notes
- User reported a visual bug (black screen with green tint) where the image might not be distinct enough. This is a visual refinement task, separate from the logic test.
