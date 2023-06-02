CREATE TABLE IF NOT EXISTS ic_details  (
    id UUID DEFAULT gen_random_uuid(),
    series TEXT NOT NULL DEFAULT '',
    pin_number INTEGER NOT NULL DEFAULT 0,
    mounting_type TEXT NOT NULL DEFAULT '',
    part_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT ic_details_pk PRIMARY KEY (id),
    CONSTRAINT ic_details_part_id_fk FOREIGN KEY (part_id) REFERENCES parts (id) ON DELETE CASCADE
);

ALTER TABLE ic_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_ic_details_select_authenticated
ON ic_details AS PERMISSIVE FOR SELECT
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_ic_details_insert_authenticated
ON ic_details AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_ic_details_update_authenticated
ON ic_details AS PERMISSIVE FOR UPDATE
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
)
WITH CHECK (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_ic_details_delete_authenticated
ON ic_details AS PERMISSIVE FOR DELETE
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);