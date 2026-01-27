const themesGrid = document.getElementById('themesGrid');

async function initThemes() {
    try {
        const themes = await window.electronAPI.getThemes();
        const activeTheme = await window.electronAPI.getActiveTheme();

        console.log('Loaded themes:', themes);
        console.log('Active theme:', activeTheme);

        renderThemes(themes, activeTheme ? activeTheme.id : 'default');

        // Apply active theme immediately on load to ensure sync
        if (activeTheme) {
            applyThemeToDOM(activeTheme);
        }
    } catch (error) {
        console.error('Failed to init themes:', error);
        if (themesGrid) {
            themesGrid.innerHTML = '<p style="color: var(--color-error)">Failed to load themes.</p>';
        }
    }
}

function renderThemes(themes, activeId) {
    if (!themesGrid) return;

    themesGrid.innerHTML = themes.map(theme => {
        const isActive = theme.id === activeId;
        const activeClass = isActive ? 'active' : '';
        const btnText = isActive ? 'Active' : 'Apply';

        // Use placeholder for preview
        let previewHtml = `<div class="theme-preview-placeholder" style="background: ${theme.colors.primary}; color: ${theme.colors.text}; font-family: '${theme.fonts ? theme.fonts.primary : 'sans-serif'}'">${theme.name[0]}</div>`;

        // Use Preview Images if available
        if (theme.preview) {
            let previewPath = theme.preview;
            // Fix path relative to GUI folder
            if (previewPath.startsWith('themes/')) {
                previewPath = '../' + previewPath;
            }
            previewHtml = `<img src="${previewPath}" alt="${theme.name} Preview" class="theme-preview-image">`;
        }

        // Color dots
        const colorsHtml = `
            <div class="theme-colors-preview">
                <div class="color-dot" style="background: ${theme.colors.primary}"></div>
                <div class="color-dot" style="background: ${theme.colors.secondary}"></div>
                <div class="color-dot" style="background: ${theme.colors.background}"></div>
            </div>
        `;

        // Check if this is the default theme
        const isDefaultTheme = theme.id === 'default';
        const defaultBadge = isDefaultTheme ? '<span class="theme-default-badge"><i class="fas fa-star"></i></span>' : '';

        return `
            <div class="theme-card ${activeClass}" onclick="applyTheme('${theme.id}')">
                <div class="theme-preview">
                   ${previewHtml}
                   <div class="theme-active-badge">
                       <i class="fas fa-check-circle"></i> Active
                   </div>
                   ${defaultBadge}
                </div>
                <div class="theme-info">
                    <div class="theme-header">
                        <h3 class="theme-name" style="color: ${isActive ? 'var(--color-primary)' : 'inherit'}">${theme.name}</h3>
                    </div>
                    <p class="theme-description">${theme.description || ''}</p>
                    ${colorsHtml}
                    <button class="theme-apply-btn">
                        ${isActive ? '<i class="fas fa-check"></i> Active' : '<i class="fas fa-magic"></i> Apply'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function applyTheme(themeId) {
    try {
        console.log('Applying theme:', themeId);
        // Optimistic update
        const themes = await window.electronAPI.getThemes();
        const theme = themes.find(t => t.id === themeId);

        if (theme) {
            // Add transition class for smooth switching
            document.body.classList.add('theme-transitioning');

            applyThemeToDOM(theme);
            renderThemes(themes, themeId);

            // Persist
            await window.electronAPI.applyTheme(themeId);

            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 450);
        }
    } catch (error) {
        console.error('Failed to apply theme:', error);
        document.body.classList.remove('theme-transitioning');
    }
}

// Initial/Default CSS variables to revert to
const defaultVariables = {
    '--color-primary': '#9333ea',
    '--color-secondary': '#3b82f6',
    '--color-accent': '#8b5cf6',
    '--color-background': '#090909',
    '--color-surface': 'rgba(0, 0, 0, 0.4)',
    '--color-text': '#ffffff',
    '--color-text-secondary': '#9ca3af',
    '--color-border': 'rgba(255, 255, 255, 0.1)',
    '--color-success': '#22c55e',
    '--color-error': '#ef4444',
    '--color-warning': '#fbbf24',
    '--theme-radius': '12px',
    '--theme-shadow': '0 8px 32px rgba(0, 0, 0, 0.4)',
    '--theme-backdrop': 'blur(20px)',
    '--font-primary': "'Space Grotesk', sans-serif",
    '--font-secondary': "'JetBrains Mono', monospace"
};

const defaultPreview = "themes/previews/default.png";

function applyThemeToDOM(theme) {
    const root = document.documentElement;
    const bgImageEl = document.getElementById('app-background');


    // Helper to set variable
    const setVar = (name, value) => {
        if (value) root.style.setProperty(name, value);
    };

    // Check if it's the "default" theme (either by ID or lack of properties)
    const isDefault = !theme.id || theme.id === 'default';

    // Helper to reset Play Button
    const resetPlayButton = () => {
        const btn = document.getElementById('homePlayBtn');
        if (btn) {
            // Clone to remove all event listeners (hover effects from other themes)
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Clear all inline styles
            newBtn.setAttribute('style', '');

            // Clear span styles if any
            const span = newBtn.querySelector('span');
            if (span) span.setAttribute('style', '');

            return newBtn;
        }
        return null;
    };

    // Helper to reset Sidebar
    const resetSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            // Reset base styles
            sidebar.style.background = '';
            sidebar.style.borderColor = '';
            sidebar.style.borderRight = '';
            sidebar.style.borderRadius = '';
            sidebar.style.backdropFilter = '';
            sidebar.style.boxShadow = '';
        }

        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.style.background = '';
            item.style.color = '';
            item.style.borderRadius = '';
            item.style.border = '';

            // Remove any custom active styles helper class if we added one (not doing that, just inline)
            // Note: complex pseudo-elements (::before) cannot be styled inline easily without CSS variables or hacks.
            // We will rely on CSS variables for active states where possible or just base styles.
        });
    };

    if (isDefault) {
        // RESET TO DEFAULT
        // 1. Remove ID override from body
        delete document.body.dataset.theme;

        // 2. Reset CSS Variables to hardcoded defaults
        Object.entries(defaultVariables).forEach(([key, value]) => {
            setVar(key, value);
        });

        // 3. Reset Background Image
        if (bgImageEl) {
            bgImageEl.src = "https://i.imgur.com/Visrk66.png";
            bgImageEl.style.filter = 'none';
        }

        // 4. Reset Play Button
        resetPlayButton();

        // 5. Reset Sidebar
        resetSidebar();

        return; // Stop here for default
    }

    console.log('Applying theme:', theme);
    // APPLY CUSTOM THEME
    // 1. Set theme ID on body for CSS overrides
    if (theme.id) {
        document.body.dataset.theme = theme.id;
    }

    // 2. Set Colors
    if (theme.colors) {
        setVar('--color-primary', theme.colors.primary);
        setVar('--color-secondary', theme.colors.secondary);
        setVar('--color-accent', theme.colors.accent);
        setVar('--color-background', theme.colors.background);
        setVar('--color-surface', theme.colors.surface);
        setVar('--color-text', theme.colors.text);
        setVar('--color-text-secondary', theme.colors.textSecondary);
        setVar('--color-border', theme.colors.border);
        setVar('--color-success', theme.colors.success);
        setVar('--color-error', theme.colors.error);
        setVar('--color-warning', theme.colors.warning);
    }

    // 3. Set Fonts
    if (theme.fonts) {
        setVar('--font-primary', theme.fonts.primary);
        setVar('--font-secondary', theme.fonts.secondary);
        console.log('Applying fonts:', theme.fonts);
    } else {
        setVar('--font-primary', defaultVariables['--font-primary']);
        setVar('--font-secondary', defaultVariables['--font-secondary']);
        console.log('Applying default fonts:', theme.fonts);
    }

    // 4. Set Effects
    if (theme.effects) {
        setVar('--theme-radius', theme.effects.borderRadius);
        setVar('--theme-shadow', theme.effects.boxShadow);
        setVar('--theme-backdrop', theme.effects.backdropFilter);
    }

    // 5. Set Background Image
    if (bgImageEl && theme.backgroundImage) {
        let bgPath = theme.backgroundImage;
        if (bgPath.startsWith('themes/')) {
            bgPath = bgPath.replace('themes/', '../themes/');
        }
        bgImageEl.src = bgPath;
    } else if (bgImageEl) {
        bgImageEl.src = "https://i.imgur.com/Visrk66.png";
    }

    // 5.5 Set Overlay Opacity
    const overlayEl = document.getElementById('app-background-overlay');
    if (overlayEl) {
        if (theme.overlayOpacity !== undefined) {
            overlayEl.style.opacity = theme.overlayOpacity;
            overlayEl.className = 'absolute inset-0 bg-black';
            overlayEl.style.opacity = theme.overlayOpacity;
        } else {
            // Default behavior if not specified
            overlayEl.className = 'absolute inset-0 bg-black/60';
            overlayEl.style.opacity = '';
        }
    }

    // Play Button Styling
    // First, clean it up
    let playBtn = resetPlayButton();

    if (playBtn && theme.playButton) {
        const pb = theme.playButton;

        // Base Styles
        const applyBaseStyles = () => {
            if (pb.background) {
                playBtn.style.background = pb.background;
            } else {
                playBtn.style.backgroundColor = pb.backgroundColor || '';
                // FIX: Ensure no gradient remains from default CSS classes
                playBtn.style.backgroundImage = 'none';
            }
            playBtn.style.color = pb.textColor || '';
            playBtn.style.border = pb.border || '';
            playBtn.style.borderRadius = pb.borderRadius || '';
            playBtn.style.boxShadow = pb.boxShadow || '';
            playBtn.style.transform = pb.transform || '';
            playBtn.style.textTransform = pb.textTransform || '';
            playBtn.style.clipPath = pb.clipPath || 'none';
        };

        // Hover Styles
        const applyHoverStyles = () => {
            if (pb.hoverBackground) {
                playBtn.style.background = pb.hoverBackground;
            }
            if (pb.hoverTextColor) playBtn.style.color = pb.hoverTextColor;
            if (pb.hoverBoxShadow) playBtn.style.boxShadow = pb.hoverBoxShadow;
            if (pb.hoverTransform) playBtn.style.transform = pb.hoverTransform;
            if (pb.hoverBorder) playBtn.style.border = pb.hoverBorder;
        };

        // Apply Initial
        applyBaseStyles();

        // Add Listeners
        playBtn.addEventListener('mouseenter', applyHoverStyles);
        playBtn.addEventListener('mouseleave', applyBaseStyles);

        // Handle inner span (e.g. for Valorant skew correction)
        const span = playBtn.querySelector('span');
        if (span && theme.id === 'valorant') {
            span.style.transform = 'skew(15deg)';
            span.style.display = 'inline-block';
        } else if (span) {
            span.style.transform = 'none';
        }
    }

    // Sidebar Styling
    resetSidebar();
    if (theme.sidebar) {
        const sidebar = document.querySelector('.sidebar');
        const sb = theme.sidebar;

        if (sidebar) {
            if (sb.background) sidebar.style.background = sb.background;
            if (sb.borderColor) sidebar.style.borderColor = sb.borderColor;
            if (sb.borderRight) sidebar.style.borderRight = sb.borderRight;
            if (sb.borderLeft) sidebar.style.borderLeft = sb.borderLeft;
            if (sb.borderRadius) sidebar.style.borderRadius = sb.borderRadius;
            if (sb.backdropFilter) sidebar.style.backdropFilter = sb.backdropFilter;
            if (sb.boxShadow) sidebar.style.boxShadow = sb.boxShadow;
        }

        // Apply to Nav Items
        if (sb.itemColor || sb.itemBorderRadius) {
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                if (sb.itemColor) item.style.color = sb.itemColor;
                if (sb.itemBorderRadius) item.style.borderRadius = sb.itemBorderRadius;
            });
        }
    }
}

// Modal Functions
function openThemesModal() {
    const modal = document.getElementById('themesModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeThemesModal() {
    const modal = document.getElementById('themesModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure electronAPI is ready if needed, though mostly redundant
    setTimeout(initThemes, 100);
});

// Export 
window.initThemes = initThemes;
window.applyTheme = applyTheme;
window.openThemesModal = openThemesModal;
window.closeThemesModal = closeThemesModal;
