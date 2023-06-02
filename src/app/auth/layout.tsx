import React from 'react';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import routes from '@/lib/routes';
import { Main, Header } from '@/ui/server';

export const metadata = {
  title: 'Auth',
  description: 'Electronic hardware inventory and project management tool.',
};

function SignedIn({ next }: { next: string }) {
  return (
    <>
      <Header>Already Signed In</Header>
      <Main>
        <p className="text-base w-full text-left">
          If you just signed in, please wait a few seconds while we redirect you back.
        </p>
        <p className="text-base w-full text-left">
          Or you can click{' '}
          <Link href={next} className="link">
            here
          </Link>{' '}
          to go there now.
        </p>
      </Main>
    </>
  );
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headersList = headers();
  const next = headersList.get('x-next') ?? routes.home;

  return <>{(session && session.user && <SignedIn next={next} />) || children}</>;
}
