pub mod projects;
pub mod database;
pub mod onboarding;

// Re-export all commands so Tauri can find them
pub use projects::*;
pub use database::*;
pub use onboarding::*;

// Use our macro to automatically collect all commands
pub use dewey_macros::collect_commands;