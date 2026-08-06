use anyhow::Result;

use crate::api::auth::authenticate_agent;
use crate::api::client::ApiClient;
use crate::api::register::register_endpoint;

use crate::device::hardware::collect_device_info;

use crate::storage::identity::{
    load_identity,
    save_identity,
    AgentIdentity,
};

pub async fn bootstrap(api: &ApiClient) -> Result<AgentIdentity> {
    // Already registered?
    if let Some(identity) = load_identity() {
        println!("Existing identity loaded.");

        return Ok(identity);
    }

    println!("Authenticating...");

    let registration_key =
        std::env::var("AGENT_REGISTRATION_KEY")
            .expect("Missing AGENT_REGISTRATION_KEY");

    let login =
        authenticate_agent(
            api,
            &registration_key,
        )
        .await?;

    println!("Authentication successful.");

    println!("Collecting device inventory...");

    let endpoint =
        collect_device_info();

    println!("Registering endpoint...");

    let endpoint_id =
        register_endpoint(
            api,
            &login.access_token,
            &endpoint,
        )
        .await?;

    let identity = AgentIdentity {
        endpoint_id,
        jwt: login.access_token,
    };

    save_identity(&identity)?;

    println!("Agent registration complete.");

    Ok(identity)
}