use anyhow::Result;
use serde_json::{json, Value};

use crate::api::commands::EndpointCommand;

use super::process_list::list_processes;
use super::system_info::get_system_information;

pub async fn execute_command(
    command: &EndpointCommand,
) -> Result<Value> {
    match command.command.as_str() {
        // -------------------------------
        // System Information
        // -------------------------------
        "GET_SYSTEM_INFO" => {
            let result = get_system_information()?;
            Ok(json!(result))
        }

        // -------------------------------
        // Running Processes
        // -------------------------------
        "process.list" => {
            let processes = list_processes();
            Ok(json!(processes))
        }

        // -------------------------------
        // Unknown Command
        // -------------------------------
        _ => Ok(json!({
            "success": false,
            "message": format!(
                "Unknown command: {}",
                command.command
            )
        })),
    }
}