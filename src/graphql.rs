mod todos;
mod users;

use async_graphql::{EmptySubscription, MergedObject, Schema};

use todos::{TodoQuery,TodoMutation};
use users::{UserQuery, UserMutation};

#[derive(MergedObject, Default)]
pub struct Query(TodoQuery, UserQuery);
#[derive(MergedObject, Default)]
pub struct Mutation(TodoMutation, UserMutation);

pub fn generate_schema() -> Schema<Query, Mutation, EmptySubscription> {
    Schema::build(Query::default(), Mutation::default(), EmptySubscription).finish()
}
