use anyhow::Result;

use crate::api::{
    client::ApiClient,
    command_results::submit_command_result,
    commands::get_pending_commands,
};

use crate::commands::executor::execute_command;

pub async fn process_pending_commands(
    api: &ApiClient,
    endpoint_id: &str,
    jwt: &str,
) -> Result<()> {
    let commands = get_pending_commands(
        api,
        endpoint_id,
        jwt,
    )
    .await?;

    if commands.is_empty() {
        return Ok(());
    }

    println!(
        "Received {} pending command(s).",
        commands.len()
    );

    for command in commands {
        println!(
            "Executing command: {}",
            command.command
        );

        let result = execute_command(&command).await;

        match result {
            Ok(output) => {
                submit_command_result(
                    api,
                    jwt,
                    &command.id,
                    "COMPLETED",
                    output,
                )
                .await?;
            }

            Err(error) => {
                submit_command_result(
                    api,
                    jwt,
                    &command.id,
                    "FAILED",
                    serde_json::json!({
                        "error": error.to_string(),
                    }),
                )
                .await?;
            }
        }
    }

    Ok(())
}