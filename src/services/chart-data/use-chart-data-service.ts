import {useState} from 'react';

import http from 'common/http';
import {GetSummaryToCountry, SummaryToCountryChartState} from 'services/chart-data/types';

import {parseResponseToChardData} from './utils';

export type ChartDataStatService = {
  chartData: Nullable<SummaryToCountryChartState>;
  loading: boolean;
  error: boolean;
  getDayOneStat: (country: string) => void;
};

export const useChartDataService = (): ChartDataStatService => {
  const [chartData, setChartData] = useState<Nullable<SummaryToCountryChartState>>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getDayone = async (country = 'ru') => {
    if (error) setError(false);
    setLoading(true);

    try {
      const url = `/dayone/country/${country}`;
      const data = await http.get<never, GetSummaryToCountry>(url);

      const formattedData = parseResponseToChardData(data);
      setChartData(formattedData);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    chartData: chartData,
    loading,
    error,
    getDayOneStat: getDayone,
  };
};
