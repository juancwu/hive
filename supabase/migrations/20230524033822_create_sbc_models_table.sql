CREATE TABLE IF NOT EXISTS sbc_models  (
    id UUID DEFAULT gen_random_uuid(),
    memory INTEGER NOT NULL DEFAULT 0,
    cpu_count INTEGER NOT NULL DEFAULT 0,
    cpu_model TEXT NOT NULL DEFAULT '',
    gpu_model TEXT NOT NULL DEFAULT '',
    digital_gpio_pins INTEGER NOT NULL DEFAULT 0,
    analog_gpio_pins INTEGER NOT NULL DEFAULT 0,
    dimensions TEXT NOT NULL DEFAULT '',
    weight FLOAT NOT NULL DEFAULT 0,
    power_consumption FLOAT NOT NULL DEFAULT 0,
    power_requirements TEXT NOT NULL DEFAULT '',
    wifi BOOLEAN NOT NULL DEFAULT FALSE,
    bluetooth BOOLEAN NOT NULL DEFAULT FALSE,
    ethernet BOOLEAN NOT NULL DEFAULT FALSE,
    usb BOOLEAN NOT NULL DEFAULT FALSE,
    hdmi BOOLEAN NOT NULL DEFAULT FALSE,
    micro_hdmi BOOLEAN NOT NULL DEFAULT FALSE,
    audio BOOLEAN NOT NULL DEFAULT FALSE,
    video BOOLEAN NOT NULL DEFAULT FALSE,
    sd_card BOOLEAN NOT NULL DEFAULT FALSE, 
    storage_size FLOAT NOT NULL DEFAULT 0,
    storage_unit VARCHAR(16) NOT NULL DEFAULT '',
    storage_type VARCHAR(16) NOT NULL DEFAULT '',
    part_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT sbc_models_pk PRIMARY KEY (id),
    CONSTRAINT sbc_models_part_id_fk FOREIGN KEY (part_id) REFERENCES parts (id) ON DELETE CASCADE
);

ALTER TABLE sbc_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_sbc_models_select_authenticated
ON sbc_models AS PERMISSIVE FOR SELECT
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_sbc_models_insert_authenticated
ON sbc_models AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_sbc_models_update_authenticated
ON sbc_models AS PERMISSIVE FOR UPDATE
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
)
WITH CHECK (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);

CREATE POLICY enable_sbc_models_delete_authenticated
ON sbc_models AS PERMISSIVE FOR DELETE
TO authenticated
USING (
    (SELECT user_id FROM parts WHERE id = part_id) = auth.uid()
);