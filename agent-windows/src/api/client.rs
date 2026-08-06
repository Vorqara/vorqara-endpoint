use anyhow::Result;
use reqwest::Client;
use serde::{de::DeserializeOwned, Serialize};

pub struct ApiClient {
    client: Client,
    base_url: String,
}

impl ApiClient {
    pub fn new(base_url: &str) -> Self {
        Self {
            client: Client::new(),
            base_url: base_url.to_string(),
        }
    }

    pub async fn post<T, R>(
        &self,
        endpoint: &str,
        body: &T,
    ) -> Result<R>
    where
        T: Serialize,
        R: DeserializeOwned,
    {
        let response = self
            .client
            .post(format!("{}{}", self.base_url, endpoint))
            .json(body)
            .send()
            .await?
            .error_for_status()?;

        Ok(response.json::<R>().await?)
    }

    pub async fn post_authorized<T, R>(
        &self,
        endpoint: &str,
        token: &str,
        body: &T,
    ) -> Result<R>
    where
        T: Serialize,
        R: DeserializeOwned,
    {
        let response = self
            .client
            .post(format!("{}{}", self.base_url, endpoint))
            .bearer_auth(token)
            .json(body)
            .send()
            .await?
            .error_for_status()?;

        Ok(response.json::<R>().await?)
    }

    pub async fn post_authorized_no_response<T>(
        &self,
        endpoint: &str,
        token: &str,
        body: &T,
    ) -> Result<()>
    where
        T: Serialize,
    {
        self.client
            .post(format!("{}{}", self.base_url, endpoint))
            .bearer_auth(token)
            .json(body)
            .send()
            .await?
            .error_for_status()?;

        Ok(())
    }
}