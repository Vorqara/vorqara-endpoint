use serde::{Deserialize, Serialize};
use sysinfo::{ProcessesToUpdate, System};

#[derive(Debug, Serialize, Deserialize)]
pub struct ProcessInfo {
    pub pid: u32,
    pub name: String,
    pub memory: u64,
    pub cpu: f32,
}

pub fn list_processes() -> Vec<ProcessInfo> {
    let mut system = System::new_all();

    system.refresh_processes(ProcessesToUpdate::All, true);

    system
        .processes()
        .iter()
        .map(|(pid, process)| ProcessInfo {
            pid: pid.as_u32(),
            name: process.name().to_string_lossy().to_string(),
            memory: process.memory(),
            cpu: process.cpu_usage(),
        })
        .collect()
}