import React, {Context, createContext, FC, useContext} from 'react';

import {SummaryServices, useSummaryService} from './use-summary-service';

const SummaryContext = createContext<Nullable<SummaryServices>>(null);

export const useSummary = (): SummaryServices =>
  useContext<SummaryServices>(SummaryContext as Context<SummaryServices>);

export const SummaryProvider: FC = ({children}) => {
  const summaryService = useSummaryService();

  return <SummaryContext.Provider value={summaryService}>{children}</SummaryContext.Provider>;
};
