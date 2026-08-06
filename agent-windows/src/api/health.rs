use anyhow::Result;

use crate::{
    api::client::ApiClient,
    device::health::SystemHealth,
};

pub async fn submit_health(
    api: &ApiClient,
    endpoint_id: &str,
    jwt: &str,
    health: &SystemHealth,
) -> Result<()> {
    api.post_authorized_no_response(
        &format!("/endpoint-health/{}", endpoint_id),
        jwt,
        health,
    )
    .await
}