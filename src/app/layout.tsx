import '@/styles/css/globals.css';
import { cookies } from 'next/headers';
import localFont from 'next/font/local';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import SupabaseProvider from '@/providers/supabase-provider';
import { NavBar } from '@/components/client/nav-bar';
import React from 'react';

export const notoSansJP = localFont({
  src: './fonts/NotoSansJP-Variable.ttf',
  variable: '--font-noto-sans-jp',
});

export const montserrat = localFont({
  src: './fonts/Montserrat-Variable.ttf',
  variable: '--font-montserrat',
});

export const inter = localFont({
  src: './fonts/Inter-Variable.ttf',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Hive',
  description: 'Electronic hardware inventory and project management tool.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider session={session}>
          <div className="min-h-full h-full flex flex-col">
            <NavBar />
            <div className="pt-10 pb-10 flex-grow">{children}</div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
