//! Error handling for the application.
//! 
//! This module provides a unified error handling system that categorizes errors by type
//! and severity, and includes detailed error information for debugging and user feedback.

pub mod categories;
mod types;
mod messages;
mod impls;

pub use categories::*;
pub use types::*;
pub use messages::*;
pub use impls::*; 