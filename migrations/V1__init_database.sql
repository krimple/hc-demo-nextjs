-- Flyway Migration: V1__init_database
-- Initialize the database

CREATE SCHEMA IF NOT EXISTS public;

-- Optional: Create an example "meta" table to track custom versioning or settings:
CREATE TABLE IF NOT EXISTS app_meta (
                                        id SERIAL PRIMARY KEY,
                                        key VARCHAR(50) NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT NOW()
    );

INSERT INTO app_meta (key, value) VALUES ('version', '1.0');