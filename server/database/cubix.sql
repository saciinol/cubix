-- ============================================
-- CUBIX DATABASE SCHEMA
-- Step-by-step database design for social media app
-- ============================================

-- Create the database
CREATE DATABASE cubix;

-- Connect to the database
\c cubix;

-- ============================================
-- STEP 1: USERS TABLE (Foundation)
-- This is the core table - everything relates back to users
-- ============================================

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Why these fields?
-- user_id: Auto-incrementing primary key (SERIAL = auto-increment integer)
-- username: Unique identifier users choose, max 30 chars
-- email: For login and notifications, must be unique
-- password: Hashed password (will use bcrypt)
-- timestamps: Track when account was created and last updated

-- ============================================
-- STEP 2: PROFILES TABLE (Extended User Info)
-- Separate from users table to keep auth data separate from profile data
-- This is a One-to-One relationship with users
-- ============================================

CREATE TABLE profiles (
  profile_id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  display_name VARCHAR(100),
  bio TEXT,
  avatar_url VARCHAR(500),
  cover_url VARCHAR(500),
  location VARCHAR(100),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Why separate profiles from users?
-- 1. Security: Keep sensitive auth data (password) separate
-- 2. Performance: Auth queries don't need to load profile data
-- 3. Flexibility: Easy to add more profile fields later
-- 4. UNIQUE constraint on user_id ensures one profile per user

-- ON DELETE CASCADE: When a user is deleted, their profile is auto-deleted

-- ============================================
-- STEP 3: POSTS TABLE
-- Core content of the social media platform
-- One-to-Many: One user can have many posts
-- ============================================

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
  CONSTRAINT content_length CHECK (char_length(content) > 0 AND char_length(content) <= 500)
);

-- Why these fields?
-- post_id: Unique identifier for each post
-- user_id: Foreign key - who created this post
-- content: The actual post text (max 500 chars like Twitter)
-- image_url: Optional image URL
-- likes_count: Denormalized count for performance (faster than counting rows)
-- comments_count: Same reason - avoid expensive COUNT queries
-- CHECK constraint: Ensures content is between 1-500 characters

-- ============================================
-- STEP 4: COMMENTS TABLE
-- Nested comments on posts
-- One-to-Many: One post can have many comments
-- One-to-Many: One user can make many comments
-- ============================================

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
  CONSTRAINT comment_length CHECK (char_length(content) > 0 AND char_length(content) <= 300)
);

-- Why these fields?
-- comment_id: Unique identifier
-- post_id: Which post is this comment on?
-- user_id: Who wrote this comment?
-- content: Comment text (max 300 chars)

-- ON DELETE CASCADE on post_id: When post is deleted, all comments deleted too
-- ON DELETE CASCADE on user_id: When user is deleted, their comments deleted too

-- Note: This is a simple one-level comment system
-- For nested replies (comments on comments), we'd add parent_comment_id field

-- ============================================
-- STEP 5: LIKES TABLE (Many-to-Many Relationship)
-- Junction table connecting users and posts
-- One user can like many posts
-- One post can be liked by many users
-- ============================================

CREATE TABLE likes (
  like_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  post_id INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Ensure one user can only like a post once
  UNIQUE(user_id, post_id)
);

