CREATE TABLE IF NOT EXISTS project_clusters  (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(name) > 0),
    description TEXT NOT NULL DEFAULT '',
    start_date DATE NOT NULL,
    end_date DATE,
    cluster_status VARCHAR(16) NOT NULL DEFAULT 'planning',
    nickname VARCHAR(255) NOT NULL DEFAULT '',
    cluster_type VARCHAR(16) NOT NULL DEFAULT 'personal',
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT project_clusters_pk PRIMARY KEY (id),
    CONSTRAINT project_clusters_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    UNIQUE (user_id, name)
);

ALTER TABLE project_clusters ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_project_clusters_select_authenticated
ON project_clusters AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_project_clusters_insert_authenticated
ON project_clusters AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_project_clusters_update_authenticated
ON project_clusters AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_project_clusters_delete_authenticated
ON project_clusters AS PERMISSIVE FOR DELETE
TO authenticated
USING (user_id = auth.uid());