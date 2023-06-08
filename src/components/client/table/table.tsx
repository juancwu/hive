import { FC } from 'react';

interface TableProps {
  className?: string;
  children?: React.ReactNode;
}

const Table: FC<TableProps> = ({ className, children }) => {
  return <table>{children}</table>;
};
