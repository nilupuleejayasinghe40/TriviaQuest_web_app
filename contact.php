<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';

$success = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = clean($_POST['name'] ?? '');
    $email = clean($_POST['email'] ?? '');
    $subject = clean($_POST['subject'] ?? '');
    $message = clean($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $error = 'All fields are required';
    } else {
        $stmt = $pdo->prepare("INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $subject, $message]);
        $success = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us — TriviaQuest</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav class="navbar">
        <a href="index.php" class="nav-brand">
            <div class="brand-icon"><i class="fas fa-brain"></i></div>
            TriviaQuest
        </a>
        <ul class="nav-links">
            <li><a href="index.php">Home</a></li>
            <li><a href="quiz.html">Quiz</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.php" class="active">Contact</a></li>
        </ul>
        <div class="nav-right">
            <button class="theme-toggle" id="themeToggle"><i class="fas fa-moon" id="themeIcon"></i></button>
        </div>
    </nav>

    <main class="main-content">
        <section class="about-hero animate-slide">
            <h1>Get in <span>Touch</span></h1>
            <p>Have a question or feedback? We'd love to hear from you.</p>
        </section>

        <div class="container" style="max-width: 600px; margin: 2rem auto;">
            <?php if ($success): ?>
                <div class="alert alert-success text-center">
                    <i class="fas fa-check-circle fa-2x mb-2"></i>
                    <h5>Message Sent!</h5>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <a href="index.php" class="btn btn-primary">Back to Home</a>
                </div>
            <?php else: ?>
                <?php if ($error): ?>
                    <div class="alert alert-danger"><?= $error ?></div>
                <?php endif; ?>

                <form method="POST" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem;">
                    <div class="mb-3">
                        <label class="form-label">Your Name *</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email *</label>
                        <input type="email" name="email" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Subject *</label>
                        <input type="text" name="subject" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Message *</label>
                        <textarea name="message" class="form-control" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">
                        <i class="fas fa-paper-plane"></i> Send Message
                    </button>
                </form>
            <?php endif; ?>
        </div>
    </main>

    <footer class="footer">
        <p>&copy; 2026 TriviaQuest. Built with ❤️ for ICT learners.</p>
    </footer>

    <script src="js/theme.js"></script>
</body>
</html>
