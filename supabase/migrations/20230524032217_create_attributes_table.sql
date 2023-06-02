CREATE TABLE IF NOT EXISTS attributes (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(name) > 0),
    value TEXT NOT NULL DEFAULT '',
    user_id UUID NOT NULL,
    part_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT attributes_pk PRIMARY KEY (id),
    CONSTRAINT attributes_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    CONSTRAINT attributes_part_id_fk FOREIGN KEY (part_id) REFERENCES parts (id) ON DELETE CASCADE
);

ALTER TABLE attributes ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_attributes_select_authenticated
ON attributes AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_attributes_insert_authenticated
ON attributes AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_attributes_update_authenticated
ON attributes AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_attributes_delete_authenticated
ON attributes AS PERMISSIVE FOR DELETE
TO authenticated
USING (user_id = auth.uid());