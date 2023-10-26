use super::{model::User, resolvers::UserInput};
use crate::utils::generic_repository::{GenericRepository, OrderBy};
use anyhow::{Ok, Result};
use async_trait::async_trait;
use sqlx::{query, query_as, Any, Pool, Postgres};
use uuid::Uuid;

pub struct DefaultUsersService {
    pool: Pool<Postgres>,
}

impl DefaultUsersService {
    pub fn new(pool: &Pool<Postgres>) -> Self {
        Self { pool: pool.clone() }
    }
}

pub trait UserRepository: GenericRepository<UserInput, UserInput, Item = User> {}

#[async_trait]
impl GenericRepository<UserInput, UserInput> for DefaultUsersService {
    type Item = User;

    async fn get(&self, id: &Uuid) -> Result<Option<User>> {
        let result = sqlx::query_as::<_, User>("Select * from users where id = ?")
            .bind(id)
            .fetch_one(&self.pool)
            .await?;
        Ok(Some(result))
    }

    async fn get_by_ids(&self, ids: Vec<Uuid>) -> Result<Vec<User>> {
        Ok(vec![])
    }

    async fn get_many(
        &self,
        order_by: Option<OrderBy>,
        page_size: Option<u64>,
        page: Option<u64>,
    ) -> Result<Vec<User>> {
        let result = sqlx::query_as::<_, User>("Select * from users")
            .fetch_all(&self.pool)
            .await?;
        Ok(result)
    }

    async fn create(&self, input: &UserInput) -> Result<User> {
        let user =
            sqlx::query_as::<_, User>("INSERT INTO users(name,email) VALUES(?,?) RETURNING *")
                .bind(&input.username)
                .bind(&input.email)
                .fetch_one(&self.pool)
                .await?;
        Ok(user)
    }

    async fn update(&self, id: &Uuid, input: &UserInput) -> Result<User> {
        Ok(User::default())
    }

    async fn delete(&self, id: &Uuid) -> Result<()> {
        Ok(())
    }
}
