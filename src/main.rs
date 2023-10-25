use sqlx::postgres::PgPool;

mod config;
mod server;
mod graphql;
mod entities;
mod db;

#[tokio::main]
async fn main()->anyhow::Result<()>  {
    let config = config::init();
    let pool = PgPool::connect(&config.database_url).await?;
    server::start(config).await;
    Ok(())
}
