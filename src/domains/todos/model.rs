use uuid::Uuid;
use chrono::{DateTime,Utc};

#[derive(Default)]
pub struct Todo{
    pub id:Uuid,
    pub title:String,
    pub description:String,
    pub creation_date:DateTime<Utc>,
    pub update_date:DateTime<Utc>,
    pub project_id:Uuid
}

