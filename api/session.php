<?php
/**
 * Session Check API
 * TriviaQuest - Phase 3
 *
 * Returns current user session status.
 * Used by frontend to sync PHP sessions with JavaScript.
 */

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

header('Content-Type: application/json');

if (isLoggedIn()) {
    $user = getCurrentUser();
    echo json_encode([
        'success' => true,
        'loggedIn' => true,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);
} else {
    echo json_encode([
        'success' => true,
        'loggedIn' => false,
        'user' => null
    ]);
}
