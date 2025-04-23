-- Migration: Onboarding
CREATE TABLE IF NOT EXISTS onboarding (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    has_completed BOOLEAN NOT NULL DEFAULT FALSE,
    version INTEGER NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
