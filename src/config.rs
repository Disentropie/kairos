use anyhow::Result;
use dotenv::dotenv;
use figment::{
    providers::{Env, Format, Toml},
    Figment,
};
use once_cell::sync::Lazy;

use serde::Deserialize;
static CONFIG: Lazy<AppConfig> = Lazy::new(|| AppConfig::new().expect("Unable to retrieve config"));

#[derive(Debug, Deserialize)]
 pub struct AppConfig {
    pub database_uri: String,
    pub database_user: String,
    pub database_password: String,
    pub server_bind_address: String,
    pub server_tls_chain: String,
}

impl AppConfig {
    fn new() -> Result<AppConfig> {
        dotenv().ok();
         let config: AppConfig = Figment::new()
            .merge(Toml::file("config/config.toml"))
            .merge(Env::prefixed("KAIROS_"))
            .extract()?;


        Ok(config)
    }
}


pub fn get_config() -> &'static AppConfig{
    &CONFIG
}