'use client';

import { useRef } from 'react';
import { compareObjects } from '@/lib/helpers/compare-object';
import { useDeepMemo } from './use-deep-memo';

export interface UseFormInput<Values> {
  initialValues: Values;
}

export type LooseKeys<Values> = keyof Values | (string & {});

// TODO: handle types more specifically
export type GetInputPropsReturnType = {
  value: any;
  onChange: any;
};
export type GetInputProps<Values> = <Field extends LooseKeys<Values>>(
  field: Field
) => GetInputPropsReturnType;

export interface UseFormReturnType<Values> {
  values: Values;
  getInputProps: GetInputProps<Values>;
}

export function useForm<Values extends Record<string, unknown>>({
  initialValues = {} as Values,
}: UseFormInput<Values>): UseFormReturnType<Values> {
  const values = useDeepMemo(initialValues, compareObjects);
  const valuesSnapshot = useRef<Values>(initialValues);

  return {
    values,
    getInputProps: () => {},
  };
}
