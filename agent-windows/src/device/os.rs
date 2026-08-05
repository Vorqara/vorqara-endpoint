use hostname::get;
use sysinfo::System;

pub fn hostname() -> String {
    get()
        .unwrap()
        .to_string_lossy()
        .to_string()
}

pub fn os_name() -> String {
    "WINDOWS".to_string()
}

pub fn os_version() -> Option<String> {
    System::long_os_version()
}

pub fn username() -> Option<String> {
    std::env::var("USERNAME").ok()
}