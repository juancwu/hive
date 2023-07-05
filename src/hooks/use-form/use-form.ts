'use client';

import React, { useCallback, useState } from 'react';
import { klona } from 'klona';
import { compareObjects } from '@/lib/helpers/compare-object';
import { useDeepMemo } from '../use-deep-memo';

import type {
  UseFormInput,
  UseFormReturnType,
  SetValues,
  SetFieldValue,
  FieldValue,
  GetInputProps,
  OnSubmit,
  OnReset,
} from '@/hooks/use-form/types';

// TODO: Support nested field paths

export function useForm<Values extends Record<string, unknown>>({
  initialValues = {} as Values,
}: UseFormInput<Values>): UseFormReturnType<Values> {
  const valuesSnapshot = useDeepMemo(initialValues, compareObjects);
  const [_values, _setValues] = useState(initialValues);

  const setFieldValue = useCallback<SetFieldValue<Values>>((field, value) => {
    _setValues((current) => {
      const cloned = klona(current);
      cloned[field] = value;
      return cloned;
    });
  }, []);

  const getInputProps = useCallback<GetInputProps<Values>>(
    (field) => {
      const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFieldValue(field, e.target.value as FieldValue<Values>);

      return {
        value: _values[field],
        onChange,
      };
    },
    [_values, setFieldValue]
  );

  const setValues = useCallback<SetValues<Values>>((values) => {
    _setValues((current) => {
      const actualValues = typeof values === 'function' ? values(current) : values;
      return { ...current, ...actualValues };
    });
  }, []);

  const onSubmit = useCallback<OnSubmit<Values>>(
    (onSubmitHandler) => {
      return (e) => {
        e.preventDefault();
        onSubmitHandler(_values, e);
      };
    },
    [_values]
  );

  const onReset = useCallback<OnReset>(() => {
    _setValues({ ...valuesSnapshot });
  }, [valuesSnapshot]);

  return {
    values: _values,
    getInputProps,
    setValues,
    onSubmit,
    onReset,
  };
}
