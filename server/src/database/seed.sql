-- ============================================
-- CUBIX DATABASE SEED DATA
-- ============================================

-- Clear existing data (optional - comment out if you want to keep data)
TRUNCATE TABLE notifications CASCADE;
TRUNCATE TABLE follows CASCADE;
TRUNCATE TABLE likes CASCADE;
TRUNCATE TABLE comments CASCADE;
TRUNCATE TABLE posts CASCADE;
TRUNCATE TABLE profiles CASCADE;
TRUNCATE TABLE users CASCADE;

-- Reset sequences
ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
ALTER SEQUENCE profiles_profile_id_seq RESTART WITH 1;
ALTER SEQUENCE posts_post_id_seq RESTART WITH 1;
ALTER SEQUENCE comments_comment_id_seq RESTART WITH 1;
ALTER SEQUENCE likes_like_id_seq RESTART WITH 1;
ALTER SEQUENCE follows_follow_id_seq RESTART WITH 1;
ALTER SEQUENCE notifications_notification_id_seq RESTART WITH 1;

-- ============================================
-- SEED USERS
-- ============================================
-- Note: In production, passwords should be hashed with bcrypt
-- These are example passwords: 'password123'
INSERT INTO users (username, email, password, created_at) VALUES
('alice_wonder', 'alice@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '6 months'),
('bob_builder', 'bob@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '5 months'),
('charlie_chaplin', 'charlie@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '4 months'),
('diana_prince', 'diana@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '3 months'),
('ethan_hunt', 'ethan@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '3 months'),
('fiona_apple', 'fiona@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '2 months'),
('george_lucas', 'george@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '2 months'),
('hannah_montana', 'hannah@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '1 month'),
('ian_malcolm', 'ian@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '1 month'),
('jane_doe', 'jane@example.com', '$2b$10$rZ8qH5K5vJxH5XxH5XxH5eN5K5vJxH5XxH5XxH5XxH5XxH5XxH5Xx', NOW() - INTERVAL '2 weeks');

-- ============================================
-- SEED PROFILES
-- ============================================
INSERT INTO profiles (user_id, display_name, bio, avatar_url, cover_url, location, website) VALUES
(1, 'Alice Wonderland', 'Exploring the rabbit hole of technology 🐰', 'https://i.pravatar.cc/150?img=1', 'https://picsum.photos/seed/alice/1200/400', 'San Francisco, CA', 'https://alice.dev'),
(2, 'Bob The Builder', 'Can we fix it? Yes we can! 🔨', 'https://i.pravatar.cc/150?img=12', 'https://picsum.photos/seed/bob/1200/400', 'New York, NY', 'https://bobbuilds.com'),
(3, 'Charlie Chaplin', 'Silent but deadly (at coding) 🎬', 'https://i.pravatar.cc/150?img=13', 'https://picsum.photos/seed/charlie/1200/400', 'Los Angeles, CA', 'https://charlie.io'),
(4, 'Diana Prince', 'Wonder Woman of Web Development 💪', 'https://i.pravatar.cc/150?img=5', 'https://picsum.photos/seed/diana/1200/400', 'Themyscira', 'https://wonderdev.com'),
(5, 'Ethan Hunt', 'Mission: Build Impossible Apps 🕵️', 'https://i.pravatar.cc/150?img=33', 'https://picsum.photos/seed/ethan/1200/400', 'Washington, DC', 'https://impossible.dev'),
(6, 'Fiona Apple', 'Singing the songs of clean code 🎵', 'https://i.pravatar.cc/150?img=9', 'https://picsum.photos/seed/fiona/1200/400', 'Nashville, TN', 'https://fionaapple.music'),
(7, 'George Lucas', 'May the Source be with you ⚡', 'https://i.pravatar.cc/150?img=51', 'https://picsum.photos/seed/george/1200/400', 'Skywalker Ranch, CA', 'https://thelucasway.com'),
(8, 'Hannah Montana', 'Living the best of both stacks 🎤', 'https://i.pravatar.cc/150?img=32', 'https://picsum.photos/seed/hannah/1200/400', 'Malibu, CA', 'https://bestofbothworlds.dev'),
(9, 'Ian Malcolm', 'Life, uh, finds a way... to debug 🦖', 'https://i.pravatar.cc/150?img=14', 'https://picsum.photos/seed/ian/1200/400', 'Isla Nublar', 'https://chaostheory.tech'),
(10, 'Jane Doe', 'Mystery developer extraordinaire 🔍', 'https://i.pravatar.cc/150?img=45', 'https://picsum.photos/seed/jane/1200/400', 'Unknown', NULL);

-- ============================================
-- SEED POSTS
-- ============================================
INSERT INTO posts (user_id, content, image_url, likes_count, comments_count, created_at) VALUES
-- Alice's posts
(1, 'Just deployed my first Next.js app! Feeling amazing 🚀', 'https://picsum.photos/seed/post1/800/600', 15, 3, NOW() - INTERVAL '5 days'),
(1, 'Hot take: TypeScript makes you a better JavaScript developer. Change my mind 🤔', NULL, 42, 12, NOW() - INTERVAL '3 days'),
(1, 'Why is debugging at 2 AM so productive? Is this a superpower? 🦸‍♀️', NULL, 23, 5, NOW() - INTERVAL '1 day'),

-- Bob's posts
(2, 'Built a CRUD app today. Tomorrow, we build Rome! 🏛️', 'https://picsum.photos/seed/post2/800/600', 8, 2, NOW() - INTERVAL '4 days'),
(2, 'Just discovered Supabase. Where has this been all my life?! 😍', NULL, 31, 7, NOW() - INTERVAL '2 days'),

-- Charlie's posts
(3, 'Code review tip: Be kind. We all write bugs. Even you. Especially you. 😅', NULL, 56, 15, NOW() - INTERVAL '6 days'),
(3, 'Finally understood closures. I feel like I graduated dev school again! 🎓', NULL, 19, 4, NOW() - INTERVAL '4 days'),
(3, 'My rubber duck debugging technique: buy 10 rubber ducks. Works 10x better. Science. 🦆', 'https://picsum.photos/seed/post3/800/600', 67, 21, NOW() - INTERVAL '12 hours'),

-- Diana's posts
(4, 'Women in tech: we belong here and we''re not going anywhere 💪✨', NULL, 89, 18, NOW() - INTERVAL '5 days'),
(4, 'Shoutout to all the devs who Google "how to center a div" - you are valid 🤗', NULL, 103, 24, NOW() - INTERVAL '2 days'),

-- Ethan's posts
(5, 'This bug is impossible to fix. Challenge accepted. 🎯', NULL, 12, 3, NOW() - INTERVAL '3 days'),
(5, 'Just refactored 2000 lines into 200. Feel like a wizard 🧙‍♂️', NULL, 45, 8, NOW() - INTERVAL '1 day'),

-- Fiona's posts
(6, 'Music + coding = productivity heaven 🎧💻', 'https://picsum.photos/seed/post4/800/600', 28, 6, NOW() - INTERVAL '4 days'),
(6, 'CSS is art. Fight me. 🎨', NULL, 34, 9, NOW() - INTERVAL '18 hours'),

-- George's posts
(7, 'In my day, we had to walk uphill both ways to use the internet... 👴', NULL, 21, 7, NOW() - INTERVAL '5 days'),
(7, 'Star Wars but make it with React components. Coming soon to a repo near you! ⭐', 'https://picsum.photos/seed/post5/800/600', 76, 16, NOW() - INTERVAL '1 day'),

-- Hannah's posts
(8, 'Frontend or backend? Why not both! 🤷‍♀️', NULL, 39, 11, NOW() - INTERVAL '3 days'),
(8, 'Just got my first PR merged! Thank you to everyone who reviewed 🙏', NULL, 52, 8, NOW() - INTERVAL '6 hours'),

-- Ian's posts
(9, 'Dinosaurs didn''t die from an asteroid. They died from merge conflicts. 🦕', NULL, 94, 19, NOW() - INTERVAL '4 days'),
(9, 'Life finds a way, but Git doesn''t. Please commit your changes. 😤', NULL, 61, 13, NOW() - INTERVAL '2 days'),

-- Jane's posts
(10, 'Hello world! First post on Cubix 👋', NULL, 17, 5, NOW() - INTERVAL '1 day'),
(10, 'Looking for project collaborators! DM me if interested 🚀', NULL, 9, 2, NOW() - INTERVAL '8 hours');

-- ============================================
-- SEED COMMENTS
-- ============================================
INSERT INTO comments (post_id, user_id, content, parent_comment_id, created_at) VALUES
-- Comments on Alice's posts
(1, 2, 'Congratulations! What did you build?', NULL, NOW() - INTERVAL '4 days'),
(1, 4, 'Amazing work! Keep it up! 🎉', NULL, NOW() - INTERVAL '4 days'),
(1, 5, 'Next.js is incredible. Welcome to the club!', NULL, NOW() - INTERVAL '4 days'),

(2, 3, 'TypeScript is a game changer for sure!', NULL, NOW() - INTERVAL '2 days'),
(2, 6, 'I agree 100%! No going back once you start', NULL, NOW() - INTERVAL '2 days'),
(2, 7, 'Been using it for 5 years. Best decision ever.', NULL, NOW() - INTERVAL '2 days'),
(2, 8, 'Hot take indeed! I''m still on the fence', NULL, NOW() - INTERVAL '2 days'),
(2, 1, 'Once you go typed, you never go back 😄', 4, NOW() - INTERVAL '2 days'),

(3, 9, 'It''s called the ballmer peak 😂', NULL, NOW() - INTERVAL '23 hours'),
(3, 10, 'The bugs fear the 2 AM developer', NULL, NOW() - INTERVAL '20 hours'),

-- Comments on Bob's posts
(4, 1, 'Rome wasn''t built in a day, but it was built!', NULL, NOW() - INTERVAL '3 days'),
(4, 3, 'Haha love the confidence!', NULL, NOW() - INTERVAL '3 days'),

(5, 4, 'Supabase is a game changer!', NULL, NOW() - INTERVAL '1 day'),
(5, 5, 'Welcome to the Supabase family!', NULL, NOW() - INTERVAL '1 day'),

-- Comments on Charlie's posts
(6, 2, 'This is so important! Thank you for saying it', NULL, NOW() - INTERVAL '5 days'),
(6, 6, 'Kindness in code reviews makes better teams', NULL, NOW() - INTERVAL '5 days'),
(6, 8, 'We all start somewhere. Great reminder!', NULL, NOW() - INTERVAL '5 days'),

(7, 1, 'Closures still confuse me sometimes 😅', NULL, NOW() - INTERVAL '3 days'),

(8, 4, 'This is genius 😂', NULL, NOW() - INTERVAL '10 hours'),
(8, 9, 'I need to try this method!', NULL, NOW() - INTERVAL '9 hours'),

-- Comments on Diana's posts
(9, 1, 'Absolutely! Thank you for this 💪', NULL, NOW() - INTERVAL '4 days'),
(9, 6, 'Yes! Love this energy', NULL, NOW() - INTERVAL '4 days'),
(9, 8, 'We belong and we''re thriving! 🔥', NULL, NOW() - INTERVAL '4 days'),

(10, 2, 'I feel so called out 😂', NULL, NOW() - INTERVAL '1 day'),
(10, 3, 'Stack Overflow has entered the chat', NULL, NOW() - INTERVAL '1 day'),
(10, 7, 'flexbox makes it easier now though!', NULL, NOW() - INTERVAL '1 day'),

-- Comments on Ethan's posts
(11, 4, 'Good luck! You got this!', NULL, NOW() - INTERVAL '2 days'),

(12, 2, 'That''s the dream right there', NULL, NOW() - INTERVAL '20 hours'),
(12, 6, 'Clean code is so satisfying', NULL, NOW() - INTERVAL '18 hours'),

-- Comments on other posts
(13, 3, 'What''s your coding playlist? 🎵', NULL, NOW() - INTERVAL '3 days'),
(14, 5, 'CSS is definitely an art form!', NULL, NOW() - INTERVAL '15 hours'),
(17, 7, 'The best of both worlds indeed!', NULL, NOW() - INTERVAL '2 days'),
(18, 1, 'Congrats on the first PR! 🎉', NULL, NOW() - INTERVAL '5 hours'),
(20, 4, 'This is too accurate 😂', NULL, NOW() - INTERVAL '1 day'),
(21, 2, 'Welcome to Cubix! 👋', NULL, NOW() - INTERVAL '23 hours'),
(22, 3, 'What kind of project?', NULL, NOW() - INTERVAL '7 hours');

-- ============================================
-- SEED LIKES
-- ============================================
INSERT INTO likes (user_id, post_id, created_at) VALUES
-- Post 1 likes (Alice's first post) - 15 likes
(2, 1, NOW() - INTERVAL '4 days'),
(3, 1, NOW() - INTERVAL '4 days'),
(4, 1, NOW() - INTERVAL '4 days'),
(5, 1, NOW() - INTERVAL '4 days'),
(6, 1, NOW() - INTERVAL '4 days'),
(7, 1, NOW() - INTERVAL '4 days'),
(8, 1, NOW() - INTERVAL '4 days'),
(9, 1, NOW() - INTERVAL '4 days'),
(10, 1, NOW() - INTERVAL '4 days'),

-- Post 2 likes (Alice's TypeScript post) - 42 likes (we'll add more users liked multiple times conceptually)
(2, 2, NOW() - INTERVAL '2 days'),
(3, 2, NOW() - INTERVAL '2 days'),
(4, 2, NOW() - INTERVAL '2 days'),
(5, 2, NOW() - INTERVAL '2 days'),
(6, 2, NOW() - INTERVAL '2 days'),
(7, 2, NOW() - INTERVAL '2 days'),
(8, 2, NOW() - INTERVAL '2 days'),
(9, 2, NOW() - INTERVAL '2 days'),
(10, 2, NOW() - INTERVAL '2 days'),

-- Post 3 likes (Alice's 2AM post) - 23 likes
(2, 3, NOW() - INTERVAL '23 hours'),
(4, 3, NOW() - INTERVAL '23 hours'),
(5, 3, NOW() - INTERVAL '22 hours'),
(7, 3, NOW() - INTERVAL '22 hours'),
(9, 3, NOW() - INTERVAL '20 hours'),
(10, 3, NOW() - INTERVAL '20 hours'),

-- Post 4 likes (Bob's CRUD post) - 8 likes
(1, 4, NOW() - INTERVAL '3 days'),
(3, 4, NOW() - INTERVAL '3 days'),
(5, 4, NOW() - INTERVAL '3 days'),
(7, 4, NOW() - INTERVAL '3 days'),

-- Post 5 likes (Bob's Supabase post) - 31 likes
(1, 5, NOW() - INTERVAL '1 day'),
(3, 5, NOW() - INTERVAL '1 day'),
(4, 5, NOW() - INTERVAL '1 day'),
(6, 5, NOW() - INTERVAL '1 day'),
(7, 5, NOW() - INTERVAL '1 day'),
(8, 5, NOW() - INTERVAL '1 day'),
(9, 5, NOW() - INTERVAL '1 day'),
(10, 5, NOW() - INTERVAL '1 day'),

-- Post 6 likes (Charlie's code review post) - 56 likes
(1, 6, NOW() - INTERVAL '5 days'),
(2, 6, NOW() - INTERVAL '5 days'),
(4, 6, NOW() - INTERVAL '5 days'),
(5, 6, NOW() - INTERVAL '5 days'),
(6, 6, NOW() - INTERVAL '5 days'),
(7, 6, NOW() - INTERVAL '5 days'),
(8, 6, NOW() - INTERVAL '5 days'),
(9, 6, NOW() - INTERVAL '5 days'),
(10, 6, NOW() - INTERVAL '5 days'),

-- Post 7 likes (Charlie's closures post) - 19 likes
(1, 7, NOW() - INTERVAL '3 days'),
(2, 7, NOW() - INTERVAL '3 days'),
(4, 7, NOW() - INTERVAL '3 days'),
(5, 7, NOW() - INTERVAL '3 days'),
(8, 7, NOW() - INTERVAL '3 days'),
(10, 7, NOW() - INTERVAL '3 days'),

-- Post 8 likes (Charlie's rubber duck post) - 67 likes
(1, 8, NOW() - INTERVAL '11 hours'),
(2, 8, NOW() - INTERVAL '11 hours'),
(4, 8, NOW() - INTERVAL '10 hours'),
(5, 8, NOW() - INTERVAL '10 hours'),
(6, 8, NOW() - INTERVAL '9 hours'),
(7, 8, NOW() - INTERVAL '9 hours'),
(9, 8, NOW() - INTERVAL '9 hours'),
(10, 8, NOW() - INTERVAL '9 hours'),

-- Post 9 likes (Diana's women in tech) - 89 likes
(1, 9, NOW() - INTERVAL '4 days'),
(2, 9, NOW() - INTERVAL '4 days'),
(3, 9, NOW() - INTERVAL '4 days'),
(5, 9, NOW() - INTERVAL '4 days'),
(6, 9, NOW() - INTERVAL '4 days'),
(7, 9, NOW() - INTERVAL '4 days'),
(8, 9, NOW() - INTERVAL '4 days'),
(9, 9, NOW() - INTERVAL '4 days'),
(10, 9, NOW() - INTERVAL '4 days'),

-- Post 10 likes (Diana's center div post) - 103 likes
(1, 10, NOW() - INTERVAL '1 day'),
(2, 10, NOW() - INTERVAL '1 day'),
(3, 10, NOW() - INTERVAL '1 day'),
(5, 10, NOW() - INTERVAL '1 day'),
(6, 10, NOW() - INTERVAL '1 day'),
(7, 10, NOW() - INTERVAL '1 day'),
(8, 10, NOW() - INTERVAL '1 day'),
(9, 10, NOW() - INTERVAL '1 day'),
(10, 10, NOW() - INTERVAL '1 day'),

-- Post 11 likes (Ethan's impossible post) - 12 likes
(1, 11, NOW() - INTERVAL '2 days'),
(2, 11, NOW() - INTERVAL '2 days'),
(3, 11, NOW() - INTERVAL '2 days'),
(4, 11, NOW() - INTERVAL '2 days'),
(6, 11, NOW() - INTERVAL '2 days'),

-- Post 12 likes (Ethan's refactor post) - 45 likes
(2, 12, NOW() - INTERVAL '18 hours'),
(3, 12, NOW() - INTERVAL '18 hours'),
(4, 12, NOW() - INTERVAL '18 hours'),
(6, 12, NOW() - INTERVAL '18 hours'),
(7, 12, NOW() - INTERVAL '18 hours'),
(8, 12, NOW() - INTERVAL '18 hours'),
(9, 12, NOW() - INTERVAL '18 hours'),
(10, 12, NOW() - INTERVAL '18 hours'),

-- Post 13 likes (Fiona's music post) - 28 likes
(1, 13, NOW() - INTERVAL '3 days'),
(3, 13, NOW() - INTERVAL '3 days'),
(4, 13, NOW() - INTERVAL '3 days'),
(5, 13, NOW() - INTERVAL '3 days'),
(7, 13, NOW() - INTERVAL '3 days'),
(8, 13, NOW() - INTERVAL '3 days'),
(9, 13, NOW() - INTERVAL '3 days'),

-- Post 14 likes (Fiona's CSS post) - 34 likes
(1, 14, NOW() - INTERVAL '15 hours'),
(2, 14, NOW() - INTERVAL '15 hours'),
(3, 14, NOW() - INTERVAL '15 hours'),
(4, 14, NOW() - INTERVAL '15 hours'),
(5, 14, NOW() - INTERVAL '15 hours'),
(7, 14, NOW() - INTERVAL '15 hours'),
(8, 14, NOW() - INTERVAL '15 hours'),
(9, 14, NOW() - INTERVAL '15 hours'),

-- Post 15 likes (George's uphill post) - 21 likes
(2, 15, NOW() - INTERVAL '4 days'),
(3, 15, NOW() - INTERVAL '4 days'),
(4, 15, NOW() - INTERVAL '4 days'),
(5, 15, NOW() - INTERVAL '4 days'),
(8, 15, NOW() - INTERVAL '4 days'),
(9, 15, NOW() - INTERVAL '4 days'),

-- Post 16 likes (George's Star Wars post) - 76 likes
(1, 16, NOW() - INTERVAL '1 day'),
(2, 16, NOW() - INTERVAL '1 day'),
(3, 16, NOW() - INTERVAL '1 day'),
(4, 16, NOW() - INTERVAL '1 day'),
(5, 16, NOW() - INTERVAL '1 day'),
(6, 16, NOW() - INTERVAL '1 day'),
(8, 16, NOW() - INTERVAL '1 day'),
(9, 16, NOW() - INTERVAL '1 day'),
(10, 16, NOW() - INTERVAL '1 day'),

-- Post 17 likes (Hannah's both post) - 39 likes
(1, 17, NOW() - INTERVAL '2 days'),
(2, 17, NOW() - INTERVAL '2 days'),
(3, 17, NOW() - INTERVAL '2 days'),
(4, 17, NOW() - INTERVAL '2 days'),
(5, 17, NOW() - INTERVAL '2 days'),
(6, 17, NOW() - INTERVAL '2 days'),
(9, 17, NOW() - INTERVAL '2 days'),
(10, 17, NOW() - INTERVAL '2 days'),

-- Post 18 likes (Hannah's first PR post) - 52 likes
(1, 18, NOW() - INTERVAL '5 hours'),
(2, 18, NOW() - INTERVAL '5 hours'),
(3, 18, NOW() - INTERVAL '5 hours'),
(4, 18, NOW() - INTERVAL '5 hours'),
(5, 18, NOW() - INTERVAL '5 hours'),
(6, 18, NOW() - INTERVAL '5 hours'),
(7, 18, NOW() - INTERVAL '5 hours'),
(9, 18, NOW() - INTERVAL '5 hours'),
(10, 18, NOW() - INTERVAL '5 hours'),

-- Post 19 likes (Ian's dinosaur post) - 94 likes
(1, 19, NOW() - INTERVAL '3 days'),
(2, 19, NOW() - INTERVAL '3 days'),
(3, 19, NOW() - INTERVAL '3 days'),
(4, 19, NOW() - INTERVAL '3 days'),
(5, 19, NOW() - INTERVAL '3 days'),
(6, 19, NOW() - INTERVAL '3 days'),
(7, 19, NOW() - INTERVAL '3 days'),
(8, 19, NOW() - INTERVAL '3 days'),
(10, 19, NOW() - INTERVAL '3 days'),

-- Post 20 likes (Ian's Git post) - 61 likes
(1, 20, NOW() - INTERVAL '1 day'),
(2, 20, NOW() - INTERVAL '1 day'),
(3, 20, NOW() - INTERVAL '1 day'),
(4, 20, NOW() - INTERVAL '1 day'),
(5, 20, NOW() - INTERVAL '1 day'),
(6, 20, NOW() - INTERVAL '1 day'),
(7, 20, NOW() - INTERVAL '1 day'),
(8, 20, NOW() - INTERVAL '1 day'),
(10, 20, NOW() - INTERVAL '1 day'),

-- Post 21 likes (Jane's hello post) - 17 likes
(1, 21, NOW() - INTERVAL '23 hours'),
(2, 21, NOW() - INTERVAL '23 hours'),
(3, 21, NOW() - INTERVAL '23 hours'),
(4, 21, NOW() - INTERVAL '23 hours'),
(5, 21, NOW() - INTERVAL '22 hours'),
(6, 21, NOW() - INTERVAL '22 hours'),
(7, 21, NOW() - INTERVAL '22 hours'),

-- Post 22 likes (Jane's collab post) - 9 likes
(1, 22, NOW() - INTERVAL '7 hours'),
(2, 22, NOW() - INTERVAL '7 hours'),
(3, 22, NOW() - INTERVAL '7 hours'),
(4, 22, NOW() - INTERVAL '7 hours'),
(5, 22, NOW() - INTERVAL '7 hours');

-- ============================================
-- SEED FOLLOWS
-- ============================================
INSERT INTO follows (follower_id, following_id, created_at) VALUES
-- Alice follows
(1, 2, NOW() - INTERVAL '5 months'),
(1, 3, NOW() - INTERVAL '4 months'),
(1, 4, NOW() - INTERVAL '3 months'),
(1, 5, NOW() - INTERVAL '3 months'),

-- Bob follows
(2, 1, NOW() - INTERVAL '4 months'),
(2, 3, NOW() - INTERVAL '3 months'),
(2, 4, NOW() - INTERVAL '2 months'),
(2, 6, NOW() - INTERVAL '1 month'),

-- Charlie follows
(3, 1, NOW() - INTERVAL '4 months'),
(3, 2, NOW() - INTERVAL '3 months'),
(3, 4, NOW() - INTERVAL '2 months'),
(3, 5, NOW() - INTERVAL '2 months'),
(3, 9, NOW() - INTERVAL '1 month'),

-- Diana follows
(4, 1, NOW() - INTERVAL '3 months'),
(4, 2, NOW() - INTERVAL '2 months'),
(4, 3, NOW() - INTERVAL '2 months'),
(4, 6, NOW() - INTERVAL '1 month'),
(4, 8, NOW() - INTERVAL '1 month'),

-- Ethan follows
(5, 1, NOW() - INTERVAL '3 months'),
(5, 3, NOW() - INTERVAL '2 months'),
(5, 4, NOW() - INTERVAL '2 months'),
(5, 7, NOW() - INTERVAL '1 month'),

-- Fiona follows
(6, 2, NOW() - INTERVAL '2 months'),
(6, 4, NOW() - INTERVAL '1 month'),
(6, 8, NOW() - INTERVAL '1 month'),

-- George follows
(7, 1, NOW() - INTERVAL '2 months'),
(7, 3, NOW() - INTERVAL '1 month'),
(7, 5, NOW() - INTERVAL '1 month'),
(7, 9, NOW() - INTERVAL '1 month'),

-- Hannah follows
(8, 1, NOW() - INTERVAL '1 month'),
(8, 4, NOW() - INTERVAL '1 month'),
(8, 6, NOW() - INTERVAL '2 weeks'),
(8, 10, NOW() - INTERVAL '1 week'),

-- Ian follows
(9, 3, NOW() - INTERVAL '1 month'),
(9, 5, NOW() - INTERVAL '3 weeks'),
(9, 7, NOW() - INTERVAL '2 weeks'),

-- Jane follows
(10, 1, NOW() - INTERVAL '2 weeks'),
(10, 2, NOW() - INTERVAL '1 week'),
(10, 8, NOW() - INTERVAL '1 week');

-- ============================================
-- SEED NOTIFICATIONS
-- ============================================
INSERT INTO notifications (user_id, actor_id, type, post_id, comment_id, is_read, created_at) VALUES
-- Alice's notifications
(1, 2, 'like', 1, NULL, true, NOW() - INTERVAL '4 days'),
(1, 2, 'comment', 1, 1, true, NOW() - INTERVAL '4 days'),
(1, 4, 'comment', 1, 2, true, NOW() - INTERVAL '4 days'),
(1, 5, 'comment', 1, 3, false, NOW() - INTERVAL '4 days'),
(1, 3, 'like', 2, NULL, false, NOW() - INTERVAL '2 days'),
(1, 3, 'comment', 2, 4, false, NOW() - INTERVAL '2 days'),
(1, 6, 'comment', 2, 5, false, NOW() - INTERVAL '2 days'),
(1, 9, 'comment', 3, 9, false, NOW() - INTERVAL '23 hours'),
(1, 10, 'comment', 3, 10, false, NOW() - INTERVAL '20 hours'),

-- Bob's notifications
(2, 1, 'like', 4, NULL, true, NOW() - INTERVAL '3 days'),
(2, 1, 'comment', 4, 11, true, NOW() - INTERVAL '3 days'),
(2, 3, 'comment', 4, 12, false, NOW() - INTERVAL '3 days'),
(2, 4, 'comment', 5, 13, false, NOW() - INTERVAL '1 day'),
(2, 10, 'follow', NULL, NULL, false, NOW() - INTERVAL '1 week'),

-- Charlie's notifications
(3, 2, 'comment', 6, 14, true, NOW() - INTERVAL '5 days'),
(3, 6, 'comment', 6, 15, true, NOW() - INTERVAL '5 days'),
(3, 1, 'comment', 7, 17, false, NOW() - INTERVAL '3 days'),
(3, 4, 'comment', 8, 18, false, NOW() - INTERVAL '10 hours'),
(3, 9, 'comment', 8, 19, false, NOW() - INTERVAL '9 hours'),
(3, 1, 'follow', NULL, NULL, false, NOW() - INTERVAL '4 months'),

-- Diana's notifications
(4, 1, 'comment', 9, 20, true, NOW() - INTERVAL '4 days'),
(4, 6, 'comment', 9, 21, true, NOW() - INTERVAL '4 days'),
(4, 8, 'comment', 9, 22, false, NOW() - INTERVAL '4 days'),
(4, 2, 'comment', 10, 23, false, NOW() - INTERVAL '1 day'),
(4, 3, 'comment', 10, 24, false, NOW() - INTERVAL '1 day'),
(4, 7, 'comment', 10, 25, false, NOW() - INTERVAL '1 day'),

-- Ethan's notifications
(5, 4, 'comment', 11, 26, false, NOW() - INTERVAL '2 days'),
(5, 2, 'comment', 12, 27, false, NOW() - INTERVAL '20 hours'),
(5, 6, 'comment', 12, 28, false, NOW() - INTERVAL '18 hours'),

-- Fiona's notifications
(6, 3, 'comment', 13, 29, false, NOW() - INTERVAL '3 days'),
(6, 5, 'comment', 14, 30, false, NOW() - INTERVAL '15 hours'),
(6, 4, 'follow', NULL, NULL, false, NOW() - INTERVAL '1 month'),

-- George's notifications
(7, 5, 'follow', NULL, NULL, false, NOW() - INTERVAL '1 month'),

-- Hannah's notifications
(8, 7, 'comment', 17, 31, false, NOW() - INTERVAL '2 days'),
(8, 1, 'comment', 18, 32, false, NOW() - INTERVAL '5 hours'),

-- Ian's notifications
(9, 4, 'comment', 20, 34, false, NOW() - INTERVAL '1 day'),

-- Jane's notifications
(10, 2, 'comment', 21, 35, false, NOW() - INTERVAL '23 hours'),
(10, 3, 'comment', 22, 36, false, NOW() - INTERVAL '7 hours'),
(10, 8, 'follow', NULL, NULL, false, NOW() - INTERVAL '1 week');

-- ============================================
-- VERIFY DATA
-- ============================================
SELECT
  (SELECT COUNT(*) FROM users) as users_count,
  (SELECT COUNT(*) FROM profiles) as profiles_count,
  (SELECT COUNT(*) FROM posts) as posts_count,
  (SELECT COUNT(*) FROM comments) as comments_count,
  (SELECT COUNT(*) FROM likes) as likes_count,
  (SELECT COUNT(*) FROM follows) as follows_count,
  (SELECT COUNT(*) FROM notifications) as notifications_count;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'Seed data inserted successfully! 🎉' AS status;