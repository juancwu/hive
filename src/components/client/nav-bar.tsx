'use client';

/** Packages */
import { useState, Fragment } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/** Local modules */
import routes from '@/lib/routes';
import { cva } from 'class-variance-authority';
import { SearchInput } from '@/components/client/search-input';
import { useKeybind } from '@/hooks';
import { getOperatingSystem } from '@/lib/helpers/browser';
import { useSupabase } from '@/providers';

const routeBaseStyle =
  'inline-flex items-center text-zinc-400/80 hover:text-zinc-400 transition text-sm font-medium pt-1 px-1 border-transparent border-b-2 hover:border-zinc-400 ml-8 capitalize';
const routeStyles = cva(routeBaseStyle, {
  variants: {
    active: {
      true: 'text-white border-amber-400 hover:text-white hover:border-amber-400',
    },
    first: {
      true: 'ml-0',
    },
  },
});

const navigation = [
  { name: 'inventory', href: routes.inventory },
  { name: 'projects', href: routes.projects },
  { name: 'profile', href: routes.profile },
];

const NavBar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const pathname = usePathname();
  const { session } = useSupabase();

  const isMac = getOperatingSystem() === 'mac';

  useKeybind([isMac ? 'cmd' : 'ctrl', '/'], () => setOpenSearch(!openSearch), {
    triggerInInput: true,
  });

  return (
    <Disclosure as="nav" className="border-b-1 border-b-white border-opacity-5">
      <div className="pl-8 pr-8 mx-auto max-w-7xl">
        <div className="h-16 justify-between md:flex hidden">
          <div className="flex">
            {/* BRAND NAME */}
            <div className="flex items-center shrink-0">
              <Link href={routes.home}>
                <span className="uppercase text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  HIVE
                </span>
              </Link>
            </div>
            {/* ROUTES */}
            <div className="flex ml-8 -mt-1 -mb-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  lang="en"
                  className={twMerge(
                    routeStyles({ active: pathname === item.href, first: index === 0 })
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Search Bar - As a button that opens a dialog (modal) which contains the actual search input */}
          <div className="hidden lg:flex lg:items-center lg:max-w-xs md:flex-1">
            {session && (
              <button
                className="bg-white/5 text-zinc-400 rounded-full w-full h-8 gap-2 px-3 ring-1 ring-white/10 transition text-sm flex my-auto items-center hover:ring-white/20"
                onClick={() => setOpenSearch(true)}
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
                Search...
                <kbd className="ml-auto text-xs text-zinc-500">
                  <kbd>{isMac ? 'Cmd' : 'Ctrl'}</kbd>
                  <span className="inline-block mx-1">+</span>
                  <kbd>/</kbd>
                </kbd>
              </button>
            )}
            <Transition appear show={openSearch} as={Fragment}>
              <Dialog onClose={() => setOpenSearch(false)} className="relative z-10">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300 transition-opacity"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200 transition-opacity"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
                    aria-hidden="true"
                  />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300 transition-opacity"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200 transition-opacity"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Panel className="mx-auto max-w-sm bg-zinc-900 ring-zinc-800 sm:max-w-xl opacity-100 scale-100 overflow-hidden rounded-lg ring-1 ring-white/10">
                      <SearchInput placeholder="Search..." />
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
