CREATE TABLE IF NOT EXISTS projects  (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(name) > 0),
    description TEXT NOT NULL DEFAULT '',
    start_date DATE NOT NULL,
    end_date DATE,
    project_status VARCHAR(16) NOT NULL DEFAULT 'planning',
    nickname VARCHAR(255) NOT NULL DEFAULT '',
    project_type VARCHAR(16) NOT NULL DEFAULT 'personal',
    project_cluster_id UUID,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT projects_pk PRIMARY KEY (id),
    CONSTRAINT projects_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    UNIQUE (user_id, name)
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_projects_select_authenticated
ON projects AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_projects_insert_authenticated
ON projects AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_projects_update_authenticated
ON projects AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_projects_delete_authenticated
ON projects AS PERMISSIVE FOR DELETE
TO authenticated
USING (user_id = auth.uid());