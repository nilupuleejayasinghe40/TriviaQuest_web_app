<?php
/**
 * Quiz API Endpoints
 * TriviaQuest - Phase 3
 *
 * Handles quiz-related API requests:
 * - GET: Fetch questions by difficulty
 * - POST: Save quiz results
 */

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

// Set JSON content type
header('Content-Type: application/json');

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGetQuestions();
        break;

    case 'POST':
        handleSaveResult();
        break;

    default:
        jsonResponse(false, 'Method not allowed', [], 405);
}

/**
 * Handle GET request - Fetch questions
 */
function handleGetQuestions()
{
    global $pdo;

    $difficulty = isset($_GET['difficulty']) ? sanitize($_GET['difficulty']) : 'medium';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

    // Validate difficulty
    if (!in_array($difficulty, ['easy', 'medium', 'hard'])) {
        jsonResponse(false, 'Invalid difficulty level', [], 400);
    }

    // Validate limit
    if ($limit < 5 || $limit > 20) {
        $limit = 10;
    }

    try {
        $questions = getQuestionsByDifficulty($pdo, $difficulty, $limit);

        // Format questions for frontend
        $formattedQuestions = array_map(function ($q) {
            return [
                'id' => $q['id'],
                'question' => $q['question'],
                'options' => [
                    $q['option_a'],
                    $q['option_b'],
                    $q['option_c'],
                    $q['option_d']
                ],
                'answer' => ord($q['correct_answer']) - ord('A'), // Convert A/B/C/D to 0/1/2/3
                'difficulty' => $q['difficulty']
            ];
        }, $questions);

        jsonResponse(true, 'Questions fetched successfully', [
            'questions' => $formattedQuestions,
            'count' => count($formattedQuestions)
        ]);
    } catch (PDOException $e) {
        error_log("Quiz API Error: " . $e->getMessage());
        jsonResponse(false, 'Failed to fetch questions', [], 500);
    }
}

/**
 * Handle POST request - Save quiz result
 */
function handleSaveResult()
{
    global $pdo;

    // Check if user is logged in
    if (!isLoggedIn()) {
        jsonResponse(false, 'Authentication required', [], 401);
    }

    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        $input = $_POST;
    }

    // Extract data
    $score = isset($input['score']) ? (int)$input['score'] : 0;
    $total = isset($input['total']) ? (int)$input['total'] : 0;
    $difficulty = isset($input['difficulty']) ? sanitize($input['difficulty']) : 'medium';
    $timeTaken = isset($input['timeTaken']) ? (int)$input['timeTaken'] : 0;

    // Validation
    if ($total <= 0) {
        jsonResponse(false, 'Invalid total questions', [], 400);
    }

    if (!in_array($difficulty, ['easy', 'medium', 'hard'])) {
        jsonResponse(false, 'Invalid difficulty level', [], 400);
    }

    try {
        $user = getCurrentUser();
        $saved = saveQuizResult($pdo, $user['id'], $score, $total, $difficulty, $timeTaken);

        if ($saved) {
            jsonResponse(true, 'Result saved successfully', [
                'percentage' => round(($score / $total) * 100, 2)
            ]);
        } else {
            jsonResponse(false, 'Failed to save result', [], 500);
        }
    } catch (PDOException $e) {
        error_log("Quiz Result Save Error: " . $e->getMessage());
        jsonResponse(false, 'Failed to save result', [], 500);
    }
}
