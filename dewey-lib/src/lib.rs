use std::collections::HashMap;
use std::sync::{LazyLock, Mutex};

static COMMANDS: LazyLock<Mutex<HashMap<String, String>>> = LazyLock::new(|| Mutex::new(HashMap::new()));

pub fn register_command(name: String) {
    let mut commands = COMMANDS.lock().unwrap();
    commands.insert(name.clone(), name);
}

pub fn get_command_names() -> Vec<String> {
    let commands = COMMANDS.lock().unwrap();
    commands.values().cloned().collect()
}

pub trait CommandHandler: Send + Sync {
    fn name(&self) -> &str;
}

#[derive(Clone)]
pub struct CommandRegistration {
    pub name: String,
}

inventory::collect!(CommandRegistration);

pub struct CommandRegistry {
    commands: HashMap<String, Box<dyn CommandHandler>>,
}

impl CommandRegistry {
    pub fn new() -> Self {
        let mut registry = CommandRegistry {
            commands: HashMap::new(),
        };
        
        for registration in inventory::iter::<CommandRegistration> {
            registry.commands.insert(registration.name.clone(), Box::new(registration.clone()));
        }
        
        registry
    }
    
    pub fn get_handler(&self, name: &str) -> Option<&dyn CommandHandler> {
        self.commands.get(name).map(|h| h.as_ref())
    }
}

impl CommandHandler for CommandRegistration {
    fn name(&self) -> &str {
        &self.name
    }
} 