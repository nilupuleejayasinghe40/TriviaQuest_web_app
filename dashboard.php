<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';

if (!isLoggedIn()) {
    header("Location: auth/login.php");
    exit;
}

$user = getUser();

// Get user stats
$stmt = $pdo->prepare("SELECT COUNT(*) as total, COALESCE(AVG(percentage),0) as avg, COALESCE(MAX(percentage),0) as best FROM quiz_results WHERE user_id = ?");
$stmt->execute([$user['id']]);
$stats = $stmt->fetch(PDO::FETCH_ASSOC);

// Get recent history
$stmt = $pdo->prepare("SELECT * FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 10");
$stmt->execute([$user['id']]);
$history = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard — TriviaQuest</title>
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
            <li><a href="contact.php">Contact</a></li>
        </ul>
        <div class="nav-right">
            <button class="theme-toggle" id="themeToggle"><i class="fas fa-moon" id="themeIcon"></i></button>
            <a href="auth/logout.php" class="btn btn-secondary btn-sm">Logout</a>
        </div>
    </nav>

    <main class="main-content">
        <section class="about-hero animate-slide">
            <h1>Welcome, <span><?= htmlspecialchars($user['name']) ?></span>!</h1>
            <p>Track your progress and view your quiz history</p>
        </section>

        <div class="container">
            <!-- Stats -->
            <div class="row g-4 mb-4">
                <div class="col-md-4">
                    <div class="card text-center p-4">
                        <div style="font-size: 2rem;">🎯</div>
                        <h3><?= $stats['total'] ?></h3>
                        <p class="text-muted">Quizzes Taken</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center p-4">
                        <div style="font-size: 2rem;">📊</div>
                        <h3><?= number_format($stats['avg'], 1) ?>%</h3>
                        <p class="text-muted">Average Score</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card text-center p-4">
                        <div style="font-size: 2rem;">🏆</div>
                        <h3><?= number_format($stats['best'], 1) ?>%</h3>
                        <p class="text-muted">Best Score</p>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="text-center mb-4">
                <a href="quiz.html" class="btn btn-primary btn-lg"><i class="fas fa-play"></i> Start New Quiz</a>
            </div>

            <!-- History -->
            <div class="card">
                <div class="card-header"><h5>Recent Quiz History</h5></div>
                <div class="card-body">
                    <?php if (empty($history)): ?>
                        <p class="text-center text-muted">No quiz attempts yet. Start your first quiz!</p>
                    <?php else: ?>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Difficulty</th>
                                    <th>Score</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($history as $quiz): ?>
                                <tr>
                                    <td><?= date('M j, Y g:i A', strtotime($quiz['created_at'])) ?></td>
                                    <td><span class="badge bg-secondary"><?= ucfirst($quiz['difficulty']) ?></span></td>
                                    <td><?= $quiz['score'] ?>/<?= $quiz['total_questions'] ?> (<?= $quiz['percentage'] ?>%)</td>
                                    <td><?= gmdate('i:s', $quiz['time_taken']) ?></td>
                                </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <p>&copy; 2026 TriviaQuest. Built with ❤️ for ICT learners.</p>
    </footer>

    <script src="js/theme.js"></script>
</body>
</html>
