use anyhow::Result;
use serde::{Deserialize, Serialize};

use sysinfo::{
    Disks,
    System,
};

use crate::windows::{
    bitlocker::bitlocker_enabled,
    defender::defender_enabled,
    firewall::firewall_enabled,
    secure_boot::secure_boot_enabled,
    tpm::tpm_enabled,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemHealth {
    pub cpu_usage: f64,

    pub memory_usage: f64,

    pub disk_usage: f64,

    pub uptime_seconds: u64,

    pub defender_enabled: bool,

    pub firewall_enabled: bool,

    pub bitlocker_enabled: bool,

    pub secure_boot_enabled: bool,

    pub tpm_enabled: bool,

    pub agent_running: bool,

    pub network_connected: bool,

    pub pending_restart: bool,
}

pub fn collect_health() -> Result<SystemHealth> {
    let mut system = System::new_all();

    system.refresh_all();

    let cpu_usage = system.global_cpu_usage() as f64;

    let total_memory = system.total_memory() as f64;

    let used_memory = system.used_memory() as f64;

    let memory_usage = if total_memory > 0.0 {
        (used_memory / total_memory) * 100.0
    } else {
        0.0
    };

    let disks = Disks::new_with_refreshed_list();

    let mut total_space: u64 = 0;
    let mut available_space: u64 = 0;

    for disk in disks.list() {
        total_space += disk.total_space();
        available_space += disk.available_space();
    }

    let used_space =
        total_space.saturating_sub(available_space);

    let disk_usage = if total_space > 0 {
        (used_space as f64 / total_space as f64) * 100.0
    } else {
        0.0
    };

    let uptime_seconds = System::uptime();

    Ok(SystemHealth {
        cpu_usage,

        memory_usage,

        disk_usage,

        uptime_seconds,

        defender_enabled: defender_enabled().unwrap_or(false),

        firewall_enabled: firewall_enabled().unwrap_or(false),

        bitlocker_enabled: bitlocker_enabled().unwrap_or(false),

        secure_boot_enabled: secure_boot_enabled().unwrap_or(false),

        tpm_enabled: tpm_enabled().unwrap_or(false),

        agent_running: true,

        network_connected: true,

        pending_restart: false,
    })
}