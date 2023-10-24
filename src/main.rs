mod config;
mod server;
mod graphql;
mod models;

#[tokio::main]
async fn main()->Result<(),()> {
    let config = config::init();
    server::start(config).await;
    Ok(())
}
