import { FC } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

import { InventoryProps } from '@/lib/types/pages/inventory.types';
import { InventoryItemMenu } from '@/app/inventory/client/inventory-item-menu';
import { Tag } from '@/ui/server';
import { InventoryCreatePart } from '@/app/inventory/client/inventory-create-part';

export const Inventory: FC<InventoryProps> = ({ data: inventoryData }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4 px-8 md:px-0">
        <InventoryCreatePart />
      </div>
      <div>
        <ul role="list" className="divide-y divide-white/5">
          {inventoryData.map((part) => (
            <li key={part.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="min-w-0">
                <div className="sm:flex sm:items-start sm:gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-white">
                    {part.name}
                  </p>
                  <div className="flex items-start gap-x-3">
                    <Link href={`/part/projects/${part.id}`}>
                      <span className="sr-only">View projects with part</span>
                      <Tag colour="green" text={`In Stock: ${part.quantity_in_stock}`} />
                    </Link>
                    <Tag colour="yellow" text={`Coming: ${part.quantity_ordered ?? 0}`} />
                    <Tag colour="blue" text={`Orders: ${part.orders_count}`} />
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-zinc-400">
                  <p>
                    Added on{' '}
                    <time dateTime={dayjs(part.created_at).format()}>
                      {dayjs(part.created_at).format('MMMM D, YYYY h:mm A')}
                    </time>
                  </p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <InventoryItemMenu part={part} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
