use anyhow::Result;

use super::powershell::execute;

pub fn bitlocker_enabled() -> Result<bool> {
    let output = execute(
        "(Get-BitLockerVolume -MountPoint 'C:').ProtectionStatus"
    )?;

    Ok(output.trim() == "1")
}