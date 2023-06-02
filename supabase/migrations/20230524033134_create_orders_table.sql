CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid(),
    order_date DATE NOT NULL,
    supplier TEXT NOT NULL DEFAULT '',
    tracking TEXT NOT NULL DEFAULT '',
    delivery_service TEXT NOT NULL DEFAULT '',
    delivery_status VARCHAR(16) NOT NULL DEFAULT '',
    estimated_delivery_date DATE,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT orders_pk PRIMARY KEY (id),
    CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_orders_select_authenticated
ON orders AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_orders_insert_authenticated
ON orders AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_orders_update_authenticated
ON orders AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_orders_delete_authenticated
ON orders AS PERMISSIVE FOR DELETE
TO authenticated
USING (user_id = auth.uid());