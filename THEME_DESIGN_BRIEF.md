# Hytale F2P Launcher – Theme Design Brief

## 1. Executive Summary
This document serves as the architectural blueprint for the Hytale F2P Launcher's theming system. The goal is to allow radically different visual experiences—from minimal terminal interfaces to rich, animated game-like dashboards—while strictly preserving the core usability and functionality of the application.

**Philosophy:** Themes are alternate *visual identities* for the same *functional core*.

---

## 2. Functional Contract (Unbreakable)
No matter how wild a theme looks, the user **must** always be able to perform these core actions without confusion or excessive navigation depth.

### Core Actions
| Action | Requirement | Context |
| :--- | :--- | :--- |
| **Launch Game** | Must be the most prominent action on the "Play" page. | Play Page |
| **Install/Update** | Must show clear progress (%). Cannot be hidden. | Play Page / Overlay |
| **Navigate** | Access to: Play, Mods, News, Chat, Settings, Logs. | Global (Sidebar/Menu) |
| **Window Control** | Minimize and Close buttons must always be clickable. | Global (Top Right/Left) |
| **Profile Switch** | View active profile and switch identities. | Global (Header) |

### Input Methods
*   **Mouse:** Primary interaction. Hover states are mandatory for all clickable elements.
*   **Keyboard:** Basic tab navigation support (inherited from DOM order).
*   **Drag:** Top region of the window (approx 30-50px) must be draggable.

---

## 3. UX Invariants (Non-Negotiable Rules)

1.  **Draggable Region:** 
    *   The OS window frame is hidden (`frame: false`). 
    *   **Rule:** The theme *must* reserve space at the top (or a designated handle) with `-webkit-app-region: drag`.
    *   **Exception:** Interactive buttons (Close, Minimize, Profile) within this region must be marked `-webkit-app-region: no-drag`.

2.  **State Feedback:**
    *   **Interactive:** Buttons must visually react to `hover` and `active` (click) states.
    *   **Disabled:** The Play button must look visually disabled (dimmed, grayscale) when the game is launching or updating.
    *   **Active Page:** The current navigation item must be visually distinct from inactive ones.

3.  **Legibility:**
    *   Text contrast ratios must be maintained.
    *   If a theme changes the background to white, it must override text colors to black.

4.  **Z-Index Stratification:**
    *   **Content (Layer 10):** Pages (`.page`).
    *   **Chrome (Layer 20):** Sidebar (`.sidebar`), Window Controls.
    *   **Modals (Layer 100+):** Profile Manager, Theme Selector.
    *   **Overlays (Layer 999+):** Update Progress, unexpected errors.

---

## 4. Creative Freedom Matrix

| UI Component | Classification | Description & Constraints |
| :--- | :--- | :--- |
| **Background** | **Fully Free** | Image, video, CSS gradient, or canvas. Can filter/blur based on state. |
| **Play Button** | **Fully Free** | Shape (Rectangle, Circle, Hexagon), Position (Center, Bottom-Right), Animation (Pulse, Glow). |
| **Sidebar** | **Flexible** | Can be a vertical sidebar (Left/Right), a horizontal dock (Bottom), or a menu bar (Top). |
| **Nav Items** | **Flexible** | Can be Icons only, Text only, or Icon + Text. Shapes and spacing are customizable. |
| **Font Family** | **Fully Free** | Headers (`.game-title`) and Body text can use custom web fonts. |
| **Window Controls**| **Anchored** | Locations can shift slightly, but icons must remain recognizable (-, x). |
| **Profile Selector**| **Anchored** | Logic is complex; visual container can change, but the dropdown behavior is fixed. |

---

## 5. Layout Mutation Guidelines

The system supports structural layout changes via the `data-layout` attribute on the `.app-layout` container.

### Supported Layout Modes
1.  **Standard (Default):**
    *   **Structure:** Sidebar Left (80px), Content Right (Flex 1).
    *   **Best For:** Classic dashboard look.

2.  **Dock Mode (`sidebar-bottom`):**
    *   **Structure:** Sidebar becomes a bottom footer (Height ~90px), Content Top.
    *   **Changes:** Nav items align horizontally (`flex-direction: row`). Logos usually hidden.
    *   **Best For:** Modern, "Mac-like" or Console aesthetic.

3.  **Menu Bar (`sidebar-top`):**
    *   **Structure:** Sidebar becomes a condensed top header (Height ~60px).
    *   **Changes:** Nav items horizontal. Integrated with window controls.
    *   **Best For:** Minimalist, productivity-focused themes.

4.  **Inventory/Rail (`sidebar-left-inventory`):**
    *   **Structure:** Extremely thin left rail (Icon only).
    *   **Changes:** Tooltips become critical for identifying tabs.
    *   **Best For:** Immersive themes (Minecraft/Terraria) where screen real estate is key.

---

## 6. Component Re-Imagination Rules

### The "Play" Button (`#homePlayBtn`)
This is the heart of the launcher.
*   **Text content is dynamic:** It changes from "PLAY" to "INSTALL" to "LAUNCHING...".
*   **Designer Tip:** Use CSS Grid/Flexbox to center the text span regardless of button shape.
*   **Examples:**
    *   *FPS Theme:* Skewed parallelogram with aggressive borders.
    *   *Cozy Theme:* A wooden signpost image.
    *   *Minimal:* A simple text link with an underline underline animation.

### The Navigation (`.sidebar-nav`)
*   **Icons (`<i>`):** Can be replaced or hidden.
*   **Tooltips (`.nav-tooltip`):** Mandatory for icon-only layouts. Position must adapt to the sidebar location (e.g., if Sidebar is Bottom, Tooltip must appear *Above*).

### The Game Title (`.game-title`)
*   Can be hidden if the background image already contains a logo.
*   Can be animated (glitch effect, slide-in).

---

## 7. Technical Implementation (Theme System)

Themes are defined in JSON and applied via CSS Variables and Dataset attributes.

### JSON Schema (`themes/my-theme.json`)
\`\`\`json
{
  "id": "my-theme",
  "name": "My Custom Theme",
  "layout": "sidebar-bottom",
  "colors": {
    "primary": "#ff0000",
    "background": "#000000"
  },
  "fonts": {
    "primary": "'MyCustomFont', sans-serif"
  },
  "playButton": {
    "background": "red",
    "transform": "skew(-10deg)"
  }
}
\`\`\`

### CSS Architecture
1.  **Global Variables (`:root`):** Define defaults.
2.  **Theme Scope (`[data-theme="id"]`):** Overrides variables and applies specific component styles.
3.  **Layout Scope (`[data-layout="type"]`):** Handles Flexbox/Grid structural changes only.

---

## 8. Extreme "Safe" Examples

### Concept A: "Terminal_V1"
*   **Layout:** `sidebar-left`
*   **Style:** Monospace green text on black. No borders.
*   **Play Button:** `[ EXECUTE ]` (Text only, bracket borders appear on hover).
*   **Safety:** Active tab is highlighted with a `>` character (via `::before`).

### Concept B: "Nether Portal"
*   **Layout:** `sidebar-bottom` (Center aligned icons)
*   **Style:** Animated purple fog background. Glassmorphism panels.
*   **Play Button:** A glowing purple orb floating in bottom right.
*   **Safety:** High contrast white icons on the glass panels.

### Concept C: "Tactical Ops" (Valorant)
*   **Layout:** `sidebar-top`
*   **Style:** Sharp angles, red accents, white background.
*   **Play Button:** Huge, skewed button in center screen (moved via absolute position).
*   **Safety:** Window controls integrated into the top menu bar red accents.
