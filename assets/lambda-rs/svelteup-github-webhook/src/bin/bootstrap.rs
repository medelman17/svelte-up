use lambda_http::{
    handler,
    lambda_runtime::{self, Error},
};

use ::lib::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    // initialize dependencies once here for the lifetime of your
    // lambda task
    lambda_runtime::run(handler(handle_github_callback)).await?;
    Ok(())
}
