use anyhow::Result;
use serde::{Deserialize, Serialize};

use super::client::ApiClient;

#[derive(Debug, Serialize, Deserialize)]
pub struct EndpointCommand {
    pub id: String,
    pub command: String,
    pub payload: Option<serde_json::Value>,
}

pub async fn get_pending_commands(
    api: &ApiClient,
    endpoint_id: &str,
    jwt: &str,
) -> Result<Vec<EndpointCommand>> {
    let response = api
        .post_authorized::<(), Vec<EndpointCommand>>(
            &format!(
                "/endpoint-commands/{}/pending",
                endpoint_id,
            ),
            jwt,
            &(),
        )
        .await?;

    Ok(response)
}