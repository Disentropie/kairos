use std::sync::Arc;

use config::AppConfig;
use domains::users::{service::{UserRepository, DefaultUsersService}};
use domains::users::model::User;
use sqlx::{Pool, Postgres};
use anyhow::{Result};
mod db;
mod graphql;
mod server;
mod config;
mod utils;
mod domains;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let config = config::get_config();
    let context = init(config).await?;
    //server::start().await;
    Ok(())
}


pub struct Context {
    pub db: Pool<Postgres>,
    pub config: &'static AppConfig,
    pub userRepository:Arc<dyn UserRepository<Item = User> + 'static>
}

pub async fn init(config:&'static crate::config::AppConfig) -> Result<Context> {
    
    let db = db::init(&config).await?;

    Ok(Context{
        db:db,
        config:config,
        userRepository:Arc::new(DefaultUsersService::new(&db))
    })
}

pub fn run(ctx: Context) {

}
