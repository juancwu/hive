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
