CREATE TABLE IF NOT EXISTS resistor_details  (
    id UUID DEFAULT gen_random_uuid(),
    resistance FLOAT NOT NULL DEFAULT 0,
    tolerance FLOAT NOT NULL DEFAULT 0,
    power_rating FLOAT NOT NULL DEFAULT 0,
    mounting_type TEXT NOT NULL DEFAULT '',
    material TEXT NOT NULL DEFAULT '',
    part_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT resistor_details_pk PRIMARY KEY (id),
    CONSTRAINT resistor_details_part_id_fk FOREIGN KEY (part_id) REFERENCES parts (id) ON DELETE CASCADE
);

ALTER TABLE resistor_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_resistor_details_select_authenticated
ON resistor_details AS PERMISSIVE FOR SELECT
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_resistor_details_insert_authenticated
ON resistor_details AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_resistor_details_update_authenticated
ON resistor_details AS PERMISSIVE FOR UPDATE
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
)
WITH CHECK (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_resistor_details_delete_authenticated
ON resistor_details AS PERMISSIVE FOR DELETE
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);