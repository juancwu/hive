import type { FC } from 'react';
import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header>
      <div className="pl-8 pr-8 mx-auto max-w-7xl">
        <h1 className="font-bold text-3xl">{children}</h1>
      </div>
    </header>
  );
};

export default Header;
