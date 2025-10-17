CREATE TABLE
    users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(150) NOT NULL,
        description TEXT,
        created_by INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    project_members (
        project_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        role TEXT CHECK (role IN ('admin', 'responsable', 'membre')) NOT NULL DEFAULT 'membre',
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (project_id, user_id),
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        name VARCHAR(50) NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        UNIQUE (project_id, name)
    );

CREATE TABLE
    tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        name VARCHAR(150) NOT NULL,
        description TEXT,
        status TEXT CHECK (
            status IN ('todo', 'in_progress', 'done', 'expired')
        ) DEFAULT 'todo',
        priority TEXT CHECK (priority IN ('none', 'low', 'medium', 'high')) DEFAULT 'none',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        due_date DATETIME,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE,
        UNIQUE (project_id, name)
    );

CREATE TABLE
    task_assignees (
        task_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (task_id, user_id),
        FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );

CREATE TABLE
    task_tags (
        task_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (task_id, tag_id),
        FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
    );

CREATE TABLE
    checklist_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER NOT NULL,
        name VARCHAR(100) NOT NULL,
        is_done BOOLEAN DEFAULT FALSE,
        item_index INTEGER NOT NULL,
        FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
        UNIQUE (task_id, name),
        UNIQUE (task_id, item_index)
    );