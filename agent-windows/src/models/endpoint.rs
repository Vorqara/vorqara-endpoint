use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct EndpointRegistration {
    pub hostname: String,
    pub device_name: Option<String>,
    pub operating_system: String,
    pub os_version: Option<String>,
    pub agent_version: Option<String>,
    pub serial_number: Option<String>,
    pub ip_address: Option<String>,
    pub mac_address: Option<String>,
    pub username: Option<String>,
    pub status: String,
}