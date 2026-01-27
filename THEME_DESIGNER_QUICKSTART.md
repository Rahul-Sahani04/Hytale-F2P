# Theme Designer Quick Start Guide

Fast track to creating beautiful themes for Hytale F2P Launcher.

---

## 30-Second Overview

1. **Copy** an existing theme JSON from `/themes/`
2. **Customize** the colors to your vision
3. **Generate** a background image (1920×1080)
4. **Test** contrast ratios with [WebAIM](https://webaim.org/resources/contrastchecker/)
5. **Done!** Theme loads automatically

---

## Color Palette Template

Pick your primary color, then build around it:

```json
{
  "id": "my-theme",
  "name": "My Theme",
  "description": "Description of theme style",
  "colors": {
    "primary": "#FF0000",              // Your main color (brightest)
    "secondary": "#1A1A1A",            // Sidebar/depth color (dark)
    "accent": "#FFFF00",               // Highlight color (pop)
    "background": "#0A0A0A",           // Base (must be very dark)
    "surface": "rgba(30, 30, 30, 0.9)", // Cards/panels (slightly lighter)
    "text": "#FFFFFF",                 // Main text (white or near-white)
    "textSecondary": "#AAAAAA",        // Helper text (60-70% opacity)
    "border": "rgba(255,255,255,0.1)", // Subtle dividers
    "success": "#00FF00",              // Green for success
    "error": "#FF4444",                // Red for errors
    "warning": "#FFFF00"               // Yellow for warnings
  }
}
```

### Color Picking Tips

| Use Case | Recommendation | Examples |
|----------|-----------------|----------|
| **Neon/Bright** | High saturation, high value | #00FF00, #FF00FF, #00FFFF |
| **Dark/Moody** | Low saturation, low value | #1A1410, #0F0F1E, #050505 |
| **Gaming** | Bold, contrasty colors | #FF4655, #00D9FF, #D4AF37 |
| **Professional** | Muted, sophisticated | #5B8DEF, #6B8E23, #8B7355 |

### Quick Color Tool
Use [htmlcolorcodes.com](https://htmlcolorcodes.com/) to:
- Pick colors visually
- Get hex codes
- Create gradients
- Test combinations

---

## Minimal Theme File

Save as `/themes/my-theme.json`:

```json
{
  "id": "my-theme",
  "name": "My Theme",
  "description": "Short description",
  "author": "Your Name",
  "preview": "themes/previews/my-theme.png",
  "backgroundImage": "GUI/BackgroundWallpapers/my-theme.jpg",
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
  }
}
```

Save it, reload launcher → Done! Theme appears in Settings.

---

## Contrast Ratio Quick Reference

**How to test:**
1. Go to [webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
2. Enter your text color and background color
3. Check both WCAG AA and AAA compliance

**Required Ratios:**
- Text on background: **≥4.5:1** (minimum)
- UI components: **≥3:1** (minimum)
- Large text (18pt+): **≥3:1** (minimum)

**Quick Test:**
If text doesn't look readable on your monitor, it probably isn't. Increase saturation or swap colors.

---

## Image Requirements

### Background Image
- **Size:** 1920×1080px (16:9)
- **Format:** JPG (preferred) or PNG
- **Location:** `/GUI/BackgroundWallpapers/my-theme.jpg`
- **Tips:**
  - Keep it dark (avoid light backgrounds)
  - Subtle gradients work well
  - Avoid busy textures (distracts from UI)
  - Test on different screens

### Preview Image
- **Size:** 480×270px (16:9)
- **Format:** PNG
- **Location:** `/themes/previews/my-theme.png`
- **Content:** Screenshot of theme applied in launcher

**Easy Preview Creation:**
1. Apply theme in launcher
2. Take screenshot of main screen
3. Crop to 480×270 and save to previews folder

---

## Color Palette Examples

### Dark Gaming Theme (Bold)
```json
"primary": "#FF4655",      // Bright red
"secondary": "#0D141C",    // Near black
"accent": "#00F5FF",       // Cyan glow
"background": "#050505",   // Pure black
```

### Modern Tech Theme
```json
"primary": "#00D9FF",      // Bright cyan
"secondary": "#1A1A2E",    // Deep blue
"accent": "#FFB800",       // Warm gold
"background": "#0F0F1E",   // Dark navy
```

### Luxury Theme
```json
"primary": "#D4AF37",      // Gold
"secondary": "#1A1410",    // Deep brown
"accent": "#C5A028",       // Darker gold
"background": "#0D0B08",   // Near black
```

### Neon/Cyberpunk Theme
```json
"primary": "#0FFF50",      // Neon green
"secondary": "#050505",    // Black
"accent": "#FF006E",       // Magenta
"background": "#000000",   // Pure black
```

---

## Testing Checklist (5 Minutes)

- [ ] JSON file has no syntax errors
- [ ] All color hex codes are valid (#RRGGBB)
- [ ] Text readable on background (test with contrast checker)
- [ ] Theme loads in launcher (Settings → Themes)
- [ ] Play button stands out clearly
- [ ] No colors clash (test in person or with simulator)
- [ ] Works on light-up monitor (brightness/glow test)
- [ ] Sidebar active indicator glows properly

---

## Common Mistakes to Avoid

❌ **Too light background** - UI text becomes hard to read
❌ **Clashing colors** - Primary + secondary too similar hue
❌ **Poor contrast** - Can't read text (test with WebAIM)
❌ **Missing colors** - Incomplete JSON causes fallbacks
❌ **Typos in hex codes** - #00D9FF not #0dd9ff (case insensitive but validate)
❌ **Oversaturated secondary** - Makes UI feel chaotic
❌ **No glow on primary** - Play button doesn't pop

✓ **Keep it simple** - 3-5 colors maximum
✓ **Test on your monitor** - What looks good in editor ≠ reality
✓ **Use existing themes as reference** - Copy structure exactly
✓ **Check contrast** - Every text color must pass WCAG AA
✓ **Name your theme** - Something memorable and descriptive

---

## Folder Structure Reference

```
/themes/
  ├── my-theme.json              ← Your theme file
  ├── ascend.json
  ├── void.json
  ├── obsidian.json
  └── previews/
      ├── my-theme.png           ← Your preview image
      ├── ascend.png
      └── ...

/GUI/BackgroundWallpapers/
  ├── my-theme.jpg               ← Your background
  ├── ascend.jpg
  └── ...
```

---

## Sharing Your Theme

### To share with others:
1. **Upload JSON file** - Post `/themes/my-theme.json`
2. **Include images** - Background image + preview image
3. **Add description** - Name, author, description, color palette
4. **Instructions** - "Copy files to folders, reload launcher"

### GitHub Share Format
```markdown
# My Theme Name

- **Primary Color:** #00D9FF
- **Style:** Modern, clean, tech-focused
- **Best For:** Users who like minimalism

## Installation
1. Copy `my-theme.json` → `themes/`
2. Copy `my-theme.jpg` → `GUI/BackgroundWallpapers/`
3. Copy `my-theme.png` → `themes/previews/`
4. Reload launcher

## Colors
- Primary: #00D9FF
- Secondary: #1A1A2E
- Accent: #FFB800
```

---

## Advanced Tips

### Gradients in Play Button
```json
"playButton": {
  "background": "linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)"
}
```

### Custom Border Radius
```json
"effects": {
  "borderRadius": "0px"  // For retro themes
}
```

### Custom Box Shadow
```json
"effects": {
  "boxShadow": "0 0 30px rgba(0, 217, 255, 0.5)"  // Intense glow
}
```

### Dark Mode Backgrounds
```json
"colors": {
  "background": "#0A0A0A",  // Very dark gray
  "surface": "rgba(20, 20, 20, 0.9)"
}
```

---

## Resources

| Tool | Purpose | Link |
|------|---------|------|
| Color Picker | Pick colors visually | https://htmlcolorcodes.com/ |
| Contrast Checker | Test WCAG compliance | https://webaim.org/resources/contrastchecker/ |
| Colorblind Simulator | Test colorblind safety | https://www.toptal.com/designers/colorfilter |
| Gradient Generator | Create beautiful gradients | https://cssgradient.io/ |
| Image Compressor | Optimize images | https://tinypng.com/ |

---

## Still Stuck?

1. **Copy an existing theme** - Use `ascend.json` or `obsidian.json` as template
2. **Change only colors** - Keep structure identical
3. **Test contrast** - Use WebAIM tool for every color combo
4. **Look at examples** - Study `/themes/` directory for patterns
5. **Ask for feedback** - Share preview with others

---

## One-Minute Summary

```bash
# 1. Create JSON
/themes/my-theme.json

# 2. Add colors (copy format from existing theme)
# 3. Generate background image (1920×1080)
# 4. Create preview (480×270 screenshot)
# 5. Test contrast (WebAIM)
# 6. Reload launcher

# DONE! Your theme appears in Settings → Themes
```

---

**Now go create something beautiful!** 🎨

For more details, see `/DESIGN_GUIDE.md`
