use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AgentLoginRequest {
    pub registration_key: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AgentLoginResponse {
    pub access_token: String,
}