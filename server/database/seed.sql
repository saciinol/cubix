-- ============================================
-- SEED DATA FOR TESTING
-- ============================================

-- Insert test users (passwords are 'password123' hashed with bcrypt)
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('jane_smith', 'jane@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890'),
('bob_wilson', 'bob@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890');

-- Insert profiles
INSERT INTO profiles (user_id, display_name, bio) VALUES
(1, 'John Doe', 'Software developer passionate about web technologies'),
(2, 'Jane Smith', 'Designer and creative thinker'),
(3, 'Bob Wilson', 'Tech enthusiast and blogger');

-- Insert posts
INSERT INTO posts (user_id, content) VALUES
(1, 'Hello Cubix! This is my first post.'),
(1, 'Learning PERN stack is amazing!'),
(2, 'Just finished a new design project 🎨'),
(3, 'Anyone else excited about the new web features?');

-- Insert follows
INSERT INTO follows (follower_id, following_id) VALUES
(1, 2), -- John follows Jane
(1, 3), -- John follows Bob
(2, 1), -- Jane follows John
(3, 1); -- Bob follows John

SELECT 'Seed data inserted successfully!' AS status;