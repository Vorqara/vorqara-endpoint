use local_ip_address::local_ip;
use mac_address::get_mac_address;

pub fn ip_address() -> Option<String> {
    local_ip().ok().map(|ip| ip.to_string())
}

pub fn mac_address() -> Option<String> {
    get_mac_address()
        .ok()
        .flatten()
        .map(|mac| mac.to_string())
}