use anyhow::Result;
use serde::Serialize;

use super::client::ApiClient;

#[derive(Serialize)]
pub struct CommandResultRequest {
    pub status: String,
    pub output: serde_json::Value,
}

pub async fn submit_command_result(
    api: &ApiClient,
    jwt: &str,
    command_id: &str,
    status: &str,
    output: serde_json::Value,
) -> Result<()> {
    api.post_authorized::<CommandResultRequest, serde_json::Value>(
        &format!(
            "/endpoint-commands/{}/result",
            command_id,
        ),
        jwt,
        &CommandResultRequest {
            status: status.to_string(),
            output,
        },
    )
    .await?;

    Ok(())
}