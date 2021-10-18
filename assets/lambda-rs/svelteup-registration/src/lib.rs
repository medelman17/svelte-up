use lambda_runtime::{Context, Error};
use serde_json::{json, Value};

pub async fn handler(event: Value, _: Context) -> Result<Value, Error> {
    let message = event["message"].as_str().unwrap_or("world");
    let first_name = event["firstName"].as_str().unwrap_or("Anonymous");

    let response = format!("Hello, {}! Your name is {}", message, first_name);
    log::info!("{}", response);
    Ok(json!({ "response": response }))
}
