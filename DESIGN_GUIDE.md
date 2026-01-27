# Hytale F2P Launcher - Complete Design Guide

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Library](#component-library)
5. [Theme System](#theme-system)
6. [Creating New Themes](#creating-new-themes)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Performance Best Practices](#performance-best-practices)

---

## Design Philosophy

### Core Principles
The Hytale F2P Launcher is designed for **gamers who want speed and immersion**. Every pixel serves a purpose:

1. **Speed First** - Quick access to launch game, manage mods, check news (quick sessions)
2. **Immersion** - Rich visual themes that match gaming aesthetics (Minecraft, Cyberpunk, etc.)
3. **Clarity** - High contrast, clear hierarchy, instant visual feedback
4. **Flexibility** - Multiple theme personas while maintaining functional core
5. **Responsiveness** - Smooth micro-interactions on every touch point

### Design Pillars

| Pillar | Implementation |
|--------|-----------------|
| **Visual Hierarchy** | Primary CTA (Play button) is largest, most prominent. Secondary actions scale down. |
| **Feedback** | Every button, input, and interactive element provides visual/tactile feedback. |
| **Consistency** | All themes maintain the same functional structure while varying aesthetics. |
| **Performance** | Animations use GPU-accelerated properties (transform, opacity). |
| **Accessibility** | WCAG AA contrast ratios, keyboard navigation, focus states. |

---

## Color System

### Color Categories

#### Primary Color (Brand/CTA)
- **Purpose:** Call-to-action buttons (Play, Install, Apply Theme)
- **Requirement:** Must be the most saturated color in the theme
- **Contrast:** Must have ≥4.5:1 contrast with button text
- **Example:**
  - Ascend: `#00D9FF` (Cyan)
  - Void: `#FF00FF` (Magenta)
  - Obsidian: `#D4AF37` (Gold)

#### Secondary Color (Accent/Depth)
- **Purpose:** Sidebar active state, borders, secondary CTAs
- **Requirement:** Complementary to primary
- **Usage:** Creates visual depth and dimension
- **Example:**
  - Ascend: `#1A1A2E` (Deep Blue)
  - Void: `#1A1A1F` (Near Black)

#### Accent Color (Highlights)
- **Purpose:** Hover states, active indicators, notifications
- **Requirement:** Should pop against background
- **Example:**
  - Ascend: `#FFB800` (Warm Gold)
  - Void: `#00FFFF` (Bright Cyan)

#### Neutrals
- **Background:** Base of theme (must be very dark for gaming)
- **Surface:** Cards, panels, input backgrounds (slightly lighter than background)
- **Text:** Primary (≥7:1 contrast with background)
- **Text Secondary:** Helper text, disabled state (≥4.5:1 contrast)
- **Border:** Subtle dividers and outlines (usually 10-15% opacity)

#### Semantic Colors
- **Success:** `#22c55e` or `#00FF00` (Green)
- **Error:** `#ef4444` or `#FF0055` (Red)
- **Warning:** `#fbbf24` or `#FFFF00` (Yellow)

### Color Naming Convention (JSON)

```json
{
  "colors": {
    "primary": "#RRGGBB",       // Main CTA color
    "secondary": "#RRGGBB",     // Depth/sidebar
    "accent": "#RRGGBB",        // Highlights
    "background": "#RRGGBB",    // Base background
    "surface": "rgba(...)",     // Cards/panels
    "text": "#RRGGBB",         // Primary text
    "textSecondary": "#RRGGBB", // Secondary text
    "border": "rgba(...)",      // Dividers/outlines
    "success": "#RRGGBB",       // Success state
    "error": "#RRGGBB",         // Error state
    "warning": "#RRGGBB"        // Warning state
  }
}
```

### Contrast Requirements

**WCAG AA Compliance:**
- Text on background: 4.5:1 minimum
- UI Components: 3:1 minimum
- Large text (18pt+): 3:1 minimum

**Test with:**
```
https://webaim.org/resources/contrastchecker/
```

---

## Typography

### Font Families

#### Primary Font (Headers, UI Text)
- **Recommended:** 'Space Grotesk' (geometric, modern, gaming-friendly)
- **Fallback:** 'Arial', sans-serif
- **Usage:** All headings, buttons, navigation
- **Weights:** 300 (light), 400 (regular), 600 (semi-bold), 700 (bold)

#### Secondary Font (Body, Descriptions)
- **Recommended:** 'Roboto' (readable, clean)
- **Fallback:** 'Segoe UI', sans-serif
- **Usage:** Long-form text, descriptions

#### Monospace Font (Code, Version Info)
- **Recommended:** 'JetBrains Mono' (clear, gaming-focused)
- **Fallback:** 'Courier New', monospace
- **Usage:** Logs, version numbers, player names, paths

### Font Sizes

| Component | Size | Weight | Line Height |
|-----------|------|--------|------------|
| **Game Title** | 3.75rem (60px) | 900 | 1 |
| **Page Title** | 2rem (32px) | 700 | 1.2 |
| **Section Title** | 1.5rem (24px) | 700 | 1.3 |
| **Button Text** | 1rem-1.25rem | 700 | 1 |
| **Body Text** | 0.875rem-1rem | 400 | 1.6 |
| **Helper Text** | 0.75rem (12px) | 400 | 1.4 |
| **Labels** | 0.75rem-0.875rem | 500 | 1.2 |

### Text Shadow for Depth

```css
/* Standard depth shadow */
text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

/* Gaming glow effect */
text-shadow: 0 0 20px rgba(PRIMARY_COLOR, 0.5);

/* Double shadow for cyberpunk */
text-shadow: 2px 2px SECONDARY, -2px -2px PRIMARY;
```

---

## Component Library

### Buttons

#### Play Button (Primary CTA)
- **Size:** 60px height × full width (max 500px)
- **Padding:** 0 3rem horizontal
- **Border Radius:** 8-16px (theme dependent)
- **Font:** Bold, uppercase, letter-spacing: 0.05em
- **States:**
  - Normal: Solid gradient or flat color
  - Hover: Brighten + lift (translateY: -4px) + shadow glow
  - Active: Deeper shadow, slight scale down
  - Disabled: 0.7 opacity, grayscale

```json
"playButton": {
  "background": "linear-gradient(135deg, PRIMARY 0%, SECONDARY 100%)",
  "textColor": "#FFFFFF",
  "border": "2px solid rgba(255, 255, 255, 0.2)",
  "borderRadius": "8px",
  "boxShadow": "0 12px 32px rgba(PRIMARY, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  "hoverBoxShadow": "0 16px 40px rgba(PRIMARY, 0.6)"
}
```

#### Secondary Buttons
- **Size:** 48px height × auto width
- **Background:** rgba(PRIMARY, 0.2)
- **Border:** 1px solid rgba(PRIMARY, 0.4)
- **Hover:** Brighten background, increase border opacity

#### Icon Buttons
- **Size:** 40×40px or 48×48px
- **Hover:** Scale 1.1 + subtle color shift

### Navigation Sidebar

#### Standard Configuration
- **Width:** 80px
- **Arrangement:** Vertical, centered icons
- **Icons:** 24-32px size
- **Background:** Semi-transparent dark (rgba(0,0,0, 0.4-0.95))
- **Item Height:** Square aspect ratio (80×80px)
- **Active Indicator:** Side bar (4-6px width) + color glow

#### Active State
```css
.nav-item.active {
  background: rgba(PRIMARY, 0.2);
  border-left: 4px solid PRIMARY;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: -8px;
  width: 4px;
  height: 32px;
  background: PRIMARY;
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 10px rgba(PRIMARY, 0.5);
}
```

### News Cards

#### Card Structure
- **Aspect Ratio:** 16:9 (horizontal) or variable (grid)
- **Overlay:** Linear gradient (bottom dark, top transparent)
- **Border:** 1px solid rgba(255, 255, 255, 0.1)
- **Hover Effect:**
  - Image zoom: scale(1.05)
  - Card lift: translateY(-8px)
  - Border glow: PRIMARY color

#### Typography
- **Badge:** 0.625rem, UPPERCASE, semi-bold
- **Title:** 0.875rem, bold, white
- **Summary:** 0.75rem, secondary text (hidden until hover)

### Form Inputs

#### Design Specifications
- **Height:** 44-56px (buttons), 40px (inputs)
- **Padding:** 12px 16px (horizontal), 10px (vertical)
- **Border Radius:** 8-12px
- **Border:** 1px solid rgba(255, 255, 255, 0.1)
- **Background:** rgba(255, 255, 255, 0.05)
- **Font:** Monospace for inputs, sans-serif for labels

#### Focus State
```css
.form-input:focus {
  border-color: rgba(PRIMARY, 0.6);
  background: rgba(PRIMARY, 0.05);
  box-shadow: 0 0 20px rgba(PRIMARY, 0.3);
  transform: translateY(-1px);
}
```

### Header & Profile Selector

#### Header Layout
- **Height:** 80px
- **Left:** Players online counter (with icon)
- **Center:** Logo/title (optional, can be hidden for space)
- **Right:** Profile selector dropdown + window controls

#### Profile Dropdown
- **Width:** 280-320px
- **Animation:** Slide down + scale from 0.95 to 1
- **Shadow:** Heavy (premium feel)
- **Items:** Profile name + avatar + quick switch

### Theme Cards

#### Grid Layout
- **Columns:** auto-fill, minmax(280px, 1fr)
- **Gap:** 2rem
- **Max Width:** 1400px per row

#### Card Content
- **Preview Height:** 180-200px
- **Info Section:** 1.5rem padding
- **Elements:**
  - Preview image with overlay
  - Active badge (top-right, green)
  - Theme name (1.35rem, bold)
  - Description (2 lines max, secondary text)
  - Color preview dots (6 colors)
  - Apply button (full width, primary color)

---

## Theme System

### JSON Theme Structure

```json
{
  "id": "theme-id",
  "name": "Theme Name",
  "description": "Short description of theme aesthetic",
  "author": "Your Name",
  "preview": "themes/previews/theme-id.png",
  "backgroundImage": "GUI/BackgroundWallpapers/theme-id.jpg",
  
  "colors": {
    "primary": "#00D9FF",
    "secondary": "#1A1A2E",
    "accent": "#FFB800",
    "background": "#0F0F1E",
    "surface": "rgba(26, 26, 46, 0.85)",
    "text": "#E8E8F0",
    "textSecondary": "#A0A0B8",
    "border": "rgba(0, 217, 255, 0.15)",
    "success": "#00FF88",
    "error": "#FF4757",
    "warning": "#FFB800"
  },
  
  "fonts": {
    "primary": "'Space Grotesk', sans-serif",
    "secondary": "'Roboto', sans-serif"
  },
  
  "effects": {
    "borderRadius": "8px",
    "boxShadow": "0 8px 24px rgba(0, 217, 255, 0.1)",
    "backdropFilter": "blur(16px)"
  },
  
  "sidebar": {
    "background": "rgba(15, 15, 30, 0.95)",
    "borderRight": "1px solid rgba(0, 217, 255, 0.2)",
    "itemColor": "#A0A0B8",
    "itemBorderRadius": "8px"
  },
  
  "playButton": {
    "background": "linear-gradient(135deg, #00D9FF 0%, #00B8E6 100%)",
    "backgroundColor": "#00D9FF",
    "textColor": "#0F0F1E",
    "border": "2px solid rgba(0, 217, 255, 0.3)",
    "borderRadius": "8px",
    "boxShadow": "0 0 20px rgba(0, 217, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    "hoverBackground": "linear-gradient(135deg, #00E6FF 0%, #00C8F0 100%)",
    "hoverTransform": "translateY(-4px)",
    "hoverBoxShadow": "0 12px 32px rgba(0, 217, 255, 0.5)"
  }
}
```

### How Themes Are Applied

1. **Theme Manager** loads JSON from `/themes/` directory
2. **CSS Variables** in `:root` are set based on theme colors
3. **Data Attribute** `[data-theme="id"]` applies theme-specific CSS
4. **Smooth Transition:** `transition: all 0.3s ease` on all elements
5. **Persistence:** Selection saved to `~/.config/Hytale-F2P/theme-config.json`

---

## Creating New Themes

### Step-by-Step Process

#### 1. Create Theme JSON File

```bash
# File: /themes/my-theme.json
{
  "id": "my-theme",
  "name": "My Custom Theme",
  "description": "Theme description",
  "author": "Your Name",
  "preview": "themes/previews/my-theme.png",
  "backgroundImage": "GUI/BackgroundWallpapers/my-theme.jpg",
  
  // Copy color structure from example above
  "colors": { ... },
  
  // Optional: customize fonts
  "fonts": {
    "primary": "'Roboto', sans-serif",
    "secondary": "'Open Sans', sans-serif"
  },
  
  // Optional: customize effects
  "effects": {
    "borderRadius": "6px",
    "boxShadow": "0 4px 12px rgba(0, 0, 0, 0.2)"
  },
  
  // Optional: customize specific components
  "sidebar": { ... },
  "playButton": { ... }
}
```

#### 2. Generate Background Image
- **Dimensions:** 1920×1080 (16:9 widescreen)
- **Format:** JPG or PNG
- **File:** `/GUI/BackgroundWallpapers/my-theme.jpg`
- **Tips:**
  - Keep dark (prevents text contrast issues)
  - Add subtle patterns or gradients
  - Avoid busy designs (distract from UI)

#### 3. Create Preview Image
- **Dimensions:** 480×270 (16:9)
- **Format:** PNG
- **File:** `/themes/previews/my-theme.png`
- **Content:** Screenshot showing the theme applied

#### 4. Add Theme-Specific CSS (Optional)

If your theme needs special styling, add to `style.css`:

```css
/* My Theme Specific Styles */
[data-theme="my-theme"] .home-play-button {
  border: 3px solid var(--color-primary);
  box-shadow: 0 0 30px rgba(PRIMARY, 0.5);
}

[data-theme="my-theme"] .nav-item.active::before {
  width: 6px;
  background: linear-gradient(to bottom, PRIMARY, SECONDARY);
}
```

#### 5. Test Theme
1. Reload launcher
2. Open Settings → Themes
3. Verify all colors display correctly
4. Test on different monitors (brightness, contrast)
5. Check text readability (contrast ratios)
6. Test with colorblind-friendly tools

### Color Combination Formulas

#### Complementary
- Primary: `#FF6B35`
- Secondary: `#004E89` (opposite hue)

#### Analogous (Harmonious)
- Primary: `#00D9FF`
- Secondary: `#7C3AED` (nearby hues)
- Accent: `#FF006E`

#### Triadic (Bold)
- Primary: `#FF006E`
- Secondary: `#FFB800`
- Accent: `#00D9FF`

### Testing Checklist

- [ ] All text is readable (contrast ≥4.5:1)
- [ ] Play button stands out clearly
- [ ] Hover states are visible
- [ ] No colors clash aggressively
- [ ] Works on light-up monitors (brightness)
- [ ] Works on dark monitors (minimal bloom)
- [ ] Tested with colorblind simulator
- [ ] Sidebar active indicator glows
- [ ] Form inputs are clearly focusable
- [ ] Theme loads without errors

---

## Accessibility Guidelines

### Contrast Ratios
```
Background vs Text: 7:1 (AAA) preferred, 4.5:1 (AA) minimum
Component Borders: 3:1 minimum
Interactive Elements: 3:1 minimum
```

### Keyboard Navigation
- Tab order follows DOM structure
- Focus indicator always visible (outline or glow)
- No keyboard traps (users can escape any element)

### Color Blindness
- Don't use red+green as only differentiator
- Use patterns, icons, and text in addition to color
- Test with tools like:
  - https://www.color-blindness.com/coblis-color-blindness-simulator/
  - https://www.toptal.com/designers/colorfilter

### ARIA Labels
- All buttons have descriptive text or aria-label
- Form inputs have associated labels
- Chat messages have timestamp aria-labels

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Best Practices

### CSS Animation Optimization
```css
/* Use GPU-accelerated properties */
✓ transform: translateY(-4px);
✓ opacity: 0.5;
✗ left: -4px;
✗ background-color: #fff; (theme switching only)
```

### Image Optimization
- **Background images:** Compress with TinyPNG (70-80% quality)
- **Preview images:** Max 200KB per image
- **Lazy load:** Theme previews load only when visible

### Transition Timing
- **Quick interactions:** 0.2-0.3s (hover, focus)
- **Page transitions:** 0.3-0.4s (fade, slide)
- **Modal animations:** 0.4-0.5s (scale + fade)
- **Theme switch:** 0.3-0.5s (global transition)

### Avoid Performance Pitfalls
- ✗ Complex box-shadows on every element
- ✗ Large background images without compression
- ✗ Frequent DOM manipulation during animations
- ✗ Simultaneous animations on many elements
- ✓ Use CSS transforms instead of position changes
- ✓ Batch DOM updates
- ✓ Debounce resize/scroll events

---

## Theme Gallery

### Current Available Themes

| Theme | Style | Primary Color | Best For |
|-------|-------|---------------|----------|
| **Default** | Modern | #9333ea | General use |
| **Minecraft** | Retro Pixelated | #4ADE80 | Cozy gaming |
| **Valorant** | Competitive Sharp | #FF4655 | FPS players |
| **Cyberpunk** | Neon Glitch | #FCEE09 | Dystopian vibes |
| **Terraria** | Retro Pixel | #E8A538 | Exploration |
| **Japan** | Soft Sakura | #FFB7C5 | Aesthetic |
| **France** | Glassmorphic | #9333ea | Modern minimal |
| **CS:GO** | Dark Metal | #4B9BFF | Esports fans |
| **Ascend** | Premium Tech | #00D9FF | Modern minimalist |
| **Void** | Competitive Neon | #FF00FF | High contrast |
| **Obsidian** | Luxury Dark | #D4AF37 | Premium feel |
| **Neon Grid** | Cyberpunk Grid | #0FFF50 | Retro-future |
| **Aurora** | Gradient Magic | #00D9FF | Ethereal |

---

## Resources & Links

### Color Tools
- [Color Picker](https://htmlcolorcodes.com/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colorblind Simulator](https://www.toptal.com/designers/colorfilter)
- [Gradient Generator](https://cssgradient.io/)

### Design Inspiration
- [Figma Community](https://www.figma.com/community)
- [Dribbble](https://dribbble.com/)
- [Game UI Database](https://www.gameuidatabase.com/)

### CSS Resources
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [Easing Functions](https://easings.net/)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [Inclusive Components](https://inclusive-components.design/)

---

## Questions & Support

For theme creation questions or design suggestions, refer to:
- Theme Manager: `/backend/managers/themeManager.js`
- UI Enhancements: `/GUI/ui-enhancements.css`
- Existing Themes: `/themes/*.json`

Happy theming! 🎨
