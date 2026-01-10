# Test Plan: Pip-Boy Intro & Visuals

**Objective**: Verify the reliability of the boot sequence, the correctness of the Vault Boy assets, and the visual integrity of the retro CRT effects.

## 1. Test Scope
- **Components**: `PipBoyIntro.vue`, `SplashScreen.vue`, `SiteHeader.vue`
- **Context**: Boot sequence, home page dashboard, and global navigation.

## 2. Recent Changes & Fixes
- **Visibility Fix**: Implemented `<Teleport to="body">` and `z-index: 2147483647` to prevent the intro from being obscured.
- **Timing Fix**: Replaced `setTimeout` with `Date.now()` polling to prevent animation skipping.
- **Asset Replacement**: Replaced "CODEGOZER" text/logo with Vault Boy mascots.
- **Image Repair**: Renamed mislabeled `.png` assets to `.jpg` and applied `mix-blend-mode: screen` to simulate transparency.
- **Splash Differentiation**: Used a "Clean" (cropped, no text) Vault Boy for the Splash Screen vs. the "OKAY!" (text included) version for the Intro.
- **Splash Navigation**: Converted static side-nav buttons to working `NuxtLink`s.

## 3. Test Cases

### 3.1 Intro Sequence (Boot)
| Step | Action | Expected Behavior | Status |
|------|--------|-------------------|--------|
| 1 | Load/Refresh Page | Screen turns black immediately. Intro container overlays everything. | **PASS** |
| 2 | "Static" Stage | Noise animation plays. Scanline sweeps down. | **PASS** |
| 3 | "Diagnostics" Stage | Text types out ("INITIALIZING...", etc.). | **PASS** |
| 4 | "Mascot" Stage | **Vault Boy with "OKAY!" text** (`vault-boy-intro.jpg`) appears. | **PASS** |
| 5 | Completion | Intro turns off (TV collapse effect) after ~4s total. | **PASS** |

### 3.2 Splash Screen (Dashboard)
| Step | Action | Expected Behavior | Status |
|------|--------|-------------------|--------|
| 1 | Wait for Intro End | Main Dashboard (`SplashScreen.vue`) becomes visible. | **PASS** |
| 2 | Mascot Check | Central image is **Vault Boy "Clean" (No Text)** (`vault-boy-clean.jpg`). | **PASS** |
| 3 | Visual Check | Image black background is transparent (`mix-blend-mode: screen`). Pixelation is crisp (`image-rendering: pixelated`). | **PASS** |
| 4 | **Navigation Check** | Click "SKILLS" -> `/skills`. Click "PROJECTS" -> `/quests`. Click "CONTACT" -> `/profile`. | **PASS** |

### 3.3 Site Header
| Step | Action | Expected Behavior | Status |
|------|--------|-------------------|--------|
| 1 | Navigate to Sub-page | Go to `/quests` or `/skills`. | **PASS** |
| 2 | Logo Check | Header logo is the **Vault Boy Head** (Intro version, scaled down). | **PASS** |

## 4. Technical Verification
- **Verify Files**:
    - `public/vault-boy-intro.jpg` (Exists, Magic Bytes: FF D8)
    - `public/vault-boy-clean.jpg` (Exists, Magic Bytes: FF D8, Cropped)
- **Verify Styling**:
    - `.mix-blend-screen` class is present on all JPG assets in Vue components.
    - `Teleport` tag wraps the intro in `PipBoyIntro.vue`.

## 5. Known Issues
- **Inline Styles**: `PipBoyIntro.vue` currently uses `!important` inline styles for the root container as a temporary measure to guarantee visibility. This is marked with a `TODO`.
