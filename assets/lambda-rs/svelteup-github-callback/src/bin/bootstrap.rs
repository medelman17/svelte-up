use lambda_http::{
    handler,
    lambda_runtime::{self, Error},
};
use log::LevelFilter;
use simple_logger::SimpleLogger;

use ::lib::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new()
        .with_level(LevelFilter::Info)
        .init()
        .unwrap();
    lambda_runtime::run(handler(handle_github_callback)).await?;
    Ok(())
}
