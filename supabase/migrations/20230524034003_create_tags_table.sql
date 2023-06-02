CREATE TABLE IF NOT EXISTS tags  (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(name) > 0),
    description TEXT NOT NULL DEFAULT '',
    color VARCHAR(16) NOT NULL DEFAULT 'gray',
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT tags_pk PRIMARY KEY (id),
    CONSTRAINT tags_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    UNIQUE (user_id, name)
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_tags_select_authenticated
ON tags AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_tags_insert_authenticated
ON tags AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_tags_update_authenticated
ON tags AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_tags_delete_authenticated
ON tags AS PERMISSIVE FOR DELETE
TO authenticated
USING (user_id = auth.uid());