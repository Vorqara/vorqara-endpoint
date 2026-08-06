use anyhow::Result;

use tokio::time::{sleep, Duration};

use crate::api::{
    auth::authenticate_agent,
    client::ApiClient,
    register::register_endpoint,
};

use crate::device::{
    hardware::collect_device_info,
    health::collect_health,
};

use crate::api::health::submit_health;

use crate::services::{
    heartbeat_service::start_heartbeat_loop,
    command_processor::process_pending_commands,
};

use crate::storage::identity::{
    load_identity,
    save_identity,
    AgentIdentity,
};

pub struct AgentEngine;

impl AgentEngine {
    pub async fn run() -> Result<()> {
        println!("====================================");
        println!("Vorqara Endpoint Agent");
        println!("====================================");

        let api = ApiClient::new("http://localhost:3000");

        let (endpoint_id, jwt) =
            if let Some(identity) = load_identity() {
                (
                    identity.endpoint_id,
                    identity.jwt,
                )
            } else {
                let registration_key =
                    std::env::var("AGENT_REGISTRATION_KEY")
                        .expect("AGENT_REGISTRATION_KEY missing");

                println!("Authenticating...");

                let login =
                    authenticate_agent(
                        &api,
                        &registration_key,
                    )
                    .await?;

                println!("Authentication successful.");

                let endpoint =
                    collect_device_info();

                let endpoint_id =
                    register_endpoint(
                        &api,
                        &login.access_token,
                        &endpoint,
                    )
                    .await?;

                save_identity(
                    &AgentIdentity {
                        endpoint_id: endpoint_id.clone(),
                        jwt: login.access_token.clone(),
                    },
                )?;

                (
                    endpoint_id,
                    login.access_token,
                )
            };

        println!("Agent initialized.");

        loop {
            println!("Heartbeat...");

            start_heartbeat_loop(
                &api,
                &endpoint_id,
                &jwt,
            )
            .await?;

            println!("Collecting health...");

            let health =
                collect_health()?;

            submit_health(
                &api,
                &endpoint_id,
                &jwt,
                &health,
            )
            .await?;

            println!("Checking commands...");

            process_pending_commands(
                &api,
                &endpoint_id,
                &jwt,
            )
            .await?;

            sleep(Duration::from_secs(30)).await;
        }
    }
}