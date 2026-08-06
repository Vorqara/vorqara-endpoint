use anyhow::Result;
use serde::{Deserialize, Serialize};

use super::client::ApiClient;

#[derive(Serialize)]
struct LoginRequest {
    registrationKey: String,
}

#[derive(Debug, Deserialize)]
pub struct LoginResponse {
    pub access_token: String,
}

pub async fn authenticate_agent(
    api: &ApiClient,
    registration_key: &str,
) -> Result<LoginResponse> {
    let request = LoginRequest {
        registrationKey: registration_key.to_string(),
    };

    let response = api
        .post::<LoginRequest, LoginResponse>(
            "/agent-auth/login",
            &request,
        )
        .await?;

    Ok(response)
}