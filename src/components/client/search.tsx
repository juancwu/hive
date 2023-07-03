'use client';

import { FC, Fragment, createContext, useCallback, useContext, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Link from 'next/link';
import { flushSync } from 'react-dom';
import { getOperatingSystem } from '@/lib/helpers/browser';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEvent } from '@/hooks/use-event';
import { useKeybind } from '@/hooks/use-keybind';
import { useSupabase } from '@/providers';
import { normalizeKey } from '@/hooks/use-keybind/parser';

type SearchActionsContextType = {
  onSelect: () => void;
};

const SearchActionsContext = createContext<SearchActionsContextType>({
  onSelect: () => ({}),
});

function useSearchActionsContext() {
  const { onSelect } = useContext(SearchActionsContext);
  return onSelect;
}

interface SearchResult {
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
}

interface SearchResultItemProps {
  item: SearchResult;
}

interface SearchProps {
  /** Enable keybinding */
  enableKeybind: boolean;
}

const SearchResultItem: FC<SearchResultItemProps> = ({ item }) => {
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
    </div>
  );
};

const SearchInput = ({ placeholder = '' }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const [queryNotFound, setQueryNotFound] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

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
    });
  }, []);

  const handleSearch = async () => {
    if (loading) return;

    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setNotFound(false);

    try {
      const { data: parts, error } = await supabase
        .from('parts')
        .select('id, name, description')
        .ilike('name', `%${query}%`);

      if (error) {
        // TODO: handle error using notification
        console.error(error);
      }

      if (parts && parts.length) {
        setResults(
          parts.map((part) => ({
            href: `/part/${part.id}`,
            label: part.name,
            id: part.id,
            description: part.description,
          }))
        );
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
          onKeyDown={(e) => {
            if (normalizeKey(e.key) === 'enter') {
              handleSearch();
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
      />
    </div>
  );
};

export const Search: FC<SearchProps> = ({ enableKeybind = true }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const isMac = getOperatingSystem() === 'mac';
  const handleHotkey = useEvent(() => setOpenDialog(!openDialog));
  useKeybind([isMac ? 'cmd' : 'ctrl', '/'], handleHotkey, {
    triggerInInput: true,
    enabled: enableKeybind,
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
