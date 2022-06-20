import React, {Context, createContext, FC, useContext} from 'react';

import {CountriesServices, useCountriesService} from './use-countries-service';

const CountriesContext = createContext<Nullable<CountriesServices>>(null);

export const useCountries = (): CountriesServices => useContext(CountriesContext as Context<CountriesServices>);

export const CountriesProvider: FC = ({children}) => {
  const countriesServices = useCountriesService();

  return <CountriesContext.Provider value={countriesServices}>{children}</CountriesContext.Provider>;
};
