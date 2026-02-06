/**
 * @typedef {Object} ThemeColors
 * @property {string} primary - Main accent color
 * @property {string} secondary - Secondary accent
 * @property {string} accent - Tertiary accent
 * @property {string} background - Page background
 * @property {string} surface - Card/panel backgrounds
 * @property {string} text - Primary text
 * @property {string} textSecondary - Muted text
 * @property {string} border - Border color
 * @property {string} success - Success state color
 * @property {string} error - Error state color
 * @property {string} warning - Warning state color
 */

/**
 * @typedef {Object} ThemeEffects
 * @property {string} borderRadius - Global border radius (e.g., "12px")
 * @property {string} boxShadow - Global box shadow
 * @property {string} backdropFilter - Global backdrop filter (e.g., "blur(20px)")
 */

/**
 * @typedef {Object} Theme
 * @property {string} id - Unique identifier
 * @property {string} name - Display name
 * @property {string} description - Short description
 * @property {string} preview - Path to preview image
 * @property {ThemeColors} colors - Color palette
 * @property {ThemeEffects} effects - Visual effects
 * @property {Object} [fonts] - Custom fonts
 * @property {Object} [sidebar] - Sidebar styling overrides
 * @property {Object} [playButton] - Play button styling overrides
 */

/** @type {Theme} */
module.exports = {
    id: 'default',
    name: 'Default',
    description: 'The original Hytale F2P experience',
    preview: 'themes/previews/default.png',
    colors: {
        primary: '#9333ea',
        secondary: '#3b82f6',
        accent: '#8b5cf6',
        background: '#090909',
        surface: 'rgba(0, 0, 0, 0.4)',
        text: '#ffffff',
        textSecondary: '#9ca3af',
        border: 'rgba(255, 255, 255, 0.1)',
        success: '#22c55e',
        error: '#ef4444',
        warning: '#fbbf24'
    },
    effects: {
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(20px)'
    }
};
