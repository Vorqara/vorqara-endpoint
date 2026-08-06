use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

const IDENTITY_FILE: &str = "agent_identity.json";

#[derive(Debug, Serialize, Deserialize)]
pub struct AgentIdentity {
    pub endpoint_id: String,
    pub jwt: String,
}

pub fn save_identity(identity: &AgentIdentity) -> Result<()> {
    let json = serde_json::to_string_pretty(identity)?;
    fs::write(IDENTITY_FILE, json)?;
    Ok(())
}

pub fn load_identity() -> Option<AgentIdentity> {
    if !Path::new(IDENTITY_FILE).exists() {
        return None;
    }

    let content = fs::read_to_string(IDENTITY_FILE).ok()?;
    serde_json::from_str(&content).ok()
}