import {useState} from 'react';

import http from 'common/http';
import {GetSummaryResponse, Summary} from 'services/summary/types';

export type SummaryServices = {
  summary: Nullable<Summary>;
  getSummary: () => void;
};

export const useSummaryService = (): SummaryServices => {
  const [summary, setSummary] = useState<Nullable<Summary>>(null);

  const getSummary = async () => {
    const data = await http.get<never, GetSummaryResponse>('/summary');

    setSummary(data);
  };

  return {
    summary,
    getSummary,
  };
};
