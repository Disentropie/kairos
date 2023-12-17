use std::net::SocketAddr;
use std::sync::Arc;

use anyhow::Result;
use axum::Extension;
use axum::{routing::get, Router};
use config::AppConfig;
use domains::users::model::User;
use domains::users::service::{DefaultUsersService, UserRepository};
use graphql::generate_schema;
use routers::{graphiql, graphql_handler, health_handler};
use sqlx::{Pool, Postgres};
mod config;
mod db;
mod domains;
mod graphql;
mod routers;
mod server;
mod utils;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = config::get_config();
    let context = init(config).await?;
    run(context).await;
    Ok(())
}

pub struct Context {
    pub db: Pool<Postgres>,
    pub config: &'static AppConfig,
}

pub async fn init(config: &'static crate::config::AppConfig) -> Result<Context> {
    let db = db::init(&config).await?;

    Ok(Context {
        db: db,
        config: config,
    })
}

pub async fn run(ctx: Context) {
    let schema = generate_schema();
    let router = Router::new()
        .route("/health", get(health_handler))
        .route("/api", get(graphiql).post(graphql_handler))
        .layer(Extension(schema));

    let addr:SocketAddr = ctx.config.server_bind_address.parse().unwrap();
    println!("server listening at adress {}",addr);
    axum::Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}
