
#[async_trait]
pub trait GenericProjectService{
    async fn get_projects(&self);
    async fn get_project(&self);
    async fn create_project(&self, name:&str,create_by:&Uuid);
}