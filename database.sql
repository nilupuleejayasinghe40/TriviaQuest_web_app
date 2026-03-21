-- ============================================
-- TriviaQuest Database Schema
-- Phase 3 - ICT 2204 / COM 2303 Individual Project
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS triviaquest;
USE triviaquest;

-- ============================================
-- USERS TABLE
-- Stores registered user accounts
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- MESSAGES TABLE
-- Stores contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- CATEGORIES TABLE
-- Quiz categories/topics
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default categories
INSERT INTO categories (name, description, icon) VALUES
('Computer Basics', 'Hardware, software & OS fundamentals', '💻'),
('Networking', 'Internet, protocols & connectivity', '🌐'),
('Cyber Security', 'Threats, encryption & safety', '🔒'),
('Data & Databases', 'SQL, data types & storage', '📊'),
('Programming Basics', 'Logic, algorithms & code concepts', '⚙️'),
('Hardware & Software', 'Components, OS & system software', '🖥️');

-- ============================================
-- QUESTIONS TABLE
-- Stores quiz questions
-- ============================================
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer ENUM('A', 'B', 'C', 'D') NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Sample Questions - EASY
-- ============================================
INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
(1, 'What does CPU stand for?', 'Central Processing Unit', 'Central Program Utility', 'Computer Personal Unit', 'Central Processor Unifier', 'A', 'easy'),
(1, 'Which of the following is an input device?', 'Monitor', 'Printer', 'Keyboard', 'Speaker', 'C', 'easy'),
(1, 'What does RAM stand for?', 'Read Access Memory', 'Random Access Memory', 'Run Application Memory', 'Rapid Access Module', 'B', 'easy'),
(1, 'Which of these is an operating system?', 'Google Chrome', 'Microsoft Word', 'Windows 11', 'Photoshop', 'C', 'easy'),
(1, 'What is the main function of a hard drive?', 'Process data', 'Display images', 'Store data permanently', 'Connect to the internet', 'C', 'easy'),
(2, 'What does www stand for in a web address?', 'Wide Web World', 'World Wide Web', 'Web World Wide', 'World Web Wide', 'B', 'easy'),
(1, 'Which unit is used to measure the speed of a processor?', 'Megabytes', 'Gigahertz', 'Pixels', 'Watts', 'B', 'easy'),
(6, 'What does USB stand for?', 'Universal Serial Bus', 'United System Base', 'Universal System Bus', 'Ultra Speed Buffer', 'A', 'easy'),
(1, 'Which of these is a web browser?', 'Excel', 'PowerPoint', 'Firefox', 'Outlook', 'C', 'easy'),
(1, 'What is the smallest unit of data in a computer?', 'Byte', 'Kilobyte', 'Bit', 'Megabyte', 'C', 'easy'),
(6, 'Which device is used to print documents?', 'Scanner', 'Monitor', 'Printer', 'Mouse', 'C', 'easy'),
(5, 'What does HTML stand for?', 'Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language', 'A', 'easy'),
(1, 'Which of these is an output device?', 'Keyboard', 'Mouse', 'Monitor', 'Scanner', 'C', 'easy'),
(1, 'How many bytes are in 1 kilobyte?', '100', '512', '1024', '1000', 'C', 'easy'),
(2, 'What does Wi-Fi help you do?', 'Print documents', 'Connect to the internet wirelessly', 'Charge your phone', 'Store files', 'B', 'easy'),
(1, 'Which key is used to delete the character before the cursor?', 'Delete', 'Backspace', 'Enter', 'Tab', 'B', 'easy'),
(6, 'What type of software is Microsoft Word?', 'System software', 'Application software', 'Utility software', 'Firmware', 'B', 'easy'),
(1, 'What does PDF stand for?', 'Portable Document Format', 'Print Data File', 'Personal Document Folder', 'Program Data Format', 'A', 'easy'),
(1, 'Which one of these is volatile memory?', 'Hard Drive', 'SSD', 'RAM', 'USB Flash', 'C', 'easy'),
(2, 'What is the full form of LAN?', 'Large Area Network', 'Local Access Node', 'Local Area Network', 'Linked Area Network', 'C', 'easy');

