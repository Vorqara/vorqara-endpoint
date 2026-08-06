use anyhow::Result;
use serde::Serialize;

use crate::device::{
    hardware,
    network,
    os,
};

#[derive(Debug, Serialize)]
pub struct SystemInformation {
    pub hostname: String,
    pub operating_system: String,
    pub os_version: Option<String>,
    pub username: Option<String>,
    pub ip_address: Option<String>,
    pub mac_address: Option<String>,
    pub serial_number: Option<String>,
    pub agent_version: String,
}

pub fn get_system_information() -> Result<SystemInformation> {
    Ok(SystemInformation {
        hostname: os::hostname(),
        operating_system: os::os_name(),
        os_version: os::os_version(),
        username: os::username(),
        ip_address: network::ip_address(),
        mac_address: network::mac_address(),
        serial_number: hardware::serial_number(),
        agent_version: env!("CARGO_PKG_VERSION").to_string(),
    })
}