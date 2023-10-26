use uuid::Uuid;
use anyhow::Result;
use async_trait::async_trait;

pub enum OrderBy{
    ASC(String),
    DESC(String)
}

#[async_trait]
pub trait GenericRepository<U,V>: Sync + Send {
    type Item;
    /// Get an individual `Episode` by id
    async fn get(&self, id: &Uuid) -> Result<Option<Self::Item>>;

    /// Get a list of `Episode` results matching the given ids
    async fn get_by_ids(&self, ids: Vec<Uuid>) -> Result<Vec<Self::Item>>;

    /// Get multiple `Episode` records
    async fn get_many(
        &self,
        order_by: Option<OrderBy>,
        page_size: Option<u64>,
        page: Option<u64>,
    ) -> Result<Vec<Self::Item>>;

    /// Create a `Episode` with the given input
    async fn create(&self, input: &U) -> Result<Self::Item>;

    /// Update an existing `Episode` by id
    async fn update(
        &self,
        id: &Uuid,
        input: &V,
    ) -> Result<Self::Item>;

    /// Delete an existing `Episode`
    async fn delete(&self, id: &Uuid) -> Result<()>;
}
