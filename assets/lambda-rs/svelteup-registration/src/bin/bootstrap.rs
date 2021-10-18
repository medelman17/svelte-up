use lambda_runtime::{handler_fn, Error};
use log::LevelFilter;
use simple_logger::SimpleLogger;

use ::lib::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    SimpleLogger::new()
        .with_level(LevelFilter::Info)
        .init()
        .unwrap();
    let func = handler_fn(handler);
    lambda_runtime::run(func).await?;
    Ok(())
}
