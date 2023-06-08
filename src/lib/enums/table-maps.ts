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

export const PARTS_TABLE_VALUE_HANDLERS: Record<string, <T>(data: any) => T> = {
  quantity: <T>(data: any) => data.quantity_in_stock as T,
  name: <T>(data: any) => data.name as T,
  id: <T>(data: any) => data.id as T,
  description: <T>(data: any) => data.description as T,
  datasheet: <T>(data: any) => data.datasheet as T,
  manufacturer: <T>(data: any) => data.manufacturer as T,
};

export function getAliasForTableColumn(table: string, column: string) {
  if (table === 'parts') {
    return PARTS_TABLE_KEY_ALIASES[column] ?? '';
  }
}

export function getValueFromData<T, R>(table: string, column: string, data: T) {
  if (table === 'parts') {
    const alias = getAliasForTableColumn(table, column);
    if (!alias) {
      return null;
    }

    return PARTS_TABLE_VALUE_HANDLERS[alias]<R>(data);
  }
}
