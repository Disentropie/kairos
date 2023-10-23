use async_graphql::{
    http::GraphiQLSource, EmptySubscription, InputObject, MergedObject, Object, Schema,
    SimpleObject,
};
use async_graphql_axum::GraphQL;
use axum::{
    response::{self, IntoResponse},
    routing::get,
    Router,
};
use std::env;

use clap::{arg, command, Arg, ArgAction};
use std::net::SocketAddr;
#[derive(Default)]
struct TodoQuery;

#[derive(Default)]
struct TodoMutation;

#[derive(SimpleObject, Debug)]
struct TodoOutputDto {
    id: i8,
    name: String,
    description: String,
}

#[derive(InputObject)]
struct TodoDto {
    name: String,
    description: String,
}

#[Object]
impl TodoQuery {
    async fn get_todo(&self, id: i8) -> TodoOutputDto {
        TodoOutputDto {
            id: id,
            name: "This is a name".into(),
            description: "This is a description".into(),
        }
    }
}

#[Object]
impl TodoMutation {
    async fn update_todo(&self, todo: TodoDto) -> TodoOutputDto {
        let update_todo = TodoOutputDto {
            id: 12,
            name: todo.name,
            description: todo.description,
        };
        println!("{:?}", update_todo);
        update_todo
    }

    async fn create_todo(&self, todo: TodoDto) -> TodoOutputDto {
        TodoOutputDto {
            id: 12,
            name: todo.name,
            description: todo.description,
        }
    }
}

#[derive(Default)]
struct MySecondObject;

#[derive(SimpleObject)]
struct OutputObj {
    name: String,
    value: u8,
}

#[Object]
impl MySecondObject {
    async fn value_test(&self, name: String) -> OutputObj {
        let r = OutputObj {
            name: name,
            value: 12,
        };
        r
    }

    async fn another_test(&self) -> u8 {
        8
    }
}

#[derive(MergedObject, Default)]
struct Query(TodoQuery, MySecondObject);
#[derive(MergedObject, Default)]
struct Mutation(TodoMutation);
async fn graphiql() -> impl IntoResponse {
    response::Html(GraphiQLSource::build().endpoint("/").finish())
}

#[tokio::main]
async fn main() {
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
    println!("db url {}", db_url);
    println!("port is : {}", port);
    let schema = Schema::build(Query::default(), Mutation::default(), EmptySubscription).finish();
    //println!("{}", &schema.sdl());

    let app = Router::new().route("/", get(graphiql).post_service(GraphQL::new(schema)));

    // run it
    let addr = SocketAddr::from(([127, 0, 0, 1], port));
    println!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
