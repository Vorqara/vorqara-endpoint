mod api;
mod config;
mod device;
mod logger;
mod models;
mod services;
mod storage;
mod windows;

use api::register::collect_endpoint;

fn main() {
    let endpoint = collect_endpoint();

    println!("{:#?}", endpoint);
}