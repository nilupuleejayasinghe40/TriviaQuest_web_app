<?php
require_once '../includes/db.php';
require_once '../includes/functions.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = clean($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        $error = 'All fields are required';
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];
            header("Location: ../index.php");
            exit;
        } else {
            $error = 'Invalid email or password';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign In — TriviaQuest</title>
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
        <div class="auth-icon">🧠</div>
        <h2>Welcome Back!</h2>
        <p>Sign in to continue your learning journey and compete on the leaderboard!</p>
      </div>

      <!-- Right Panel — Login Form -->
      <div class="auth-right">
        <h2>Sign In</h2>
        <p class="subtitle">Enter your credentials to continue</p>

        <?php if ($error): ?>
          <div class="alert alert-danger show">
            <i class="fas fa-exclamation-circle"></i> <?= $error ?>
          </div>
        <?php endif; ?>

        <form method="POST">
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
              <input type="password" id="password" name="password" class="form-control" placeholder="Enter your password" required />
              <button type="button" class="password-toggle" onclick="togglePassword('password', this)">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-lg mt-1">
            Sign In
          </button>
        </form>

        <div class="auth-switch">
          Don't have an account? <a href="register.php">Create one</a>
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
