CREATE DATABASE portfolio;

USE portfolio_db;

CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(100),
    lname VARCHAR(100),
    email VARCHAR(150),
    subject VARCHAR(200),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact_messages (fname, lname, email, subject, message)
VALUES ('Raja', 'Khatua', 'raja@example.com', 'Test Subject', 'This is a test message.');
