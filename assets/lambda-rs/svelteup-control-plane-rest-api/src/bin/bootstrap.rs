use lambda_web::{is_running_on_lambda, launch_rocket_on_lambda, LambdaError};
use rocket::{self, get, routes};

use ::lib::*;

#[rocket::main]
async fn main() -> Result<(), LambdaError> {
    let rocket = rocket::build()
        .mount("/", routes![handleRoot, router::handleHelloName])
        .mount("/world", routes![router::hello]);

    if is_running_on_lambda() {
        launch_rocket_on_lambda(rocket).await?
    } else {
        rocket.launch().await?;
    }
    Ok(())
}
