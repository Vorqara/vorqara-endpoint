use anyhow::Result;

use super::powershell::execute;

pub fn firewall_enabled() -> Result<bool> {
    let output = execute(
        "(Get-NetFirewallProfile | Select-Object -ExpandProperty Enabled)"
    )?;

    let enabled = output
        .lines()
        .all(|line| line.trim().eq_ignore_ascii_case("True"));

    Ok(enabled)
}