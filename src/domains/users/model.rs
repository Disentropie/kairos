use uuid::Uuid;
use chrono::{DateTime,Utc};
use sqlx::FromRow;

#[derive(Default,FromRow)]
pub struct User{
    pub id:Uuid,
    pub name:String,
    pub email:String,
    pub creation_date:DateTime<Utc>,
    pub update_date:DateTime<Utc>
}
