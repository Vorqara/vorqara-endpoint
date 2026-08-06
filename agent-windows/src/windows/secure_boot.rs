use anyhow::Result;

use super::powershell::execute;

pub fn secure_boot_enabled() -> Result<bool> {
    let output = execute(
        "Confirm-SecureBootUEFI"
    )?;

    Ok(output.trim().eq_ignore_ascii_case("True"))
}