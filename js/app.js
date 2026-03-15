// ========== App.js – Home & About page logic ==========

document.addEventListener('DOMContentLoaded', () => {
  // Update total users count on home page
  const totalUsersEl = document.getElementById('totalUsers');
  if (totalUsersEl) {
    totalUsersEl.textContent = Auth.getUserCount();
  }

  // Render leaderboard
  renderLeaderboard();
});

function renderLeaderboard() {
  const container = document.getElementById('leaderboard');
  if (!container) return;

  const entries = Auth.getLeaderboard(10);

  if (entries.length === 0) {
    container.innerHTML = `
      <h3><i class="fas fa-trophy" style="color:#ffd700;"></i> Top Scores</h3>
      <p style="text-align:center;color:var(--text-muted);padding:1.5rem 0;">
        No scores yet. Be the first to play!
      </p>
    `;
    return;
  }

  let html = `<h3><i class="fas fa-trophy" style="color:#ffd700;"></i> Top Scores</h3>`;

  entries.forEach((entry, index) => {
    let rankClass = '';
    if (index === 0) rankClass = 'gold';
    else if (index === 1) rankClass = 'silver';
    else if (index === 2) rankClass = 'bronze';

    html += `
      <div class="leaderboard-item">
        <div class="lb-rank ${rankClass}">${index + 1}</div>
        <span class="lb-name">${escapeHtml(entry.name)}</span>
        <span class="lb-score">${entry.score}%</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
