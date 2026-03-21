// ========== Authentication Module ==========
// Uses localStorage to simulate user authentication

const Auth = {
  USERS_KEY: 'tq_users',
  SESSION_KEY: 'tq_session',

  getUsers() {
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers(users) {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  },

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
      password: password,
      createdAt: new Date().toISOString(),
      scores: []
    };
    users.push(newUser);
    this.saveUsers(users);
    return { success: true, message: 'Account created successfully' };
  },

  login(email, password) {
    const users = this.getUsers();
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }
    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return { success: true, user: session };
  },

  getCurrentUser() {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'auth/login.php';
  },

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

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

function toggleUserDropdown() {
  showBootstrapConfirm('Log Out', 'Do you want to log out?', function () {
    Auth.logout();
  });
}

function showError(elementId, show = true) {
  const el = document.getElementById(elementId);
  if (el) el.classList.toggle('show', show);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========== Form Handlers ==========
document.addEventListener('DOMContentLoaded', () => {
  updateNavAuth();

  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;
      let valid = true;

      if (!email || !isValidEmail(email)) {
        showError('emailError', true);
        valid = false;
      } else {
        showError('emailError', false);
      }

      if (!password) {
        showError('passwordError', true);
        valid = false;
      } else {
        showError('passwordError', false);
      }

      if (!valid) return;

      const result = Auth.login(email, password);
      if (result.success) {
        window.location.href = 'index.php';
      } else {
        showBootstrapAlert('Login Failed', result.message, 'error');
      }
    });
  }

  // Signup
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('confirmPassword').value;
      let valid = true;

      if (!name || name.length < 2) {
        showError('nameError', true);
        valid = false;
      } else {
        showError('nameError', false);
      }

      if (!email || !isValidEmail(email)) {
        showError('signupEmailError', true);
        valid = false;
      } else {
        showError('signupEmailError', false);
      }

      if (!password || password.length < 6) {
        showError('signupPasswordError', true);
        valid = false;
      } else {
        showError('signupPasswordError', false);
      }

      if (password !== confirm) {
        showError('confirmError', true);
        valid = false;
      } else {
        showError('confirmError', false);
      }

      if (!valid) return;

      const result = Auth.signup(name, email, password);
      if (result.success) {
        signupForm.reset();
        showBootstrapAlert('Account Created!', 'Your account has been created successfully. Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.href = 'auth/login.php';
        }, 2000);
      } else {
        showBootstrapAlert('Sign Up Failed', result.message, 'error');
      }
    });
  }
});
