const fs = require('fs');
const path = require('path');
const { app } = require('electron');

class ThemeManager {
    constructor() {
        this.userDataPath = app.getPath('userData');
        this.configPath = path.join(this.userDataPath, 'theme-config.json');
        this.themesPath = path.resolve(__dirname, '../../themes');
        this.themes = new Map();
        this.activeTheme = 'default';

        // Default theme definition (fallback)
        this.defaultTheme = {
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
                            const theme = JSON.parse(data);
                            if (theme.id && theme.colors) {
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
