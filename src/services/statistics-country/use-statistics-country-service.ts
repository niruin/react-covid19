import {useState} from 'react';

import http from 'common/http-rapid';

export interface StatisticsCountry {
  continent: string;
  country: string;
  population: number;
  cases: {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    '1M_pop': string;
    total: string;
  };
  deaths: {
    new: string;
    '1M_pop': string;
    total: number;
  };
  tests: {
    '1M_pop': string;
    total: number;
  };
  day: string;
  time: string;
}

export interface ResponseStatisticsCountry {
  get: string;
  parameters: {
    country: string;
  };
  errors: [];
  result: number;
  response: StatisticsCountry[];
}

export type StatisticsCountryServices = {
  stat: Nullable<StatisticsCountry>;
  loading: boolean;
  error: boolean;
  getStat: (country: string) => void;
};

export const useStatisticsCountryService = (): StatisticsCountryServices => {
  const [stat, setStat] = useState<Nullable<StatisticsCountry>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getStat = async (country: string) => {
    setLoading(true);
    try {
      const data = await http.get<{country: string}, ResponseStatisticsCountry>('statistics', {
        country: country,
      });
      setStat(data.response[0]);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    stat,
    loading,
    error,
    getStat,
  };
};
