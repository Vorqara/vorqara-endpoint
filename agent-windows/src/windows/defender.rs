use anyhow::Result;

use super::powershell::execute;

pub fn defender_enabled() -> Result<bool> {
    let output = execute(
        "(Get-MpComputerStatus).RealTimeProtectionEnabled",
    )?;

    Ok(output.trim().eq_ignore_ascii_case("True"))
}