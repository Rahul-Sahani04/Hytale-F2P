# Game-Inspired Themes for Launcher

## Goal
Add a beautiful, user-friendly themes system to the launcher with game-inspired themes (Minecraft, Valorant, Cyberpunk, etc.). Focus on visual appeal and easy implementation - no complex authentication needed.

## Theme Architecture (Simple & Effective)

### Core Concept
Use CSS variables for theming. Each theme is a JSON file containing colors, fonts, and visual properties. Themes are bundled with the app and instantly switchable.

### File Structure
\`\`\`
launcher/
├── themes/
│   ├── themes.json          [NEW] - Theme registry
│   ├── minecraft.json       [NEW] - Minecraft theme data
│   ├── valorant.json        [NEW] - Valorant theme data
│   ├── cyberpunk.json       [NEW] - Cyberpunk 2077 theme
│   ├── default.json         [NEW] - Original launcher theme
│   └── [GAME_NAME].json     [DYNAMIC] - Add more games
├── backend/
│   └── managers/
│       └── themeManager.js  [NEW] - Theme loading/switching
├── GUI/
│   ├── js/
│   │   └── themes.js        [NEW] - Theme UI logic
│   ├── style.css            [MODIFY] - Add CSS variables
│   └── index.html           [MODIFY] - Add themes section
└── main.js                  [MODIFY] - IPC handlers
\`\`\`

## Theme JSON Schema

Each theme file follows this structure:

\`\`\`json
{
  "id": "minecraft",
  "name": "Minecraft",
  "description": "Blocky, earthy tones inspired by the world of Minecraft",
  "author": "YourStudio",
  "version": "1.0.0",
  "preview": "themes/previews/minecraft.jpg",
  "colors": {
    "primary": "#6B8E23",
    "secondary": "#8B4513",
    "accent": "#FFD700",
    "background": "#2F4F2F",
    "surface": "#3D5C3D",
    "text": "#F5F5DC",
    "textSecondary": "#C8C8A0",
    "border": "#4A6B4A",
    "success": "#7CFC00",
    "error": "#DC143C",
    "warning": "#FFA500"
  },
  "fonts": {
    "primary": "'Mojangles', 'Minecraft', sans-serif",
    "secondary": "Arial, sans-serif",
    "mono": "'Courier New', monospace"
  },
  "effects": {
    "borderRadius": "2px",
    "boxShadow": "0 4px 6px rgba(0, 0, 0, 0.3)",
    "buttonStyle": "pixelated",
    "transitionSpeed": "0.2s"
  },
  "custom": {
    "backgroundPattern": "url('data:image/png;base64,...')",
    "buttonTexture": "stone",
    "scrollbarStyle": "custom"
  }
}
\`\`\`

## Implementation Steps

### Step 1: Create Theme Manager (Backend)

**File: `backend/managers/themeManager.js`**

Required functions:
- `loadThemes()` - Read all JSON files from themes/ directory
- `getThemeById(id)` - Return specific theme data
- `applyTheme(themeId)` - Convert JSON to CSS variables and inject
- `saveUserPreference(themeId)` - Store selected theme in config
- `getCurrentTheme()` - Get active theme

### Step 2: Convert CSS to Variables

**File: `GUI/style.css`**

Replace all hardcoded colors with CSS variables:

\`\`\`css
:root {
  /* Colors */
  --color-primary: #5865F2;
  --color-secondary: #7289DA;
  --color-accent: #FFA500;
  --color-background: #2C2F33;
  --color-surface: #36393F;
  --color-text: #FFFFFF;
  --color-text-secondary: #B9BBBE;
  --color-border: #202225;
  --color-success: #43B581;
  --color-error: #F04747;
  --color-warning: #FAA61A;
  
  /* Typography */
  --font-primary: 'Segoe UI', sans-serif;
  --font-secondary: Arial, sans-serif;
  --font-mono: 'Consolas', monospace;
  
  /* Effects */
  --border-radius: 8px;
  --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  --transition-speed: 0.3s;
}

/* Apply variables to existing styles */
body {
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-primary);
}

button {
  background-color: var(--color-primary);
  color: var(--color-text);
  border-radius: var(--border-radius);
  transition: all var(--transition-speed);
}

/* ... apply to all elements ... */
\`\`\`

### Step 3: Create Themes UI

**File: `GUI/index.html`**

Add themes section to settings/sidebar:

\`\`\`html
<div id="themes-section" class="settings-section">
  <h2>Themes</h2>
  <p class="section-description">Customize your launcher with game-inspired themes</p>
  
  <div id="themes-grid" class="themes-grid">
    <!-- Dynamically populated with theme cards -->
  </div>
</div>
\`\`\`

**File: `GUI/js/themes.js`**

Required functionality:
- Fetch available themes via IPC
- Render theme cards with previews
- Handle theme selection
- Show active theme indicator
- Smooth transition between themes

### Step 4: Add IPC Handlers

**File: `main.js`**

Add these IPC handlers:
- `themes:list` - Return all available themes
- `themes:get` - Return specific theme data
- `themes:apply` - Apply theme and save preference
- `themes:current` - Get current active theme

## Game Theme Examples

### Theme 1: Minecraft
\`\`\`json
{
  "id": "minecraft",
  "name": "Minecraft",
  "colors": {
    "primary": "#6B8E23",
    "secondary": "#8B4513",
    "accent": "#FFD700",
    "background": "#2F4F2F",
    "surface": "#3D5C3D",
    "text": "#F5F5DC"
  },
  "effects": {
    "borderRadius": "2px",
    "buttonStyle": "pixelated"
  }
}
\`\`\`

### Theme 2: Valorant
\`\`\`json
{
  "id": "valorant",
  "name": "Valorant",
  "colors": {
    "primary": "#FF4655",
    "secondary": "#0F1923",
    "accent": "#00F5FF",
    "background": "#0D141C",
    "surface": "#1C252E",
    "text": "#ECE8E1"
  },
  "effects": {
    "borderRadius": "0px",
    "boxShadow": "0 0 20px rgba(255, 70, 85, 0.3)"
  }
}
\`\`\`

### Theme 3: Cyberpunk 2077
\`\`\`json
{
  "id": "cyberpunk",
  "name": "Cyberpunk 2077",
  "colors": {
    "primary": "#FCEE09",
    "secondary": "#00F0FF",
    "accent": "#FF003C",
    "background": "#050505",
    "surface": "#1A1A1A",
    "text": "#FFFFFF"
  },
  "fonts": {
    "primary": "'Rajdhani', sans-serif"
  },
  "effects": {
    "borderRadius": "0px",
    "boxShadow": "0 0 30px rgba(252, 238, 9, 0.4)",
    "glitchEffect": true
  }
}
\`\`\`

### Theme 4: The Witcher 3
\`\`\`json
{
  "id": "witcher",
  "name": "The Witcher 3",
  "colors": {
    "primary": "#8B4513",
    "secondary": "#2F1F1F",
    "accent": "#DAA520",
    "background": "#1C1410",
    "surface": "#2A221B",
    "text": "#E8DCC8"
  }
}
\`\`\`

### Theme 5: Fortnite
\`\`\`json
{
  "id": "fortnite",
  "name": "Fortnite",
  "colors": {
    "primary": "#00C2FF",
    "secondary": "#7B3FF2",
    "accent": "#FFC700",
    "background": "#16181D",
    "surface": "#1E2128",
    "text": "#FFFFFF"
  },
  "effects": {
    "borderRadius": "15px",
    "boxShadow": "0 4px 15px rgba(0, 194, 255, 0.3)"
  }
}
\`\`\`

## Dynamic Theme Card UI

Each theme card should display:
- **Preview Image** - Screenshot of theme applied
- **Theme Name** - Large, readable
- **Description** - Short tagline
- **Active Indicator** - Checkmark if currently selected
- **Apply Button** - "Apply Theme" or "Applied"

### Card HTML Structure
\`\`\`html
<div class="theme-card" data-theme-id="minecraft">
  <div class="theme-preview">
    <img src="themes/previews/minecraft.jpg" alt="Minecraft Theme">
    <div class="theme-active-badge">✓ Active</div>
  </div>
  <div class="theme-info">
    <h3 class="theme-name">Minecraft</h3>
    <p class="theme-description">Blocky, earthy tones</p>
    <button class="theme-apply-btn">Apply Theme</button>
  </div>
</div>
\`\`\`

## Features to Implement

### Essential Features
- [x] Theme switching without restart
- [x] Smooth CSS transitions between themes
- [x] Persistent theme selection (saved to config)
- [x] Theme preview cards with images
- [x] Active theme indicator

### Nice-to-Have Features
- [ ] Live theme preview (hover to preview without applying)
- [ ] Custom theme creator (user-defined colors)
- [ ] Theme import/export (share custom themes)
- [ ] Animated theme transitions
- [ ] Dark/Light mode variants for each theme

## Testing Checklist

### Functional Tests
- [ ] All themes load correctly
- [ ] Theme applies instantly on selection
- [ ] Theme persists after launcher restart
- [ ] No visual glitches during theme switch
- [ ] All UI elements respect theme colors

### Visual Tests
- [ ] Text remains readable in all themes
- [ ] Contrast ratios meet accessibility standards
- [ ] Buttons are clearly visible
- [ ] Border colors distinguish sections
- [ ] Preview images load correctly

### Edge Cases
- [ ] Missing theme file (fallback to default)
- [ ] Corrupted JSON (error handling)
- [ ] Theme with missing colors (use defaults)
- [ ] Rapid theme switching (no crashes)

## AI IDE Instructions

Please implement this themes system with the following requirements:

1. **Create the theme manager** that loads JSON files from `themes/` directory
2. **Convert existing CSS** to use CSS variables (replace hardcoded colors)
3. **Build the themes UI** with beautiful cards showing previews
4. **Add smooth transitions** when switching themes (fade effect)
5. **Create 5+ game themes** using the JSON schema (Minecraft, Valorant, Cyberpunk, Witcher, Fortnite, and more)
6. **Make it extensible** - Easy to add new themes by just adding a JSON file

### Code Generation Priorities:
- **Clean, readable code** with comments
- **Smooth animations** for theme transitions
- **Responsive grid layout** for theme cards
- **Error handling** for missing/corrupted themes
- **Performance** - Theme switching should be instant

### Dynamic Prompt Parameters:
You can customize the implementation by specifying:
- `THEME_COUNT`: Number of initial themes to create (default: 6)
- `GAME_LIST`: Specific games to create themes for (e.g., "Minecraft, GTA V, Apex Legends")
- `STYLE_PREFERENCE`: UI style for theme cards ("modern", "minimalist", "game-like")
- `TRANSITION_TYPE`: How themes transition ("fade", "slide", "instant")

### Example Request:
"Create 8 game-inspired themes for [Minecraft, Valorant, Cyberpunk, Witcher, Fortnite, League of Legends, Overwatch, Apex Legends] with a modern card-based UI and fade transitions"

---

## Expected Output

The AI IDE should generate:
1. **themeManager.js** - Complete theme loading/switching logic
2. **themes.json** - Registry of all available themes
3. **[game].json** - Individual theme files (6+ themes)
4. **themes.js** - Frontend UI logic with animations
5. **Updated style.css** - CSS variables implemented
6. **Updated main.js** - IPC handlers added
7. **Preview images** - Placeholder generation or instructions
