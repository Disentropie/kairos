use anyhow::Result;
use sqlx::{ migrate, Any, Pool, postgres::PgPoolOptions, Postgres};

use crate::config::AppConfig;

pub async fn init(config: &AppConfig) -> Result<Pool<Postgres>> {
    let db_name = "kairos";
    let url = format!(
        "{}?dbanme={}&user={}&password={}",
        config.database_uri, db_name, config.database_user, config.database_password
    );

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&url)
        .await?;
    migrate!("./migrations").run(&pool).await?;
    Ok(pool)
}