-- Why this design?
-- like_id: Primary key (optional, could use composite key instead)
-- user_id + post_id: The relationship
-- UNIQUE(user_id, post_id): Prevents duplicate likes (user can't like same post twice)
-- No updated_at: Likes don't get updated, only created/deleted

-- Alternative design without like_id:
-- PRIMARY KEY (user_id, post_id)
-- This is called a composite primary key

-- ============================================
-- STEP 6: FOLLOWS TABLE (Many-to-Many Self-Referencing)
-- Users following other users
-- This is the most complex relationship!
-- ============================================

CREATE TABLE follows (
  follow_id SERIAL PRIMARY KEY,
  follower_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  following_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Understanding this table:
-- follower_id: The user who is following (the follower)
-- following_id: The user being followed (the followee)
-- 
-- Example: If user 1 follows user 2:
--   follower_id = 1, following_id = 2
--
-- UNIQUE(follower_id, following_id): Can't follow someone twice
-- CHECK: Users can't follow themselves
-- 
-- This is a SELF-REFERENCING many-to-many relationship
-- Both columns reference the same table (users)

-- ============================================
-- STEP 7: INDEXES (Performance Optimization)
-- Speed up common queries
-- ============================================

-- Index for finding all posts by a user (user profile page)
CREATE INDEX idx_posts_user_id ON posts(user_id);

-- Index for finding all comments on a post (post detail page)
CREATE INDEX idx_comments_post_id ON comments(post_id);

-- Index for finding all comments by a user
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- Index for finding all likes on a post
CREATE INDEX idx_likes_post_id ON likes(post_id);

-- Index for finding all posts liked by a user
CREATE INDEX idx_likes_user_id ON likes(user_id);

-- Index for finding who a user is following
CREATE INDEX idx_follows_follower_id ON follows(follower_id);

-- Index for finding a user's followers
CREATE INDEX idx_follows_following_id ON follows(following_id);

-- Index for sorting posts by date (feed page)
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Why indexes?
-- Without indexes, database does a full table scan (slow for large tables)
-- With indexes, database can quickly find specific rows
-- Trade-off: Indexes speed up reads but slow down writes slightly
-- Only index columns used frequently in WHERE, JOIN, ORDER BY clauses

-- ============================================
-- STEP 8: USEFUL QUERIES (How to use this schema)
-- ============================================

-- Get a user's posts with their profile info
-- SELECT p.*, u.username, pr.display_name, pr.avatar_url
-- FROM posts p
-- JOIN users u ON p.user_id = u.user_id
-- JOIN profiles pr ON u.user_id = pr.user_id
-- WHERE u.user_id = 1
-- ORDER BY p.created_at DESC;

-- Get all comments on a post with user info
-- SELECT c.*, u.username, pr.avatar_url
-- FROM comments c
-- JOIN users u ON c.user_id = u.user_id
-- JOIN profiles pr ON u.user_id = pr.user_id
-- WHERE c.post_id = 1
-- ORDER BY c.created_at ASC;

-- Check if user has liked a post
-- SELECT EXISTS(
--   SELECT 1 FROM likes 
--   WHERE user_id = 1 AND post_id = 1
-- );

-- Get user's followers count
-- SELECT COUNT(*) FROM follows WHERE following_id = 1;

-- Get user's following count
-- SELECT COUNT(*) FROM follows WHERE follower_id = 1;

-- Get feed (posts from users you follow)
-- SELECT p.*, u.username, pr.avatar_url
-- FROM posts p
-- JOIN users u ON p.user_id = u.user_id
-- JOIN profiles pr ON u.user_id = pr.user_id
-- WHERE p.user_id IN (
--   SELECT following_id FROM follows WHERE follower_id = 1
-- )
-- ORDER BY p.created_at DESC
-- LIMIT 20;

-- ============================================
-- OPTIONAL ADDITIONS (For Future Enhancement)
-- ============================================

-- 1. NOTIFICATIONS TABLE
-- CREATE TABLE notifications (
--   notification_id SERIAL PRIMARY KEY,
--   user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
--   type VARCHAR(50) NOT NULL, -- 'like', 'comment', 'follow'
--   actor_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
--   post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
--   is_read BOOLEAN DEFAULT false,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- 2. HASHTAGS (Many-to-Many with Posts)
-- CREATE TABLE hashtags (
--   hashtag_id SERIAL PRIMARY KEY,
--   tag VARCHAR(50) UNIQUE NOT NULL
-- );
-- 
-- CREATE TABLE post_hashtags (
--   post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
--   hashtag_id INTEGER REFERENCES hashtags(hashtag_id) ON DELETE CASCADE,
--   PRIMARY KEY (post_id, hashtag_id)
-- );

-- 3. BOOKMARKS/SAVED POSTS
-- CREATE TABLE bookmarks (
--   user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
--   post_id INTEGER REFERENCES posts(post_id) ON DELETE CASCADE,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (user_id, post_id)
-- );

-- ============================================
-- DATABASE SCHEMA COMPLETE!
-- ============================================

-- Summary of relationships:
-- 1. users ↔ profiles (One-to-One)
-- 2. users → posts (One-to-Many)
-- 3. users → comments (One-to-Many)
-- 4. posts → comments (One-to-Many)
-- 5. users ↔ posts via likes (Many-to-Many)
-- 6. users ↔ users via follows (Many-to-Many Self-Referencing)