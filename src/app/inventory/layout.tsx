import React from 'react';

export const metadata = {
  title: 'Inventory',
};

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
