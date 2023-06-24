'use client';

import { createContext, useContext } from 'react';

interface CheckboxGroupContext {
  values: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContext | null>(null);

export const CheckboxGroupProvider = CheckboxGroupContext.Provider;

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
