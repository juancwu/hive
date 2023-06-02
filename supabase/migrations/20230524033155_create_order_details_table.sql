CREATE TABLE IF NOT EXISTS order_details (
    id UUID DEFAULT gen_random_uuid(),
    quantity_ordered INTEGER NOT NULL DEFAULT 0,
    price_per_unit FLOAT NOT NULL DEFAULT 0,
    order_id UUID NOT NULL,
    part_id UUID NOT NULL,
    project_id UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT order_details_pk PRIMARY KEY (id),
    CONSTRAINT order_details_order_id_fk FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT order_details_part_id_fk FOREIGN KEY (part_id) REFERENCES parts (id) ON DELETE CASCADE
);

ALTER TABLE order_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_order_details_select_authenticated
ON order_details AS PERMISSIVE FOR SELECT
TO authenticated
USING (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
);

CREATE POLICY enable_order_details_insert_authenticated
ON order_details AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
);

CREATE POLICY enable_order_details_update_authenticated
ON order_details AS PERMISSIVE FOR UPDATE
TO authenticated
USING (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
)
WITH CHECK (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
);

CREATE POLICY enable_order_details_delete_authenticated
ON order_details AS PERMISSIVE FOR DELETE
TO authenticated
USING (
    (SELECT user_id FROM orders WHERE id = order_id) = auth.uid()
);