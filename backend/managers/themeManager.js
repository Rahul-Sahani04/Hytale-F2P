const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const defaultTheme = require('../config/defaultTheme');

class ThemeManager {
    constructor() {
        this.userDataPath = app ? app.getPath('userData') : path.resolve(__dirname, '../../userData');
        this.configPath = path.join(this.userDataPath, 'theme-config.json');
        this.themesPath = path.resolve(__dirname, '../../themes');
        this.themes = new Map();
        this.activeTheme = 'default';
        this.defaultTheme = defaultTheme;
    }

    init() {
        this.ensureConfig();
        this.loadThemes();
        this.loadUserPreference();
    }

    ensureConfig() {
        if (!fs.existsSync(this.themesPath)) {
            console.warn('Themes directory not found locally, creating...');
            try {
                fs.mkdirSync(this.themesPath, { recursive: true });
            } catch (err) {
                console.error('Failed to create themes directory:', err);
            }
        }
    }

    validateTheme(theme) {
        if (!theme.id || !theme.name) {
            console.warn(`Skipping invalid theme: Missing ID or Name`);
            return null;
        }

        // Create a deep merge of default theme and loaded theme
        const validated = {
            ...this.defaultTheme,
            ...theme,
            colors: {
                ...this.defaultTheme.colors,
                ...(theme.colors || {})
            },
            effects: {
                ...this.defaultTheme.effects,
                ...(theme.effects || {})
            },
            fonts: theme.fonts ? { ...theme.fonts } : undefined, // Fonts are optional
            sidebar: theme.sidebar ? { ...theme.sidebar } : undefined, // Sidebar is optional
            playButton: theme.playButton ? { ...theme.playButton } : undefined // PlayButton is optional
        };

        return validated;
    }

    loadThemes() {
        this.themes.clear();

        // Add default theme first
        this.themes.set('default', this.defaultTheme);

        try {
            if (fs.existsSync(this.themesPath)) {
                const files = fs.readdirSync(this.themesPath);
                for (const file of files) {
                    if (file.endsWith('.json')) {
                        try {
                            const data = fs.readFileSync(path.join(this.themesPath, file), 'utf8');
                            const rawTheme = JSON.parse(data);
                            const theme = this.validateTheme(rawTheme);
                            
                            if (theme) {
                                this.themes.set(theme.id, theme);
                            }
                        } catch (err) {
                            console.error(`Failed to load theme from ${file}:`, err);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error reading themes directory:', err);
        }

        console.log(`Loaded ${this.themes.size} themes`);
    }

    loadUserPreference() {
        try {
            if (fs.existsSync(this.configPath)) {
                const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
                if (config.activeTheme && this.themes.has(config.activeTheme)) {
                    this.activeTheme = config.activeTheme;
                }
            }
        } catch (err) {
            console.error('Failed to load theme preference:', err);
        }
    }

    saveUserPreference(themeId) {
        try {
            const config = { activeTheme: themeId };
            fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
            this.activeTheme = themeId;
            return true;
        } catch (err) {
            console.error('Failed to save theme preference:', err);
            return false;
        }
    }

    getAllThemes() {
        return Array.from(this.themes.values());
    }

    getTheme(themeId) {
        return this.themes.get(themeId) || this.defaultTheme;
    }

    getActiveTheme() {
        return this.themes.get(this.activeTheme) || this.defaultTheme;
    }
}

module.exports = new ThemeManager();
