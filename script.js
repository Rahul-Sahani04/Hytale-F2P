document.addEventListener('DOMContentLoaded', () => {
    const repoOwner = 'amiayweb';
    const repoName = 'Hytale-F2P';
    const repoUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

    fetchRepoStats();
    fetchReleases();
    setupMobileMenu();
    setupSmoothScroll();

    function fetchRepoStats() {
        // getting cache first
        const cachedStats = localStorage.getItem('hytale_f2p_stats');
        const cacheTime = localStorage.getItem('hytale_f2p_stats_time');

        if (cachedStats && cacheTime && (Date.now() - parseInt(cacheTime) < 3600000)) { // 1 hour cache
            updateStatsUI(JSON.parse(cachedStats));
        } else {
            fetch(repoUrl)
                .then(response => response.json())
                .then(data => {
                    const stats = {
                        stars: data.stargazers_count,
                        forks: data.forks_count
                    };

                    // Get downloads count from releases
                    fetch(`${repoUrl}/releases`)
                        .then(res => res.json())
                        .then(releases => {
                            let totalDownloads = 0;
                            releases.forEach(release => {
                                release.assets.forEach(asset => {
                                    totalDownloads += asset.download_count;
                                });
                            });
                            stats.downloads = totalDownloads;

                            localStorage.setItem('hytale_f2p_stats', JSON.stringify(stats));
                            localStorage.setItem('hytale_f2p_stats_time', Date.now().toString());
                            updateStatsUI(stats);
                        });
                })
                .catch(err => {
                    console.error('Error fetching stats:', err);
                    document.getElementById('star-count').textContent = '---';
                    document.getElementById('download-count').textContent = '---';
                });
        }
    }

    function updateStatsUI(stats) {
        document.getElementById('star-count').textContent = stats.stars.toLocaleString();
        if (stats.downloads) {
            document.getElementById('download-count').textContent = stats.downloads.toLocaleString();
        } else {
            document.getElementById('download-count').textContent = '1k+';
        }
    }

    function fetchReleases() {
        const cachedReleases = localStorage.getItem('hytale_f2p_releases');
        const cacheTime = localStorage.getItem('hytale_f2p_releases_time');

        if (cachedReleases && cacheTime && (Date.now() - parseInt(cacheTime) < 3600000)) {
            renderReleases(JSON.parse(cachedReleases));
        } else {
            fetch(`${repoUrl}/releases`)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('hytale_f2p_releases', JSON.stringify(data));
                    localStorage.setItem('hytale_f2p_releases_time', Date.now().toString());
                    renderReleases(data);
                })
                .catch(err => {
                    console.error('Error fetching releases:', err);
                    document.getElementById('changelog-content').innerHTML = `
                        <div style="text-align: center; color: var(--text-muted);">
                            <p>Could not load changelog from GitHub.</p>
                            <a href="https://github.com/${repoOwner}/${repoName}/releases" class="btn btn-secondary" style="margin-top: 20px;">View on GitHub</a>
                        </div>
                    `;
                });
        }
    }

    function renderReleases(releases) {
        const container = document.getElementById('changelog-content');
        container.innerHTML = '';

        if (!releases || releases.length === 0) {
            container.innerHTML = '<p>No releases found.</p>';
            return;
        }

        // Update Download Links with latest release
        const latest = releases[0];
        updateDownloadLinks(latest);

        // Render Patch Notes
        releases.forEach(release => {
            const date = new Date(release.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Convert to html
            let body = release.body
                .replace(/\r\n/g, '<br>')
                .replace(/### (.*?)(<br>|$)/g, '<strong>$1</strong><br>')
                .replace(/- (.*?)(<br>|$)/g, '<li>$1</li>');

            const formattedBody = formatReleaseBody(release.body);

            const releaseEl = document.createElement('div');
            releaseEl.className = 'release-item';
            releaseEl.innerHTML = `
                <div class="release-header">
                    <div class="release-title-group">
                        <span class="release-title">${release.name || release.tag_name}</span>
                        ${release.prerelease ? '<span class="release-tag" style="background: #e67e22;">Pre-release</span>' : '<span class="release-tag">Latest</span>'}
                    </div>
                    <div class="release-meta">
                        <span class="release-date">${date}</span>
                    </div>
                </div>
                <div class="release-body">${formattedBody}</div>
                <div class="release-assets" style="margin-top: 15px;">
                    <a href="${release.html_url}" target="_blank" style="color: var(--primary-color); font-size: 0.9rem;">View full release notes <i class="fas fa-external-link-alt"></i></a>
                </div>
            `;
            container.appendChild(releaseEl);
        });
    }

    function formatReleaseBody(text) {
        if (!text) return '';
        let html = text
            // Headers
            .replace(/^### (.*$)/gm, '<h4>$1</h4>')
            .replace(/^## (.*$)/gm, '<h3>$1</h3>')

            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')

            // List items
            .replace(/^- (.*$)/gm, '<li>$1</li>');

        // Wrap lists in <ul>
        const lines = html.split('\n');
        let inList = false;
        let finalHtml = '';

        lines.forEach(line => {
            if (line.includes('<li>')) {
                if (!inList) {
                    finalHtml += '<ul>';
                    inList = true;
                }
                finalHtml += line;
            } else {
                if (inList) {
                    finalHtml += '</ul>';
                    inList = false;
                }
                if (line.trim() !== '') {
                    finalHtml += `<p>${line}</p>`;
                }
            }
        });

        if (inList) finalHtml += '</ul>';

        return finalHtml;
    }

    function updateDownloadLinks(release) {
        if (!release) return;

        const winAsset = release.assets.find(a => a.name.endsWith('.exe'));
        const linuxDeb = release.assets.find(a => a.name.endsWith('.deb'));
        const linuxAppImage = release.assets.find(a => a.name.endsWith('.AppImage'));
        const macDmg = release.assets.find(a => a.name.endsWith('.dmg'));

        // Windows
        const winBtn = document.getElementById('win-download');
        if (winAsset) {
            winBtn.href = winAsset.browser_download_url;
            winBtn.innerHTML = `<i class="fas fa-download"></i> Download .exe`;
        } else {
            winBtn.href = release.html_url;
            winBtn.innerHTML = `View on GitHub`;
        }

        // Linux Deb
        const linuxDebBtn = document.getElementById('linux-deb-download');
        if (linuxDebBtn) {
            if (linuxDeb) {
                linuxDebBtn.href = linuxDeb.browser_download_url;
                linuxDebBtn.innerHTML = `<i class="fas fa-download"></i> Download .deb`;
                linuxDebBtn.style.display = 'inline-flex';
            } else {
                linuxDebBtn.style.display = 'none';
            }
        }

        // Linux AppImage
        const linuxAppImageBtn = document.getElementById('linux-appimage-download');
        if (linuxAppImageBtn) {
            if (linuxAppImage) {
                linuxAppImageBtn.href = linuxAppImage.browser_download_url;
                linuxAppImageBtn.innerHTML = `<i class="fas fa-download"></i> Download .AppImage`;
                linuxAppImageBtn.style.display = 'inline-flex';
            } else {
                linuxAppImageBtn.style.display = 'none';
            }
        }

        // Mac
        const macBtn = document.getElementById('mac-download');
        if (macDmg) {
            macBtn.href = macDmg.browser_download_url;
            macBtn.innerHTML = `<i class="fas fa-download"></i> Download .dmg`;
        } else {
            macBtn.href = release.html_url;
            macBtn.innerHTML = `View on GitHub`;
        }
    }

    function setupMobileMenu() {
        const btn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav-links');

        btn.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(15, 16, 20, 0.95)';
                nav.style.flexDirection = 'column';
                nav.style.padding = '20px';
                nav.style.textAlign = 'center';
            }
        });
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            });
        });
    }
});
