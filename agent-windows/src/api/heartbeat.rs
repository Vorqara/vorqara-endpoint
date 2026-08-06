use anyhow::Result;

use crate::api::client::ApiClient;
use serde_json::json;

pub async fn send_heartbeat(
    api: &ApiClient,
    jwt: &str,
    endpoint_id: &str,
) -> Result<()> {
    api.post_authorized::<_, serde_json::Value>(
        &format!("/endpoints/{}/heartbeat", endpoint_id),
        jwt,
        &json!({
            "status": "ONLINE"
        }),
    )
    .await?;

    Ok(())
}