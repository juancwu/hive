'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  Session,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/types/database.types';
import routes from '@/lib/routes';

type MaybeSession = Session | null;
type MaybeUser = User | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: MaybeSession;
  currentUser: MaybeUser;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: MaybeSession;
}) {
  const [supabase] = useState(() =>
    createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    })
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        console.log('token refreshed');
      }

      const now = Date.now();

      if (session && !session.expires_at) {
        // manually set expires at time
        session.expires_at = Math.floor(now / 1000) + session.expires_in;
      }

      if (session?.expires_at && session.expires_at * 1000 < now) {
        await supabase.auth.signOut();
        return;
      }

      const next = searchParams.get('next') ?? routes.home;
      let shouldRedirect = false;
      if (event === 'INITIAL_SESSION') {
        setCurrentUser(() => session?.user ?? null);
      } else if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setCurrentUser(() => session?.user ?? null);
        shouldRedirect = true;
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        shouldRedirect = true;
      }
      if (shouldRedirect) {
        router.refresh();
        router.push(next);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, searchParams]);

  return (
    <Context.Provider value={{ supabase, session, currentUser }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
