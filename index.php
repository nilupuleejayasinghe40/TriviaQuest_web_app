<?php
require_once 'includes/db.php';
require_once 'includes/functions.php';

// Get stats
$userCount = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$questionCount = $pdo->query("SELECT COUNT(*) FROM questions")->fetchColumn();

// Get leaderboard
$leaderboard = $pdo->query("
    SELECT u.name, MAX(qr.percentage) as best_score, qr.score, qr.total_questions, qr.difficulty
    FROM quiz_results qr
    JOIN users u ON qr.user_id = u.id
    GROUP BY u.id
    ORDER BY best_score DESC
    LIMIT 10
")->fetchAll(PDO::FETCH_ASSOC);

$user = getUser();
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home — TriviaQuest</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
        <button class="hamburger" onclick="document.getElementById('navLinks').classList.toggle('open')">
            <span></span><span></span><span></span>
        </button>
        <ul class="nav-links" id="navLinks">
            <li><a href="index.php" class="active">Home</a></li>
            <li><a href="quiz.html">Quiz</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.php">Contact</a></li>
        </ul>
        <div class="nav-right">
            <button class="theme-toggle" id="themeToggle"><i class="fas fa-moon" id="themeIcon"></i></button>
            <?php if ($user): ?>
                <a href="dashboard.php" class="btn btn-secondary btn-sm"><?= htmlspecialchars($user['name']) ?></a>
                <a href="auth/logout.php" class="btn btn-outline btn-sm">Logout</a>
            <?php else: ?>
                <a href="auth/login.php" class="btn btn-secondary btn-sm">Sign In</a>
                <a href="auth/register.php" class="btn btn-primary btn-sm">Sign Up</a>
            <?php endif; ?>
        </div>
    </nav>

    <main class="main-content">
        <section class="hero">
            <h1 class="animate-slide">Test Your <span>ICT Knowledge</span><br/>One Quiz at a Time</h1>
            <p class="animate-slide">Challenge yourself with questions on Computer Basics, Networking, Hardware, Software, and more!</p>
            <div class="hero-actions animate-slide">
                <a href="quiz.html" class="btn btn-primary btn-lg"><i class="fas fa-play"></i> Start Quiz</a>
                <a href="about.html" class="btn btn-outline btn-lg">Learn More</a>
            </div>
        </section>

        <div class="stats-bar animate-fade">
            <div class="stat-item">
                <div class="stat-number"><?= $questionCount ?>+</div>
                <div class="stat-label">Questions</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">6</div>
                <div class="stat-label">Categories</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">3</div>
                <div class="stat-label">Difficulty Levels</div>
            </div>
            <div class="stat-item">
                <div class="stat-number"><?= $userCount ?></div>
                <div class="stat-label">Players</div>
            </div>
        </div>

        <section class="section">
            <h2 class="section-title">Quiz Categories</h2>
            <div class="categories-grid">
                <div class="category-card" onclick="location.href='quiz.html'">
                    <div class="cat-icon">💻</div>
                    <h3>Computer Basics</h3>
                    <p>Hardware, software & OS fundamentals</p>
                </div>
                <div class="category-card" onclick="location.href='quiz.html'">
                    <div class="cat-icon">🌐</div>
                    <h3>Networking</h3>
                    <p>Internet, protocols & connectivity</p>
                </div>
                <div class="category-card" onclick="location.href='quiz.html'">
                    <div class="cat-icon">🔒</div>
                    <h3>Cyber Security</h3>
                    <p>Threats, encryption & safety</p>
                </div>
                <div class="category-card" onclick="location.href='quiz.html'">
                    <div class="cat-icon">📊</div>
                    <h3>Data & Databases</h3>
                    <p>SQL, data types & storage</p>
                </div>
                <div class="category-card" onclick="location.href='quiz.html'">
                    <div class="cat-icon">⚙️</div>
                    <h3>Programming Basics</h3>
                    <p>Logic, algorithms & code</p>
                </div>
                <div class="category-card" onclick="location.href='quiz.html'">
                    <div class="cat-icon">🖥️</div>
                    <h3>Hardware & Software</h3>
                    <p>Components & system software</p>
                </div>
            </div>
        </section>

        <section class="section">
            <h2 class="section-title">🏆 Leaderboard</h2>
            <p class="section-subtitle">Top scorers</p>
            <div class="leaderboard">
                <?php if (empty($leaderboard)): ?>
                    <p style="text-align:center;color:var(--text-muted);padding:1rem;">No scores yet. Be the first to play!</p>
                <?php else: ?>
                    <?php foreach ($leaderboard as $i => $entry): ?>
                        <?php $medal = $i === 0 ? '🥇' : ($i === 1 ? '🥈' : ($i === 2 ? '🥉' : ($i + 1))); ?>
                        <div style="display:flex;align-items:center;padding:0.75rem 1rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);margin-bottom:0.5rem;">
                            <div style="width:40px;font-size:1.25rem;font-weight:700;text-align:center;"><?= $medal ?></div>
                            <div style="flex:1;margin-left:0.5rem;">
                                <div style="font-weight:600;"><?= htmlspecialchars($entry['name']) ?></div>
                                <div style="font-size:0.8rem;color:var(--text-muted);"><?= ucfirst($entry['difficulty']) ?></div>
                            </div>
                            <div style="font-size:1.25rem;font-weight:700;color:var(--accent);"><?= $entry['best_score'] ?>%</div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </section>
    </main>

    <footer class="footer">
        <p>&copy; 2026 TriviaQuest. Built with ❤️ for ICT learners.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/theme.js"></script>
</body>
</html>
