use uuid::Uuid;
use chrono::{DateTime,Utc};

#[derive(Default)]
pub struct TodoComment{
    pub id:Uuid,
    pub comment:String,
    pub creation_date:DateTime<Utc>,
    pub update_date:DateTime<Utc>,
    pub todo_id:Uuid,
    pub user_id:Uuid
}

