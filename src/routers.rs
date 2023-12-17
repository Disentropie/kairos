use async_graphql::http::GraphiQLSource;
use async_graphql_axum::{GraphQLRequest, GraphQLResponse};
use axum::{Extension, response::{IntoResponse, Html}};

use crate::graphql::GraphQLSchema;
use serde_json::json;

pub async fn health_handler() -> impl IntoResponse {
    json!({
        "code": "200",
        "success": true,
    })
    .to_string()
}

// GraphQL
// -------

/// Handle GraphiQL Requests
pub async fn graphiql() -> impl IntoResponse {
    Html(GraphiQLSource::build().endpoint("/api").finish())
}

/// Handle GraphQL Requests
pub async fn graphql_handler(
    schema: Extension<GraphQLSchema>,
    req: GraphQLRequest,
) -> GraphQLResponse {
    schema.execute(req.into_inner()).await.into()
}