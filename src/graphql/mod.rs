mod todos;
mod users;

use async_graphql::{EmptySubscription, MergedObject, Schema};

use todos::{MyTodoMutation, MyTodoQuery};
use users::{MyUserMutation, MyUserQuery};

#[derive(MergedObject, Default)]
pub struct Query(MyTodoQuery, MyUserQuery);
#[derive(MergedObject, Default)]
pub struct Mutation(MyTodoMutation, MyUserMutation);

pub fn generate_schema() -> Schema<Query, Mutation, EmptySubscription> {
    Schema::build(Query::default(), Mutation::default(), EmptySubscription).finish()
}
