'use client';

import {
  FC,
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { getOperatingSystem } from '@/lib/helpers/browser';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEvent } from '@/hooks/use-event';
import { useKeybind } from '@/hooks/use-keybind';
import { useSupabase } from '@/providers';
import { normalizeKey } from '@/hooks/use-keybind/parser';
import Link from 'next/link';
import { flushSync } from 'react-dom';

type SearchActionsContextType = {
  onSelect: () => void;
};

export const SearchActionsContext = createContext<SearchActionsContextType>({
  onSelect: () => ({}),
});

export function useSearchActionsContext() {
  const { onSelect } = useContext(SearchActionsContext);
  return onSelect;
}

export interface SearchResult {
  id: string;
  label: string;
  description: string;
  href: string;
}

interface SearchInputProps {
  placeholder?: string;
}

interface SearchResultsProps {
  notFound: boolean;
  results: SearchResult[];
  queryNotFound?: string;
  isLast?: boolean;
  onLoadMore?: () => void;
}

interface SearchResultItemProps {
  item: SearchResult;
}

interface SearchProps {
  enabled: boolean;
}

export const SearchResultItem: FC<SearchResultItemProps> = ({ item }) => {
  const onSelect = useSearchActionsContext();

  return (
    <Link href={item.href} className="group focus:outline-none" onClick={onSelect}>
      <div className="block cursor-pointer px-4 py-3 ring-1 ring-white/5 group-hover:bg-white/10 group-focus:bg-white/10 transition">
        <div className="text-base font-normal text-white">
          <span className="group-hover:text-amber-400 transition group-focus:text-amber-400">
            {item.label}
          </span>
        </div>
        <div className="truncate whitespace-nowrap text-2xs text-zinc-500 mt-1">
          <span className="group-hover:text-white/50 transition group-focus:text-white/50">
            {item.description ? item.description : 'This part has no description...'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export const SearchResults: FC<SearchResultsProps> = ({
  notFound,
  results,
  queryNotFound,
  isLast,
  onLoadMore,
}) => {
  if (notFound) {
    return (
      <div className="border-t-1 border-zinc-100/5 bg-white/5">
        <div className="p-6 text-center">
          <p className="mt-2 text-sm text-zinc-400">
            Nothing found for{' '}
            <strong className="break-words font-semibold text-white">{`'${
              queryNotFound ?? 'current search'
            }'`}</strong>
            . Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {results.map((item) => (
        <SearchResultItem key={item.href} item={item} />
      ))}
      {results.length && isLast ? (
        <div className="w-full">
          <div className="block cursor-default px-4 py-3 ring-1 ring-white/5">
            <div className="text-base font-normal text-white pointer-events-none">
              <span>No more parts...</span>
            </div>
          </div>
        </div>
      ) : results.length ? (
        <button
          className="group focus:outline-none w-full border-none outline-none"
          onClick={onLoadMore}
        >
          <div className="block cursor-pointer px-4 py-3 ring-1 ring-white/5 group-hover:bg-white/10 group-focus:bg-white/10 transition">
            <div className="text-base font-normal text-white">
              <span className="group-hover:text-amber-400 transition group-focus:text-amber-400">
                Load More...
              </span>
            </div>
          </div>
        </button>
      ) : null}
    </div>
  );
};

export const SearchInput = ({ placeholder = '' }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const [queryNotFound, setQueryNotFound] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const limit = useRef(4); // starting limiting index is from 0
  const offset = useRef(0);
  const page = useRef(1);
  const pages = useRef(0);
  const prevPage = useRef(0);
  const nextPage = useRef(2);
  const prevQuery = useRef('');

  const { supabase } = useSupabase();

  const resetSync = useCallback((value?: { queryNotFound: boolean; query: string }) => {
    flushSync(() => {
      setResults([]);
      if (value && value.queryNotFound) {
        setQueryNotFound(value.query);
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      setQuery('');
      offset.current = 0;
      page.current = 1;
      pages.current = 0;
      prevPage.current = 0;
      nextPage.current = 2;
      prevQuery.current = '';
    });
  }, []);

  const handleSearch = async (isLoadMore: boolean) => {
    if (loading) return;

    if (!query) {
      setResults([]);
      return;
    }

    if (prevQuery.current === query && page.current === prevPage.current) return;

    setLoading(true);
    setNotFound(false);

    try {
      if (!pages.current) {
        const { count, error } = await supabase
          .from('parts')
          .select('id', { count: 'exact', head: true })
          .ilike('name', `%${query}%`);

        if (error) {
          console.error(error);
        }

        if (count && count > 0) {
          // update the total amount of pages
          pages.current = Math.ceil(count / limit.current);
        }
      }

      if (prevQuery.current === query) {
        offset.current = (page.current - 1) * limit.current;
      } else {
        offset.current = 0;
        page.current = 1;
        prevPage.current = 0;
      }

      const { data: parts, error } = await supabase
        .from('parts')
        .select('id, name, description')
        .ilike('name', `%${query}%`)
        .range(
          page.current < 2 ? offset.current : offset.current + 1,
          offset.current + limit.current
        );

      if (error) {
        // TODO: handle error using notification
        console.error(error);
      }

      if (parts && parts.length) {
        const newParts = parts.map((part) => ({
          href: `/part/${part.id}`,
          label: part.name,
          id: part.id,
          description: part.description,
        }));
        setResults(prevQuery.current !== query ? newParts : [...results, ...newParts]);
        prevPage.current = page.current;
        nextPage.current = page.current + 1;
        prevQuery.current = query;
      } else if (parts && isLoadMore) {
        setIsLast(true);
      } else {
        resetSync();
      }
    } catch (error) {
      // TODO: handle error using notification
      resetSync();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative group flex h-12">
        <MagnifyingGlassIcon className="w-4 h-full text-zinc-500 absolute left-3 pointer-events-none top-0" />
        <input
          className="flex-auto w-full pl-10 pr-10 text-base leading-5 text-white bg-transparent outline-none border-none focus:ring-0 focus:outline-none focus:border-none"
          onChange={(event) => {
            if (notFound) {
              // not found state is active, clear it
              setNotFound(false);
            }

            if (event.target.value === '') {
              setResults([]);
              setNotFound(false);
            }

            setQuery(event.target.value);
          }}
          // onKeyUp={debouncedSearch}
          onKeyDown={(e) => {
            if (normalizeKey(e.key) === 'enter') {
              handleSearch(false);
            }
          }}
          value={query}
          placeholder={placeholder}
        />
        {loading && (
          <div className="absolute right-3 h-full flex items-center justify-center">
            <div
              className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent border-l-transparent text-emerald-400 rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
      <SearchResults
        results={results}
        notFound={notFound}
        queryNotFound={queryNotFound}
        isLast={isLast}
        onLoadMore={() => {
          if (page.current < pages.current) {
            page.current += 1;
            handleSearch(true);
          }
        }}
      />
    </div>
  );
};

export const Search: FC<SearchProps> = ({ enabled }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const isMac = getOperatingSystem() === 'mac';
  const handleHotkey = useEvent(() => setOpenDialog(!openDialog));
  useKeybind([isMac ? 'cmd' : 'ctrl', '/'], handleHotkey, {
    triggerInInput: true,
    enabled,
  });

  const handleOnSelect = useEvent(() => setOpenDialog(false));

  return (
    <div className="hidden lg:flex lg:items-center lg:max-w-xs md:flex-1">
      <button
        className="bg-white/5 text-zinc-400 rounded-full w-full h-8 gap-2 px-3 ring-2 ring-white/10 transition text-sm flex my-auto items-center hover:ring-white/20"
        onClick={() => setOpenDialog(true)}
      >
        <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
        Search...
        <kbd className="ml-auto text-xs text-zinc-500">
          <kbd>{isMac ? 'Cmd' : 'Ctrl'}</kbd>
          <span className="inline-block mx-1">+</span>
          <kbd>/</kbd>
        </kbd>
      </button>
      <Transition appear show={openDialog} as={Fragment}>
        <Dialog onClose={() => setOpenDialog(false)} className="relative z-10">
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
              <Dialog.Panel className="mx-auto max-w-sm bg-zinc-900 ring-zinc-800 sm:max-w-xl opacity-100 scale-100 overflow-hidden rounded-lg ring-2 ring-white/10 shadow">
                <SearchActionsContext.Provider value={{ onSelect: handleOnSelect }}>
                  <SearchInput placeholder="Search..." />
                </SearchActionsContext.Provider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
