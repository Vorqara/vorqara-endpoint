use anyhow::Result;
use tokio::time::{sleep, Duration};

use crate::api::client::ApiClient;
use crate::api::heartbeat::send_heartbeat;

pub async fn start_heartbeat_loop(
    api: &ApiClient,
    endpoint_id: &str,
    jwt: &str,
) -> Result<()> {
    loop {
        println!("Sending heartbeat...");

        match send_heartbeat(api, endpoint_id, jwt).await {
            Ok(_) => {
                println!("Heartbeat OK");
            }

            Err(err) => {
                println!("Heartbeat failed: {}", err);
            }
        }

        sleep(Duration::from_secs(30)).await;
    }
}