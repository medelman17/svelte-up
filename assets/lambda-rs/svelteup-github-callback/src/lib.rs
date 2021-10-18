use lambda_http::{
    lambda_runtime::{self, Context, Error},
    IntoResponse, Request, RequestExt,
};

pub async fn handle_github_callback(
    request: Request,
    _: Context,
) -> Result<impl IntoResponse, Error> {
    log::info!("Request: {:?}", request);
    Ok(format!(
        "hello {}",
        request
            .query_string_parameters()
            .get("name")
            .unwrap_or_else(|| "stranger")
    ))
}
