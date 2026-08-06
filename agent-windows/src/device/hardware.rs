use crate::device::{network, os};
use crate::models::endpoint::EndpointRegistration;

use uuid::Uuid;

pub fn serial_number() -> Option<String> {
    Some(Uuid::new_v4().to_string())
}

pub fn collect_device_info() -> EndpointRegistration {
    EndpointRegistration {
        hostname: os::hostname(),
        device_name: Some(os::hostname()),
        operating_system: os::os_name(),
        os_version: os::os_version(),
        agent_version: Some(env!("CARGO_PKG_VERSION").to_string()),
        serial_number: serial_number(),
        ip_address: network::ip_address(),
        mac_address: network::mac_address(),
        username: os::username(),
        status: "ONLINE".to_string(),
    }
}