# Test Plan: Pip-Boy Skills Page

**Objective**: Verify the functionality, layout, and "retro" feel of the new Skills page.

## 1. Test Scope
- **Component**: `pages/skills.vue`
- **Route**: `/skills`
- **Features**: Two-Pane Layout, S.P.E.C.I.A.L. Stats, Proficiency Bars, Interactive Details.

## 2. Expected Behavior

### 2.1 Visual Layout
- **Container**: Should be framed within the standard Pip-Boy bezel.
- **Header**: Should display the global `SiteHeader`.
- **Sub-Nav**: Should show "STATS | ITEMS | DATA" tabs, with "STATS" active.
- **Grid**:
    - **Left Pane**: Vertical list of skills with blocky progress bars.
    - **Right Pane**: Contextual details (Avatar, Description, Stats).

### 2.2 Data Verification
- **S.P.E.C.I.A.L. Row**: Should show S(4), P(8), I(9), C(7).
- **Skill List**:
    - "VUE.JS" [95%] [TAG]
    - "REACT" [85%]
    - "UI / UX" [80%] [TAG]
    - "TYPESCRIPT" [90%]
    - "PROJECT MGMT" [75%]

### 2.3 Interaction
- **Hover/Click**: Hovering or clicking a skill in the left pane should:
    - Highlight the list item (green background/glow).
    - Update the **Right Pane Title** to match the skill name.
    - Update the **Right Pane Description**.
    - Show the correct "Effect" and "Requirement".

### 2.4 Responsiveness
- **Mobile (< 768px)**:
    - Layout should stack (List on top, Details below, or toggleable).
    - Text size should adjust to remain readable.
    - Bezel padding should decrease.

## 3. Manual Test Steps
| Step | Action | Expected Result | Status |
|------|--------|-----------------|--------|
| 1 | Navigate to `/skills` | Page loads inside CRT shell. Default skill (VUE.JS) details shown. | |
| 2 | Check Stats | Verify S.P.E.C.I.A.L. stats across top. | |
| 3 | Hover "UI / UX" | List item glows. Right pane updates to "UI / UX" title + Description. | |
| 4 | Click "TYPESCRIPT" | Selection persists. Effect shows "-40% Runtime Errors". | |
| 5 | Mobile View | Resize browser width. Layout stacks gracefully. | |

## 4. Known Issues / To-Do
- **Sound Effects**: Not yet integrated (Pending `usePipBoySounds` implementation).
- **Avatar**: Currently using static `vault-boy-intro.jpg`. Needs dynamic or localized avatars per skill if desired.
