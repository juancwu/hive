import React from 'react';

export const metadata = {
  title: 'Inventory',
};

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
