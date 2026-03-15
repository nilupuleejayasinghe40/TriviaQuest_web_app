// ========== Quiz Engine ==========

let quizState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  difficulty: 'medium',
  totalQuestions: 10,
  answered: false,
  timerInterval: null,
  timeLeft: 30,
  totalTimeTaken: 0,
  startTime: null
};

const SECONDS_PER_QUESTION = 30;

// ========== Init ==========
document.addEventListener('DOMContentLoaded', () => {
  // Auth guard: require login to take quiz
  const authGuard = document.getElementById('authGuard');
  const quizSetup = document.getElementById('quizSetup');

  if (!Auth.isLoggedIn()) {
    if (authGuard) authGuard.classList.remove('hidden');
    if (quizSetup) quizSetup.style.display = 'none';
    return;
  }

  // Setup difficulty buttons
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizState.difficulty = btn.dataset.diff;
    });
  });

  // Setup count buttons
  document.querySelectorAll('.count-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizState.totalQuestions = parseInt(btn.dataset.count);
    });
  });
});

// ========== Start Quiz ==========
function startQuiz() {
  const pool = questionBank[quizState.difficulty];
  if (!pool || pool.length === 0) {
    showBootstrapAlert('No Questions', 'No questions available for this difficulty. Please try another level.', 'warning');
    return;
  }

  // Shuffle and pick questions
  const shuffled = shuffleArray([...pool]);
  quizState.questions = shuffled.slice(0, Math.min(quizState.totalQuestions, shuffled.length));
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.answered = false;
  quizState.totalTimeTaken = 0;
  quizState.startTime = Date.now();

  // Toggle screens
  document.getElementById('quizSetup').style.display = 'none';
  document.getElementById('quizActive').style.display = 'block';
  document.getElementById('quizResults').style.display = 'none';

  loadQuestion();
}

// ========== Load Question ==========
function loadQuestion() {
  const q = quizState.questions[quizState.currentIndex];
  const total = quizState.questions.length;
  quizState.answered = false;

  // Update header
  document.getElementById('questionCounter').textContent = `Question ${quizState.currentIndex + 1} / ${total}`;
  document.getElementById('scoreDisplay').textContent = `Score: ${quizState.score}`;

  // Progress bar
  const progress = ((quizState.currentIndex) / total) * 100;
  document.getElementById('progressBar').style.width = progress + '%';

  // Question content
  document.getElementById('questionLabel').textContent = `Question ${quizState.currentIndex + 1}`;
  document.getElementById('questionText').textContent = q.question;

  // Options
  const optionsList = document.getElementById('optionsList');
  const letters = ['A', 'B', 'C', 'D'];
  optionsList.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[idx]}</span><span>${escapeHtmlQuiz(opt)}</span>`;
    btn.addEventListener('click', () => selectAnswer(idx, btn));
    optionsList.appendChild(btn);
  });

  // Hide next button
  document.getElementById('nextBtn').style.display = 'none';

  // Animate
  const card = document.getElementById('questionCard');
  card.classList.remove('animate-fade');
  void card.offsetWidth; // force reflow
  card.classList.add('animate-fade');

  // Start timer
  startTimer();
}

// ========== Select Answer ==========
function selectAnswer(selectedIdx, selectedBtn) {
  if (quizState.answered) return;
  quizState.answered = true;

  clearInterval(quizState.timerInterval);

  const q = quizState.questions[quizState.currentIndex];
  const correctIdx = q.answer;
  const allBtns = document.querySelectorAll('.option-btn');

  // Disable all buttons
  allBtns.forEach(btn => btn.classList.add('disabled'));

  // Mark correct
  allBtns[correctIdx].classList.add('correct');

  // Mark selected wrong if incorrect
  if (selectedIdx !== correctIdx) {
    selectedBtn.classList.add('wrong');
  } else {
    quizState.score++;
    document.getElementById('scoreDisplay').textContent = `Score: ${quizState.score}`;
  }

  // Show next button
  document.getElementById('nextBtn').style.display = 'inline-flex';

  // Auto next if last question, show finish
  if (quizState.currentIndex === quizState.questions.length - 1) {
    document.getElementById('nextBtn').innerHTML = 'Finish <i class="fas fa-flag-checkered"></i>';
  }
}

// ========== Next Question ==========
function nextQuestion() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

// ========== Timer ==========
function startTimer() {
  quizState.timeLeft = SECONDS_PER_QUESTION;
  const timerEl = document.getElementById('timerValue');
  const timerContainer = document.getElementById('timer');

  timerEl.textContent = quizState.timeLeft;
  timerContainer.classList.remove('warning');

  clearInterval(quizState.timerInterval);

  quizState.timerInterval = setInterval(() => {
    quizState.timeLeft--;
    timerEl.textContent = quizState.timeLeft;

    if (quizState.timeLeft <= 5) {
      timerContainer.classList.add('warning');
    }

    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timerInterval);
      // Time's up — auto-select wrong
      if (!quizState.answered) {
        quizState.answered = true;
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns.forEach(btn => btn.classList.add('disabled'));
        const q = quizState.questions[quizState.currentIndex];
        allBtns[q.answer].classList.add('correct');
        document.getElementById('nextBtn').style.display = 'inline-flex';
        if (quizState.currentIndex === quizState.questions.length - 1) {
          document.getElementById('nextBtn').innerHTML = 'Finish <i class="fas fa-flag-checkered"></i>';
        }
      }
    }
  }, 1000);
}

// ========== Show Results ==========
function showResults() {
  clearInterval(quizState.timerInterval);

  const total = quizState.questions.length;
  const correct = quizState.score;
  const wrong = total - correct;
  const percentage = Math.round((correct / total) * 100);
  const timeTaken = Math.round((Date.now() - quizState.startTime) / 1000);

  // Save score
  Auth.saveScore(correct, total, quizState.difficulty, timeTaken);

  // Toggle screens
  document.getElementById('quizActive').style.display = 'none';
  document.getElementById('quizResults').style.display = 'block';

  // Update progress bar to 100%
  document.getElementById('progressBar').style.width = '100%';

  // Results
  document.getElementById('finalScorePercent').textContent = percentage + '%';
  document.getElementById('correctCount').textContent = correct;
  document.getElementById('wrongCount').textContent = wrong;
  document.getElementById('timeTaken').textContent = formatTime(timeTaken);

  // Dynamic messaging
  const icon = document.getElementById('resultsIcon');
  const title = document.getElementById('resultsTitle');
  const subtitle = document.getElementById('resultsSubtitle');

  if (percentage >= 90) {
    icon.textContent = '🏆';
    title.textContent = 'Outstanding!';
    subtitle.textContent = "You're an ICT master! Incredible performance!";
  } else if (percentage >= 70) {
    icon.textContent = '🎉';
    title.textContent = 'Great Job!';
    subtitle.textContent = 'You know your stuff! Keep it up!';
  } else if (percentage >= 50) {
    icon.textContent = '👍';
    title.textContent = 'Good Effort!';
    subtitle.textContent = "You're getting there! Practice makes perfect.";
  } else {
    icon.textContent = '📚';
    title.textContent = 'Keep Learning!';
    subtitle.textContent = "Don't give up! Review the topics and try again.";
  }
}

// ========== Restart Quiz ==========
function restartQuiz() {
  document.getElementById('quizResults').style.display = 'none';
  document.getElementById('quizSetup').style.display = 'block';
  document.getElementById('quizActive').style.display = 'none';
  document.getElementById('progressBar').style.width = '0%';
}

// ========== Utility Functions ==========
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(seconds) {
  if (seconds < 60) return seconds + 's';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function escapeHtmlQuiz(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
