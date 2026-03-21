<?php
require_once '../includes/db.php';
require_once '../includes/functions.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = clean($_POST['name'] ?? '');
    $email = clean($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm = $_POST['confirm_password'] ?? '';

    if (empty($name) || empty($email) || empty($password)) {
        $error = 'All fields are required';
    } elseif (strlen($name) < 2) {
        $error = 'Name must be at least 2 characters';
    } elseif ($password !== $confirm) {
        $error = 'Passwords do not match';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters';
    } else {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            $error = 'An account with this email already exists';
        } else {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->execute([$name, $email, $hash]);
            $success = 'Account created successfully! Redirecting to login...';
            header("refresh:2;url=login.php");
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up — TriviaQuest</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
  <!-- Theme toggle floating -->
  <button class="theme-toggle" id="themeToggle" style="position:fixed;top:1.5rem;right:1.5rem;z-index:999;" title="Toggle theme">
    <i class="fas fa-moon" id="themeIcon"></i>
  </button>

  <div class="auth-container">
    <div class="auth-wrapper animate-fade">
      <!-- Left Panel -->
      <div class="auth-left">
        <div class="auth-icon">🚀</div>
        <h2>Join TriviaQuest</h2>
        <p>Create your account and start mastering ICT & Computer fundamentals through fun quizzes!</p>
      </div>

      <!-- Right Panel — Signup Form -->
      <div class="auth-right">
        <h2>Create Account</h2>
        <p class="subtitle">Fill in your details to get started</p>

        <?php if ($error): ?>
          <div class="alert alert-danger show">
            <i class="fas fa-exclamation-circle"></i> <?= $error ?>
          </div>
        <?php endif; ?>
        <?php if ($success): ?>
          <div class="alert alert-success show">
            <i class="fas fa-check-circle"></i> <?= $success ?>
          </div>
        <?php endif; ?>

        <form method="POST">
          <div class="form-group">
            <label for="name">Full Name</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input type="text" id="name" name="name" class="form-control" placeholder="John Doe" required />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-envelope input-icon"></i>
              <input type="email" id="email" name="email" class="form-control" placeholder="you@example.com" required />
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input type="password" id="password" name="password" class="form-control" placeholder="Min. 6 characters" required />
              <button type="button" class="password-toggle" onclick="togglePassword('password', this)">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="confirm_password">Confirm Password</label>
            <div class="input-icon-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input type="password" id="confirm_password" name="confirm_password" class="form-control" placeholder="Re-enter your password" required />
              <button type="button" class="password-toggle" onclick="togglePassword('confirm_password', this)">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-lg mt-1">
            Create Account
          </button>
        </form>

        <div class="auth-switch">
          Already have an account? <a href="login.php">Sign in</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap Generic Modal -->
  <div class="modal fade" id="appModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border);">
        <div class="modal-header" style="border-bottom: 1px solid var(--border);">
          <h5 class="modal-title" id="appModalTitle">Alert</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center" id="appModalBody" style="padding: 1.5rem;"></div>
        <div class="modal-footer" style="border-top: 1px solid var(--border);">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="appModalCancel" style="display:none;">Cancel</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="appModalOk">OK</button>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../js/auth.js"></script>
  <script src="../js/theme.js"></script>
</body>
</html>
