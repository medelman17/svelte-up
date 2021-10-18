use rocket::{self, get};

#[get("/")]
pub fn hello() -> String {
    return format!("Hello, world!");
}

#[get("/hello/<name>")]
pub fn handleHelloName(name: &str) -> String {
    format!("Hello, {}!", name)
}