-- ============================================
-- Insert Sample Questions - MEDIUM
-- ============================================
INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
(2, 'Which protocol is used to send emails?', 'HTTP', 'FTP', 'SMTP', 'TCP', 'C', 'medium'),
(1, 'What is the primary purpose of an operating system?', 'Run games', 'Manage hardware and software resources', 'Browse the internet', 'Create documents', 'B', 'medium'),
(2, 'What does IP stand for in IP address?', 'Internet Program', 'Internet Protocol', 'Internal Process', 'Input Protocol', 'B', 'medium'),
(5, 'Which of the following is NOT a programming language?', 'Python', 'Java', 'HTML', 'C++', 'C', 'medium'),
(1, 'What does BIOS stand for?', 'Basic Integrated Operating System', 'Basic Input Output System', 'Binary Input Output Standard', 'Base Internal Operation System', 'B', 'medium'),
(3, 'What is phishing in cyber security?', 'A type of virus', 'Fishing on the internet', 'A fraudulent attempt to obtain sensitive information', 'Blocking a website', 'C', 'medium'),
(2, 'Which topology connects all devices to a single central cable?', 'Star', 'Bus', 'Ring', 'Mesh', 'B', 'medium'),
(4, 'What does SQL stand for?', 'Structured Query Language', 'Simple Question Language', 'System Query Logic', 'Standard Query Library', 'A', 'medium'),
(4, 'Which of these is a relational database management system?', 'Photoshop', 'MySQL', 'Windows', 'Chrome', 'B', 'medium'),
(2, 'What is the function of a router?', 'Store data', 'Display web pages', 'Direct network traffic between devices', 'Print documents', 'C', 'medium'),
(6, 'What does SSD stand for?', 'Solid State Drive', 'System Storage Device', 'Super Speed Disk', 'Standard System Drive', 'A', 'medium'),
(4, 'Which of the following is an example of cloud storage?', 'USB Drive', 'Hard Disk', 'Google Drive', 'DVD', 'C', 'medium'),
(3, 'What does HTTPS S stand for?', 'Simple', 'Standard', 'Secure', 'System', 'C', 'medium'),
(1, 'In binary, what is the decimal value of 1010?', '8', '10', '12', '14', 'B', 'medium'),
(3, 'What is malware?', 'A hardware component', 'Malicious software', 'A type of firewall', 'A programming language', 'B', 'medium'),
(2, 'Which layer of the OSI model is responsible for routing?', 'Data Link', 'Transport', 'Network', 'Session', 'C', 'medium'),
(3, 'What is the purpose of a firewall?', 'Speed up internet', 'Monitor and filter network traffic', 'Store passwords', 'Compress files', 'B', 'medium'),
(1, 'What does GUI stand for?', 'General User Input', 'Graphical User Interface', 'Global Unified Integration', 'Graphical Universal Interaction', 'B', 'medium'),
(1, 'Which of these file extensions is for a spreadsheet?', '.docx', '.xlsx', '.pptx', '.pdf', 'B', 'medium'),
(5, 'What is an algorithm?', 'A computer virus', 'A step-by-step procedure to solve a problem', 'A type of hardware', 'A programming language', 'B', 'medium');

-- ============================================
-- Insert Sample Questions - HARD
-- ============================================
INSERT INTO questions (category_id, question, option_a, option_b, option_c, option_d, correct_answer, difficulty) VALUES
(5, 'What is the time complexity of binary search?', 'O(n)', 'O(n²)', 'O(log n)', 'O(1)', 'C', 'hard'),
(2, 'Which of the following is a private IP address range?', '8.8.8.0 – 8.8.8.255', '192.168.0.0 – 192.168.255.255', '200.0.0.0 – 200.255.255.255', '172.32.0.0 – 172.63.255.255', 'B', 'hard'),
(2, 'What is the default subnet mask for a Class C network?', '255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255', 'C', 'hard'),
(2, 'In the OSI model, which layer handles encryption and decryption?', 'Application', 'Presentation', 'Session', 'Transport', 'B', 'hard'),
(6, 'What does RAID stand for?', 'Redundant Array of Independent Disks', 'Random Access Integrated Data', 'Rapid Array of Internal Drives', 'Reliable Automated Integrated Disks', 'A', 'hard'),
(5, 'Which sorting algorithm has the best average-case time complexity?', 'Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort', 'C', 'hard'),
(3, 'What is a man-in-the-middle attack?', 'A virus that replicates itself', 'An attacker intercepts communication between two parties', 'A brute force password attack', 'A denial of service attack', 'B', 'hard'),
(4, 'What is normalization in databases?', 'Making data larger', 'Organizing data to reduce redundancy', 'Encrypting data', 'Backing up data', 'B', 'hard'),
(3, 'Which of the following uses asymmetric encryption?', 'AES', 'DES', 'RSA', 'Blowfish', 'C', 'hard'),
(2, 'What is the purpose of DNS?', 'Assign IP addresses automatically', 'Translate domain names to IP addresses', 'Encrypt web traffic', 'Filter spam emails', 'B', 'hard'),
(5, 'What does the volatile keyword mean in programming?', 'The variable is constant', 'The variable may change unexpectedly', 'The variable is global', 'The variable is private', 'B', 'hard'),
(5, 'Which data structure uses FIFO (First In, First Out)?', 'Stack', 'Queue', 'Tree', 'Graph', 'B', 'hard'),
(1, 'What is a virtual machine?', 'A physical server', 'Software that emulates a computer system', 'A type of hard drive', 'A web browser', 'B', 'hard'),
(2, 'What protocol does DHCP use to assign IP addresses?', 'TCP', 'UDP', 'ICMP', 'ARP', 'B', 'hard'),
(1, 'In hexadecimal, what is FF in decimal?', '128', '200', '255', '512', 'C', 'hard'),
(1, 'What is the function of the ALU in a CPU?', 'Store data temporarily', 'Perform arithmetic and logical operations', 'Manage memory allocation', 'Control input devices', 'B', 'hard'),
(2, 'What does the term latency refer to in networking?', 'Data transfer speed', 'Delay before data transfer begins', 'Amount of data transferred', 'Network bandwidth', 'B', 'hard'),
(4, 'Which of these is a NoSQL database?', 'PostgreSQL', 'MySQL', 'MongoDB', 'Oracle', 'C', 'hard'),
(1, 'What is a deadlock in operating systems?', 'When the CPU overheats', 'When two or more processes are waiting for each other indefinitely', 'When memory is full', 'When a file is corrupted', 'B', 'hard'),
(2, 'What is the maximum number of hosts in a /24 subnet?', '256', '254', '255', '128', 'B', 'hard');

-- ============================================
-- QUIZ RESULTS TABLE
-- Stores user quiz attempts and scores
-- ============================================
CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL,
    time_taken INT NOT NULL COMMENT 'Time in seconds',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INDEXES for better query performance
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_score ON quiz_results(percentage DESC);
CREATE INDEX idx_messages_read ON messages(is_read);
