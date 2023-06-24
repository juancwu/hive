import type { TableName } from '@/lib/types/table-maps.types';

export const PARTS_TABLE_KEY_ALIASES: Record<string, string> = {
  name: 'name',
  part: 'name',
  quantityInStock: 'quantity',
  quantity: 'quantity',
  id: 'id',
  description: 'description',
  datasheet: 'datasheet',
  manufacturer: 'manufacturer',
};

export const PARTS_TABLE_VALUE_HANDLERS: Record<string, (data: any) => any> = {
  quantity: (data: any) => data.quantity_in_stock,
  name: (data: any) => data.name,
  id: (data: any) => data.id,
  description: (data: any) => data.description,
  datasheet: (data: any) => data.datasheet,
  manufacturer: (data: any) => data.manufacturer,
};

export function getAliasForTableColumn(table: string, column: string) {
  if (table === 'parts') {
    return PARTS_TABLE_KEY_ALIASES[column] ?? '';
  }
}

export function getValueFromData<R>(
  table: TableName,
  column: string,
  data: unknown
): R | null | undefined {
  if (table === 'parts') {
    const alias = getAliasForTableColumn(table, column);
    if (!alias) {
      return null;
    }

    return PARTS_TABLE_VALUE_HANDLERS[alias](data);
  }

  return null;
}
