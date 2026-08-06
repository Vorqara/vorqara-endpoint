use anyhow::{anyhow, Result};

use std::process::Command;

pub fn execute(script: &str) -> Result<String> {
    let output = Command::new("powershell")
        .args([
            "-NoProfile",
            "-NonInteractive",
            "-ExecutionPolicy",
            "Bypass",
            "-Command",
            script,
        ])
        .output()?;

    if !output.status.success() {
        let error =
            String::from_utf8_lossy(&output.stderr)
                .to_string();

        return Err(anyhow!(error));
    }

    Ok(
        String::from_utf8_lossy(&output.stdout)
            .trim()
            .to_string(),
    )
}