CREATE TABLE IF NOT EXISTS parts (
    id UUID DEFAULT gen_random_uuid(),
    name TEXT NOT NULL CHECK (length(name) > 0),
    quantity_in_stock INTEGER NOT NULL DEFAULT 0,
    description TEXT NOT NULL DEFAULT '',
    datasheet_url TEXT NOT NULL DEFAULT '',
    manufacturer VARCHAR(255) NOT NULL DEFAULT '',
    min_storage_temperature FLOAT,
    max_storage_temperature FLOAT,
    storage_temperature_unit VARCHAR(16),
    min_operating_temperature FLOAT,
    max_operating_temperature FLOAT,
    operating_temperature_unit VARCHAR(16),
    min_supply_voltage FLOAT,
    max_supply_voltage FLOAT,
    supply_voltage_unit VARCHAR(16),
    min_supply_current FLOAT,
    max_supply_current FLOAT,
    supply_current_unit VARCHAR(16),
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT parts_pk PRIMARY KEY (id),
    CONSTRAINT parts_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

ALTER TABLE parts ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_parts_select_authenticated
ON parts AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_parts_insert_authenticated
ON parts AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_parts_update_authenticated
ON parts AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_parts_delete_authenticated
ON parts AS PERMISSIVE FOR DELETE
TO authenticated
USING (user_id = auth.uid());