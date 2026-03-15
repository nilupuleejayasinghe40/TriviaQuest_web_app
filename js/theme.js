// ========== Theme Toggle ==========
(function () {
  const saved = localStorage.getItem('tq_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateIcon(saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('tq_theme', next);
        updateIcon(next);
      });
    }
  });

  function updateIcon(theme) {
    // Will run again after DOM loads
    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Re-run icon update after DOM loads
  document.addEventListener('DOMContentLoaded', () => updateIcon(
    document.documentElement.getAttribute('data-theme')
  ));
})();
