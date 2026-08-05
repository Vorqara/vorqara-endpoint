use uuid::Uuid;

pub fn serial_number() -> Option<String> {
    Some(Uuid::new_v4().to_string())
}