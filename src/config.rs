use std::env;

use clap::{command, Arg, ArgAction};
pub struct Config {
    /// The connection URL for the Postgres database this application should use.
    pub database_url: String,
    pub port: u16,
}

pub fn init() -> Config {
    let matches = command!()
        .arg(
            Arg::new("mode")
                .long("mode")
                .short('m')
                .required(true)
                .action(ArgAction::Set),
        )
        .get_matches();

    let env = match matches.get_one::<String>("mode").unwrap().as_str() {
        "dev" => dotenv::from_filename(".env.dev"),
        "prod" => dotenv::from_filename(".env"),
        _ => panic!("Don't be crazy"),
    };

    env.ok();
    let port: u16 = env::var("port")
        .unwrap()
        .trim()
        .parse()
        .expect("Port should be a number");
    let db_url = env::var("db_url").unwrap();

    Config {
        database_url: db_url,
        port: port,
    }
}
