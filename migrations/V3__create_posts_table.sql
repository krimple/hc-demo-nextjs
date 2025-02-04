-- Flyway Migration: V3__create_posts_table
-- Create the posts table

CREATE TABLE IF NOT EXISTS posts (
                                     id SERIAL PRIMARY KEY,
                                     user_id INT NOT NULL,
                                     title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );