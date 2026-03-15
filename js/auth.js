// ========== Authentication Module ==========
// Uses localStorage to simulate user authentication

const Auth = {
  USERS_KEY: 'tq_users',
  SESSION_KEY: 'tq_session',

  // Get all registered users
  getUsers() {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Save users array
  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

  // Register a new user
  signup(name, email, password) {
    const users = this.getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: 'An account with this email already exists' };
    }
    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password, // In production, hash this!
      createdAt: new Date().toISOString(),
      scores: []
    };
    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: 'Account created successfully' };
  },

  // Login user
  login(email, password) {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    // Store session
    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  // Get current logged-in user
  getCurrentUser() {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Logout
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'login.html';
  },

  // Check if user is logged in
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  // Save score for current user
  saveScore(score, total, difficulty, timeTaken) {
    const user = this.getCurrentUser();
    if (!user) return;
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;
    if (!users[idx].scores) users[idx].scores = [];
    users[idx].scores.push({
      score,
      total,
      percentage: Math.round((score / total) * 100),
      difficulty,
      timeTaken,
      date: new Date().toISOString()
    });
    this.saveUsers(users);
  },

  // Get leaderboard data (top scores)
  getLeaderboard(limit = 10) {
    const users = this.getUsers();
    const entries = [];
    users.forEach(user => {
      if (user.scores && user.scores.length > 0) {
        const bestScore = user.scores.reduce((best, s) =>
          s.percentage > best.percentage ? s : best
        , user.scores[0]);
        entries.push({
          name: user.name,
          score: bestScore.percentage,
          total: bestScore.total,
          correct: bestScore.score,
          difficulty: bestScore.difficulty
        });
      }
    });
    entries.sort((a, b) => b.score - a.score);
    return entries.slice(0, limit);
  },

  // Get total user count
  getUserCount() {
    return this.getUsers().length;
  }
};

// ========== Bootstrap Modal Helpers ==========
function showBootstrapAlert(title, message, type) {
  const iconMap = {
    success: '<i class="fas fa-check-circle" style="color: var(--success); font-size: 2.5rem;"></i>',
    error: '<i class="fas fa-exclamation-circle" style="color: var(--danger); font-size: 2.5rem;"></i>',
    warning: '<i class="fas fa-exclamation-triangle" style="color: #f0ad4e; font-size: 2.5rem;"></i>',
    info: '<i class="fas fa-info-circle" style="color: var(--accent); font-size: 2.5rem;"></i>'
  };
  const modalEl = document.getElementById('appModal');
  if (!modalEl) return;
  document.getElementById('appModalTitle').textContent = title;
  document.getElementById('appModalBody').innerHTML =
    '<div style="margin-bottom:1rem;">' + (iconMap[type] || iconMap.info) + '</div>' +
    '<p style="margin:0;">' + message + '</p>';
  document.getElementById('appModalCancel').style.display = 'none';
  const okBtn = document.getElementById('appModalOk');
  okBtn.textContent = 'OK';
  okBtn.className = 'btn btn-primary';
  okBtn.onclick = null;
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
  return modal;
}

function showBootstrapConfirm(title, message, onConfirm) {
  const modalEl = document.getElementById('appModal');
  if (!modalEl) return;
  document.getElementById('appModalTitle').textContent = title;
  document.getElementById('appModalBody').innerHTML =
    '<div style="margin-bottom:1rem;"><i class="fas fa-question-circle" style="color: var(--accent); font-size: 2.5rem;"></i></div>' +
    '<p style="margin:0;">' + message + '</p>';
  const cancelBtn = document.getElementById('appModalCancel');
  cancelBtn.style.display = 'inline-block';
  cancelBtn.textContent = 'Cancel';
  const okBtn = document.getElementById('appModalOk');
  okBtn.textContent = 'Yes, Log Out';
  okBtn.className = 'btn btn-danger';
  const modal = new bootstrap.Modal(modalEl);
  okBtn.onclick = function () {
    modal.hide();
    if (onConfirm) onConfirm();
  };
  modal.show();
}

// ========== Password Toggle ==========
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const icon = btn.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

// ========== Update Navbar Auth State ==========
function updateNavAuth() {
  const user = Auth.getCurrentUser();
  const authLinks = document.getElementById('navAuthLinks');
  const userMenu = document.getElementById('userMenu');
  const userAvatar = document.getElementById('userAvatar');
  const userNameEl = document.getElementById('userName');

  if (!authLinks || !userMenu) return;

  if (user) {
    authLinks.classList.add('hidden');
    userMenu.classList.remove('hidden');
    if (userAvatar) userAvatar.textContent = user.name.charAt(0).toUpperCase();
    if (userNameEl) userNameEl.textContent = user.name.split(' ')[0];
  } else {
    authLinks.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}

// ========== User Dropdown (simple) ==========
function toggleUserDropdown() {
  showBootstrapConfirm('Log Out', 'Do you want to log out?', function () {
    Auth.logout();
  });
}

// ========== Form Validation Helpers ==========
function showError(elementId, show = true) {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.toggle('show', show);
  }
}

function showAlert(alertId, message, show = true) {
  const el = document.getElementById(alertId);
  const msgEl = document.getElementById(alertId + 'Msg');
  if (el) {
    el.classList.toggle('show', show);
    if (msgEl && message) msgEl.textContent = message;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========== Login Form Handler ==========
document.addEventListener('DOMContentLoaded', () => {
  // Update navbar on all pages
  updateNavAuth();

  // ---- LOGIN ----
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    // Redirect if already logged in
    if (Auth.isLoggedIn()) {
      window.location.href = 'index.html';
      return;
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      // Validate email
      if (!email || !isValidEmail(email)) {
        showError('emailError', true);
        valid = false;
      } else {
        showError('emailError', false);
      }

      // Validate password
      if (!password) {
        showError('passwordError', true);
        valid = false;
      } else {
        showError('passwordError', false);
      }

      if (!valid) return;

      // Attempt login
      const result = Auth.login(email, password);
      if (result.success) {
        window.location.href = 'index.html';
      } else {
        showBootstrapAlert('Login Failed', result.message, 'error');
      }
    });
  }

  // ---- SIGNUP ----
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    // Redirect if already logged in
    if (Auth.isLoggedIn()) {
      window.location.href = 'index.html';
      return;
    }

    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('confirmPassword').value;

      // Validate name
      if (!name || name.length < 2) {
        showError('nameError', true);
        valid = false;
      } else {
        showError('nameError', false);
      }

      // Validate email
      if (!email || !isValidEmail(email)) {
        showError('signupEmailError', true);
        valid = false;
      } else {
        showError('signupEmailError', false);
      }

      // Validate password
      if (!password || password.length < 6) {
        showError('signupPasswordError', true);
        valid = false;
      } else {
        showError('signupPasswordError', false);
      }

      // Confirm password
      if (password !== confirm) {
        showError('confirmError', true);
        valid = false;
      } else {
        showError('confirmError', false);
      }

      if (!valid) return;

      // Attempt signup
      const result = Auth.signup(name, email, password);
      if (result.success) {
        signupForm.reset();
        const modal = showBootstrapAlert('Account Created!', 'Your account has been created successfully. Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        showBootstrapAlert('Sign Up Failed', result.message, 'error');
      }
    });
  }
});
