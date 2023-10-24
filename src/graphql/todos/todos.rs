use users::{UserOutputDto,UserDto};
use async_graphql::{Object, Result, SimpleObject,InputObject};

use crate::graphql::users::users;

#[derive(Default)]
pub struct TodoMutation;

#[derive(SimpleObject, Debug)]
pub struct TodoOutputDto {
    pub id: u8,
    pub name: String,
    pub description: String,
    pub users:Option<Vec<UserOutputDto>>
}

#[derive(InputObject)]
pub struct TodoDto {
    pub name: String,
    pub description: String,
    pub users:Option<Vec<UserDto>>
}

#[derive(Default)]
pub struct TodoQuery;

#[Object]
impl TodoQuery {
    pub async fn get_todo(&self, id: u8) -> Result<Option<TodoOutputDto>> {
        Ok(Some(TodoOutputDto {
            id: id,
            name: "This is a name".into(),
            description: "This is a description".into(),
            users:Some(vec![UserOutputDto{
                user_id:02,
                username:"user1".into()
            }])
        }))
    }
}

#[Object]
impl TodoMutation {
    pub async fn update_todo(&self, todo: TodoDto) -> TodoOutputDto {
        let update_todo = TodoOutputDto {
            id: 12,
            name: todo.name,
            description: todo.description,
            users:None
        };
        println!("{:?}", update_todo);
        update_todo
    }

    pub async fn create_todo(&self, todo: TodoDto) -> TodoOutputDto {
        TodoOutputDto {
            id: 12,
            name: todo.name,
            description: todo.description,
            users:None
        }
    }
}

