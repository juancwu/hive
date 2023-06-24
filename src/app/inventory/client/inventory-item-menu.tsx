'use client';

import { Fragment, FC } from 'react';
import { Button } from '@/ui/client/button';

import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

import type { InventoryItemMenuProps } from '@/lib/types/pages/inventory.types';

export const InventoryItemMenu: FC<InventoryItemMenuProps> = ({ part }) => {
  return (
    <>
      <Button intent="secondary" size="xs" className="hidden sm:block">
        View Part<span className="sr-only">, {part.name}</span>
      </Button>
      <Menu as="div" className="relative flex-none">
        <Menu.Button className="group -m-2.5 block p-2.5 text-zinc-500 hover:text-white rounded-md transition">
          <span className="sr-only">Open Options</span>
          <EllipsisVerticalIcon
            className="h-5 w-5 group-focus-visible:text-white"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-zinc-800 shadow-lg ring-1 ring-white/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                // open side panel to edit
                <button
                  className={`block sm:hidden px-3 py-1 text-sm leading-6 text-white w-full ${
                    active ? 'bg-white/5' : ''
                  }`}
                  onClick={() => console.log('open side panel to edit')}
                >
                  View Part
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // show modal with lists of projects to move to
                <button
                  className={`block px-3 py-1 text-sm leading-6 text-white w-full ${
                    active ? 'bg-white/5' : ''
                  }`}
                  onClick={() => console.log('show modal with projects')}
                >
                  Add to project
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // show confirmation modal
                <button
                  className={`block px-3 py-1 text-sm leading-6 text-red-500 w-full ${
                    active ? 'bg-white/5' : ''
                  }`}
                  onClick={() => console.log('show confirmation modal')}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};