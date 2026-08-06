use anyhow::Result;

use super::agent_engine::AgentEngine;

pub async fn start_agent() -> Result<()> {
    AgentEngine::run().await
}