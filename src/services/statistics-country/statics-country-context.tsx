import React, {Context, createContext, FC, useContext} from 'react';

import {StatisticsCountryServices, useStatisticsCountryService} from './use-statistics-country-service';

const StaticsCountryContext = createContext<Nullable<StatisticsCountryServices>>(null);

export const useStaticsCountry = (): StatisticsCountryServices =>
  useContext(StaticsCountryContext as Context<StatisticsCountryServices>);

export const StaticsCountryProvider: FC = ({children}) => {
  const staticsCountryServices = useStatisticsCountryService();

  return <StaticsCountryContext.Provider value={staticsCountryServices}>{children}</StaticsCountryContext.Provider>;
};
