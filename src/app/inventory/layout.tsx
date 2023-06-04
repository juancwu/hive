import React from 'react';
import { Main, Header } from '@/ui/server';

export const metadata = {
  title: 'Inventory',
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>Inventory</Header>
      <Main>{children}</Main>
    </>
  );
}
