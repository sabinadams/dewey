/// Storage service for data persistence and access
pub mod storage;
pub mod encryption;
pub mod key_management;

// Re-export storage types for convenience
pub use storage::LocalStorage; 