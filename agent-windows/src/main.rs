mod api;
mod commands;
mod config;
mod device;
mod logger;
mod models;
mod services;
mod storage;
mod windows;

use anyhow::Result;

use services::runtime::start_agent;

#[tokio::main]
async fn main() -> Result<()> {
    dotenvy::dotenv().ok();

    env_logger::init();

    start_agent().await?;

    Ok(())
}