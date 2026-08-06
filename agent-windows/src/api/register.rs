use anyhow::Result;
use serde_json::Value;

use crate::api::client::ApiClient;
use crate::models::endpoint::EndpointRegistration;

pub async fn register_endpoint(
    api: &ApiClient,
    token: &str,
    endpoint: &EndpointRegistration,
) -> Result<String> {
    let response = api
        .post_authorized::<_, Value>(
            "/endpoints",
            token,
            endpoint,
        )
        .await?;

    let endpoint_id = response["id"]
        .as_str()
        .unwrap_or_default()
        .to_string();

    Ok(endpoint_id)
}