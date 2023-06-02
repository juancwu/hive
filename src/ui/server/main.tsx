import React from 'react';
import type { FC } from 'react';

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <main className="pl-8 pr-8 mx-auto max-w-7xl">
      <div className="pt-8 pb-8">{children}</div>
    </main>
  );
};

export default Main;
