'use client';

/** Packages */
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';

/** Local modules */
import routes from '@/lib/routes';
import { cva } from 'class-variance-authority';
import { useSupabase } from '@/providers';
import { Search } from '@/components/client/search';

const routeBaseStyle = [
  'inline-flex items-center text-zinc-400/80 hover:text-zinc-400 transition text-sm font-medium pt-1 px-1 border-transparent border-b-2 hover:border-zinc-400 ml-8 capitalize',
  'focus-visible:outline-none focus-visible:border-amber-400 focus-visible:text-white',
];
const routeStyles = cva(routeBaseStyle, {
  variants: {
    active: {
      true: 'text-white border-amber-400 hover:text-white hover:border-amber-400 focus-visible:outline',
    },
  },
});

const navigation = [
  { name: 'inventory', href: routes.inventory },
  { name: 'projects', href: routes.projects },
  { name: 'profile', href: routes.profile },
];

export const NavBar = () => {
  const pathname = usePathname();
  const { session } = useSupabase();

  const o = {
    this: {
      that: {
        then: () => 'here',
      },
    },
  };

  return (
    <Disclosure as="nav" className="border-b-1 border-b-white border-opacity-5">
      <div className="pl-8 pr-8 mx-auto max-w-7xl">
        <div className="h-16 justify-between md:flex hidden">
          <div className="flex">
            {/* BRAND NAME */}
            {/* <div className="flex items-center shrink-0"></div> */}
            {/* ROUTES */}
            <div className="flex ml-8 -mt-1 -mb-1">
              <Link href={routes.home} className={routeStyles()}>
                <span className="uppercase text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                  HIVE
                </span>
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  lang="en"
                  className={twMerge(routeStyles({ active: pathname === item.href }))}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {!!session && <Search enableKeybind />}
        </div>
      </div>
    </Disclosure>
  );
};
