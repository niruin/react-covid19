import React from 'react';

export type Indexed<T = any> = {
  [key: string]: T;
};

export type Option<T = any> = {
  label: string;
  value: T;
  labelShort?: string;
};

export type OrderType = 'asc' | 'desc' | boolean;

export interface IOrder {
  fieldName?: string;
  type?: OrderType;
}

export type Options<T = any> = Option<T>[];

export type Routes = {
  path: string;
  exact: boolean;
  component?: ReturnType<typeof React.lazy>;
}[];

export type NavLinks = {
  path: string;
  label: string;
  i18key: string;
  exact?: boolean;
}[];

export type AvailableLanguages = {
  lang: string;
  shortName: string;
  nativeName: string;
};

export type Theme = 'light' | 'dark';
