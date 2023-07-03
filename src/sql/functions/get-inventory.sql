CREATE OR REPLACE FUNCTION get_inventory(user_id UUID)
RETURNS TABLE(
    id UUID,
    name TEXT,
    description TEXT,
    manufacturer VARCHAR(255),
    datasheet_url TEXT,
    quantity_in_stock INT,
    quantity_ordered BIGINT,
    orders_count BIGINT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY 
        SELECT parts.id, parts.name, parts.description, parts.manufacturer, parts.datasheet_url, parts.quantity_in_stock, SUM(order_details.quantity_ordered), COUNT(orders.id), parts.created_at, parts.updated_at
        FROM parts
        LEFT JOIN order_details ON parts.id = order_details.part_id
        LEFT JOIN orders ON orders.id = order_details.order_id
        WHERE parts.user_id = get_inventory.user_id
        GROUP BY parts.id
        ORDER BY parts.name;
END;
$$ LANGUAGE plpgsql;
