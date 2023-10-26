use std::sync::Arc;

use async_graphql::{Context, InputObject, Object, Result, SimpleObject};
use uuid::Uuid;
use super::service::{UserRepository};
#[derive(Default)]
pub struct UserMutation;

#[derive(SimpleObject, Debug)]
pub struct UserOutput {
    pub user_id: String,
    pub username: String,
    pub email: String,
    pub creation_date: String,
}

#[derive(InputObject)]
pub struct UserInput {
    pub username: String,
    pub email: String,
}

#[derive(Default)]
pub struct UserQuery;

#[Object]
impl UserQuery {
    pub async fn get_user(&self,  ctx: &Context<'_>,id: String) -> Result<Option<UserOutput>> {
        let user_service= ctx.data_unchecked::<Arc<dyn UserRepository>>();
        let id=Uuid::parse_str(&id)?;
        let user=user_service.get(&id).await?;
        if user.is_none(){
            return Ok(None)
        }
        let user=user.unwrap();
        Ok(Some(UserOutput {
            user_id: user.id.to_string(),
            username: user.name.to_string(),
            email: user.email.to_string(),
            creation_date: user.creation_date.to_string()
        }))
    }

    pub async fn get_all_user(&self,  ctx: &Context<'_>) -> Result<Vec<UserOutput>> {
        let user_service= ctx.data_unchecked::<Arc<dyn UserRepository>>();
        let users=user_service.get_many(None,None,None).await?;
        let mut users_ouput:Vec<UserOutput>=vec![];
        for user in users.into_iter(){
            users_ouput.push(UserOutput { user_id: user.id.to_string(), username: user.name, email: user.email, creation_date: user.creation_date.to_string() })
        }
        Ok(users_ouput)
    }
}

#[Object]
impl UserMutation {
    pub async fn update_user(&self, ctx: &Context<'_>, user: UserInput) -> UserOutput {
        let update_user = UserOutput {
            user_id: "12".into(),
            username: user.username,
            email: "aurelien".into(),
            creation_date: "12-12-12".into(),
        };
        println!("{:?}", update_user);
        update_user
    }

    pub async fn create_user(&self,ctx: &Context<'_> ,user: UserInput) -> UserOutput {

        UserOutput {
            user_id: "12".into(),
            username: user.username,
            email: "aurelien".into(),
            creation_date: "12-12-12".into(),
        }
    }
}
