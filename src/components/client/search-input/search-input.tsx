'use client';

import { Fragment, useCallback, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

import { useSupabase } from '@/providers';

export interface SearchResult {
  id: string;
  name: string;
  description: string;
}

interface SearchInputProps {
  placeholder?: string;
}

const SearchInputItemStyles = cva(
  'group block cursor-pointer px-4 py-3 ring-1 ring-white/5',
  {
    variants: {
      active: {
        true: 'bg-zinc-800/50',
      },
    },
  }
);

const SearchInputItemTextStyles = cva('text-base font-normal text-white', {
  variants: {
    active: {
      true: 'text-amber-400',
    },
  },
});

const SearchInput = ({ placeholder = '' }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const { supabase } = useSupabase();

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
      }

      if (parts && parts.length) {
        setResults(parts);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      // TODO: handle error using notification
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const handleSelect = useCallback((result: SearchResult | null) => {
    setResults([]);
    setSelectedResult(result);
  }, []);

  // const [debouncedSearch] = useDebounce(handleSearch, 500);

  return (
    <Combobox value={selectedResult} onChange={handleSelect} nullable>
      <div className="relative group flex h-12">
        <MagnifyingGlassIcon className="w-4 h-full text-zinc-500 absolute left-3 pointer-events-none top-0" />
        <Combobox.Input
          className="flex-auto w-full pl-10 pr-10 text-base leading-5 text-white bg-transparent outline-none"
          displayValue={(searchTerm: string | SearchResult | null) => {
            if (!searchTerm) return '';

            if (typeof searchTerm === 'string') {
              return searchTerm;
            }

            return searchTerm.name;
          }}
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
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleSearch();
            }
          }}
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
      <Combobox.Options>
        {results.map((result) => (
          <Combobox.Option key={result.id} value={result} as={Fragment}>
            {({ active }) => (
              <li className={twMerge(SearchInputItemStyles({ active }))}>
                <div className={twMerge(SearchInputItemTextStyles({ active }))}>
                  <span>{result.name}</span>
                </div>
                <div className="truncate whitespace-nowrap text-2xs text-zinc-500 mt-1">
                  <span>{result.description}</span>
                </div>
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
      {notFound && (
        <div className="border-t-1 border-zinc-100/5 bg-white/5">
          <div className="p-6 text-center">
            <p className="mt-2 text-sm text-zinc-400">
              Nothing found for{' '}
              <strong className="break-words font-semibold text-white">{`'${query}'`}</strong>
              . Please try again.
            </p>
          </div>
        </div>
      )}
    </Combobox>
  );
};

export default SearchInput;
