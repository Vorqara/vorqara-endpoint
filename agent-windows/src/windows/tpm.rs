use anyhow::Result;

use super::powershell::execute;

pub fn tpm_enabled() -> Result<bool> {
    let output = execute(
        "(Get-Tpm).TpmPresent"
    )?;

    Ok(output.trim().eq_ignore_ascii_case("True"))
}