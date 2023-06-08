'use client';

import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@/ui/client';
import { useSupabase } from '@/providers';
import { tableColStyles } from '@/styles/components/table.styles';
import { getValueFromData } from '@/lib/enums/table-maps';

import {
  FunnelIcon,
  PlusIcon,
  ViewColumnsIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid';
import { twMerge } from 'tailwind-merge';
import { VariantProps } from 'class-variance-authority';

const mockData = [
  {
    // random uuid for id field
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: 'Resistor super long name for a resistor this should be illegal',
    description:
      'A resistor is a passive two-terminal electrical component that implements electrical resistance as a circuit element.',
    quantity_in_stock: 100,
    datasheer_url: 'https://google.com',
    manufacturer: 'Vishay',
  },
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
    name: 'Capacitor',
    description:
      'A capacitor is a passive two-terminal electrical component used to store energy electrostatically in an electric field.',
    quantity_in_stock: 100,
    datasheer_url: null,
    manufacturer: 'Vishay',
  },
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
    name: 'Diode',
    description:
      'A diode is a two-terminal electronic component that conducts current primarily in one direction (asymmetric conductance); it has low (ideally zero) resistance in one direction, and high (ideally infinite) resistance in the other.',
    quantity_in_stock: 100,
    datasheer_url: null,
    manufacturer: 'Vishay',
  },
];

interface Column extends Omit<VariantProps<typeof tableColStyles>, 'header'> {
  label: string;
}

// TODO: finish checkbox styles
export default function Inventory() {
  const [checkedItems, setCheckedItems] = useState<
    Array<{ value: string; checked: boolean; id: string }>
  >([]);
  const [selectedColumns, setSelectedColumns] = useState<Column[]>([
    { label: 'part', type: 'key' },
    { label: 'description', type: 'text' },
    { label: 'orders', type: 'number' },
    { label: 'quantity', type: 'number' },
  ]);
  const availableColumns = ['orders', 'quantity', 'in use'];

  const { supabase } = useSupabase();

  useEffect(() => {
    // TODO: query from database

    setCheckedItems(
      mockData.map((data) => ({ value: data.id, checked: false, id: data.id }))
    );
  }, []);

  const allChecked = !checkedItems.length
    ? false
    : checkedItems.every((item) => item.checked);
  const indeterminate = checkedItems.some((item) => item.checked) && !allChecked;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between md:gap-2 gap-4">
          <Button
            intent="secondary"
            icon={<FunnelIcon />}
            disabled
            className="md:inline-block hidden"
          >
            Filters
          </Button>
          <Button
            intent="secondary"
            icon={<ViewColumnsIcon />}
            disabled
            className="md:inline-block hidden"
          >
            Columns
          </Button>
          <Button
            intent="secondary"
            icon={<FunnelIcon />}
            className="md:hidden inline-block"
            size="xs"
            onlyIcon
          />
          <Button
            intent="secondary"
            icon={<ViewColumnsIcon />}
            className="md:hidden inline-block"
            size="xs"
            onlyIcon
          />
        </div>
        <Button icon={<PlusIcon />} className="md:inline-block hidden">
          Create Part
        </Button>
        <Button icon={<PlusIcon />} className="md:hidden inline-block" onlyIcon />
      </div>
      <div className="overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr>
              <th
                className={twMerge(
                  tableColStyles({ header: true }),
                  'w-12 relative py-0'
                )}
              >
                <Checkbox
                  indeterminate={indeterminate}
                  checked={allChecked}
                  onChange={() =>
                    setCheckedItems((current) =>
                      current.map((item) => ({ ...item, checked: !allChecked }))
                    )
                  }
                  size="sm"
                  className="absolute top-1/2 -mt-2 left-4"
                />
              </th>
              {selectedColumns.map((column, index) => (
                <th
                  key={`${column.label}_${index}`}
                  className={twMerge(
                    tableColStyles({
                      header: true,
                    })
                  )}
                >
                  {column.label}
                </th>
              ))}
              <th className="py-4 px-6 border-b-1 border-b-white/5 text-sm relative w-12">
                <span className="absolute p-0 h-[1px] w-[1px] text-clip whitespace-nowrap border-0 overflow-hidden">
                  Expand
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((data, index) => (
              <tr
                key={data.id}
                className={checkedItems[index]?.checked ? 'bg-white/5' : ''}
              >
                <td className="px-6 py-4 w-12 relative border-b-1 border-b-white/5">
                  {checkedItems[index]?.checked && (
                    <div className="w-[0.125rem] absolute left-0 top-0 bottom-0 bg-amber-400"></div>
                  )}
                  <Checkbox
                    checked={checkedItems[index]?.checked ?? false}
                    onChange={(e) =>
                      setCheckedItems((current) =>
                        current.map((item) => {
                          if (item.id === data.id) {
                            return { ...item, checked: e.target.checked };
                          }
                          return item;
                        })
                      )
                    }
                    size="sm"
                    className="absolute top-1/2 -mt-2 left-4"
                  />
                </td>
                {selectedColumns.map((column, colIndex) => (
                  <td
                    key={`content_${column.label}_${colIndex}`}
                    className={twMerge(tableColStyles({ type: column.type }))}
                  >
                    {getValueFromData<typeof data, string>('parts', column.label, data) ??
                      'No Data'}
                  </td>
                ))}
                <td className="py-4 px-6 text-right border-b-1 border-b-white/5 text-sm w-12 relative">
                  <div
                    className="w-6 h-6 cursor-pointer flex items-center justify-center group absolute top-1/2 -mt-2 left-4"
                    onClick={() => console.log(`expand row ${index + 1}`)}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4/5 h-4/5 text-sky-400/70 group-hover:text-sky-400 transition" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
