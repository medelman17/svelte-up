use rocket::{self, get};

pub mod router;

#[get("/")]
pub fn handleRoot() -> String {
    return format!("Hello, world!");
}
