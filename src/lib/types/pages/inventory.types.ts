export interface InventoryPart extends Record<string, string | number> {
  id: string;
  name: string;
  description: string;
  quantity_in_stock: number;
  datasheet_url: string;
  manufacturer: string;
  orders_count: number;
  quantity_ordered: number;
  created_at: string;
  updated_at: string;
}

export interface InventoryProps {
  data: InventoryPart[];
}

export interface InventoryItemMenuProps {
  part: InventoryPart;
}

/**
 * 
 * CREATE OR REPLACE FUNCTION get_inventory(user_id UUID, offset_limit INT, row_limit INT)
RETURNS TABLE(
    id INT,
    name TEXT,
    description TEXT,
    manufacturer TEXT,
    datasheet_url TEXT,
    quantity_in_stock INT,
    quantity_ordered BIGINT,
    orders_count BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY 
        SELECT parts.id, parts.name, parts.description, parts.manufacturer, parts.datasheet_url, parts.quantity_in_stock, SUM(order_details.quantity_ordered), COUNT(orders.id), parts.created_at, parts.updated_at
        FROM parts
        LEFT JOIN order_details ON parts.id = order_details.part_id
        LEFT JOIN orders ON orders.id = order_details.order_id
        WHERE parts.user_id = user_id
        GROUP BY parts.id
        ORDER BY parts.name
        OFFSET offset_limit
        LIMIT row_limit;
END;
$$ LANGUAGE plpgsql;

 */
