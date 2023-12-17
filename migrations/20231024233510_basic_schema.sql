-- Add migration script here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE IF NOT EXISTS users
(
    id          uuid PRIMARY KEY,
    name        varchar(200) NOT NULL DEFAULT '',
    email       varchar(200) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE (email)
);


CREATE TABLE IF NOT EXISTS teams
(
    id          uuid PRIMARY KEY,
    name        varchar(100) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    create_by uuid NOT NULL,
    CONSTRAINT fk_create_by
    FOREIGN KEY (create_by)
    REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_create_by ON teams 
(
    create_by
);


CREATE TABLE IF NOT EXISTS projects
(
    id          uuid PRIMARY KEY,
    name        varchar(100) NOT NULL,
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    create_by uuid NOT NULL,
    team_id uuid NOT NULL,
    CONSTRAINT fk_create_by
    FOREIGN KEY (create_by)
    REFERENCES users(id),
    CONSTRAINT fk_team_id
    FOREIGN KEY (create_by)
    REFERENCES teams(id)
);

CREATE INDEX IF NOT EXISTS idx_create_by ON projects 
(
    create_by
);
CREATE INDEX IF NOT EXISTS idx_team_id ON projects 
(
    team_id
);

CREATE TABLE IF NOT EXISTS todos
(
    id          uuid PRIMARY KEY,
    description TEXT NOT NULL DEFAULT '',
    title        varchar(200) NOT NULL DEFAULT '',
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP NOT NULL DEFAULT NOW(),
    project_id uuid NOT NULL,
    CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
);

CREATE INDEX IF NOT EXISTS idx_project_id ON todos 
(
    project_id
);


CREATE TYPE project_permission AS ENUM ('guest', 'collaborator', 'admin');

CREATE TABLE IF NOT EXISTS projects_users
(
    project_id    uuid NOT NULL,
    user_id       uuid NOT NULL,
    permission    project_permission NOT NULL,
    UNIQUE (project_id,user_id,permission),
    CONSTRAINT fk_project_id
        FOREIGN KEY (project_id)
        REFERENCES projects(id),
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS todos_users
(
    todo_id uuid NOT NULL,
    user_id uuid NOT NULL,


    UNIQUE (todo_id,user_id),

    CONSTRAINT fk_todo
        FOREIGN KEY (todo_id)
        REFERENCES todos(id),
    
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
    
);


CREATE TABLE IF NOT EXISTS todo_comments
(
    id          uuid PRIMARY KEY,
    comment TEXT NOT NULL DEFAULT '',
    creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
    update_date TIMESTAMP NOT NULL DEFAULT NOW(),
    todo_id uuid NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT fk_todo_id
        FOREIGN KEY (todo_id)
        REFERENCES todos(id),
    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_todo_id ON todo_comments 
(
    todo_id
);

CREATE INDEX IF NOT EXISTS idx_user_id ON todo_comments 
(
    user_id
);

