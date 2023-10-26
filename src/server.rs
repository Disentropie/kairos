use async_graphql::http::GraphiQLSource;
use async_graphql_axum::GraphQL;
use axum::{
    response::{self, IntoResponse},
    routing::get,
    Router,
};

use std::net::SocketAddr;

use crate::graphql;


async fn graphiql() -> impl IntoResponse {
    response::Html(GraphiQLSource::build().endpoint("/").finish())
}

pub async fn start() -> () {
    let schema = graphql::generate_schema();
    let app = Router::new().route("/", get(graphiql).post_service(GraphQL::new(schema)));

    let addr = SocketAddr::from(([127, 0, 0, 1], 9000));
    println!("Listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await.unwrap()
}
