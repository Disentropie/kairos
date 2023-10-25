use std::env;

#[derive(Debug)]
pub struct Config {
    /// The connection URL for the Postgres database this application should use.
    pub database_url: String,
    pub port: u16,
}

pub fn init() -> Config {
    
    dotenv::from_filename(".env").ok();
    
    let port: u16 = env::var("port")
        .unwrap()
        .trim()
        .parse()
        .expect("Port should be a number");
    let db_url = env::var("DATABASE_URL").unwrap();

    let c=Config {
        database_url: db_url,
        port: port,
    };
    println!("Config : {:?}",c);
    c
}
