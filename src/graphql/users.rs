use async_graphql::{Object, Result, SimpleObject,InputObject};

#[derive(Default)]
pub struct UserMutation;

#[derive(SimpleObject, Debug)]
pub struct UserOutputDto {
    pub user_id: u8,
    pub username: String,
}

#[derive(InputObject)]
pub struct UserDto {
    pub username: String,
}

#[derive(Default)]
pub struct UserQuery;

#[Object]
impl UserQuery {
    pub async fn get_user(&self, id: u8) -> Result<Option<UserOutputDto>> {
        Ok(Some(UserOutputDto {
            user_id: id,
            username: "This is a name".into(),
        }))
    }
}

#[Object]
impl UserMutation {
    pub async fn update_user(&self, user: UserDto) -> UserOutputDto {
        let update_user = UserOutputDto {
            user_id: 12,
            username: user.username,
        };
        println!("{:?}", update_user);
        update_user
    }

    pub async fn create_user(&self, user: UserDto) -> UserOutputDto {
        UserOutputDto {
            user_id: 12,
            username: user.username
        }
    }
}
