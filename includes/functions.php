<?php
session_start();

// Sanitize input
function clean($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// Check if logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Get current user
function getUser() {
    if (!isLoggedIn()) return null;
    return [
        'id' => $_SESSION['user_id'],
        'name' => $_SESSION['user_name'],
        'email' => $_SESSION['user_email']
    ];
}
