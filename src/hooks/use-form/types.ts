import React from 'react';

export type SetValues<Values> = (
  values: Values | ((currentValues: Values) => Values)
) => void;

export interface UseFormInput<Values> {
  initialValues: Values;
}

export type LooseKeys<Values> = keyof Values;

// TODO: handle types more specifically
export interface GetInputPropsReturnType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
}

export type Field<Values> = LooseKeys<Values>;

export type FieldValue<Values> = Values[keyof Values];

// export type SupportedInputTypes = 'text' | 'file' | 'email' | 'password';

export type GetInputProps<Values> = (field: Field<Values>) => GetInputPropsReturnType;

export interface FormProps<Values> {
  onSubmit: (values: Values) => void;
  onReset: (values: Values) => void;
}

export type SetFieldValue<Values> = (
  field: Field<Values>,
  value: FieldValue<Values>
) => void;

export type InputOnChange<Values> = (field: Field<Values>) => void;

export type OnSubmitHandler<Values> = (
  values: Values,
  e: React.FormEvent<HTMLFormElement>
) => void;

export type OnSubmit<Values> = (
  onSubmitHandler: OnSubmitHandler<Values>
) => (e: React.FormEvent<HTMLFormElement>) => void;

export type OnReset = (e: React.FormEvent<HTMLFormElement>) => void;

export interface UseFormReturnType<Values> {
  values: Values;
  getInputProps: GetInputProps<Values>;
  setValues: SetValues<Values>;
  onSubmit: OnSubmit<Values>;
  onReset: OnReset;
}
