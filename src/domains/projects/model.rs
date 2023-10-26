use uuid::Uuid;
use chrono::{DateTime,Utc};
use serde::{Serialize,Deserialize};

#[derive(Default)]
pub struct Project{
    pub id:Uuid,
    pub name:String,
    pub creation_date:DateTime<Utc>,
    pub create_by:Uuid
}


#[derive(Clone, Debug, PartialEq, PartialOrd, sqlx::Type, Deserialize, Serialize)]
#[sqlx(type_name = "project_permission", rename_all = "lowercase")]
pub enum ProjectPermission {
    Guest,
    Collaborator,
    Admin
}
