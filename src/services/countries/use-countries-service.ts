import {useState} from 'react';

import {Country, GetCountriesResponse} from 'services/countries/types';
import http from 'common/http';

export type CountriesServices = {
  countries: Country[];
  loading: boolean;
  error: boolean;
  getCountries: () => void;
  onSelectCountry: (slug: string) => void;
  onResetSelectedCounties: () => void;
};

export const useCountriesService = (): CountriesServices => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getCountries = async () => {
    if (error) setError(false);
    setLoading(true);

    try {
      const data = await http.get<never, GetCountriesResponse>('/countries');

      setCountries(data.map((v) => ({...v, selected: false})));
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCountry = (slug: string) => {
    const newList = countries.map((item) => {
      if (item.Slug === slug) {
        return {...item, selected: !item.selected};
      }

      return item;
    });

    setCountries(newList);
  };

  const handleResetSelectedCounties = () => {
    const resetSelected = countries.map((item) => (item.selected ? {...item, selected: false} : item));
    setCountries(resetSelected);
  };

  return {
    countries,
    loading,
    error,
    getCountries,
    onSelectCountry: handleSelectCountry,
    onResetSelectedCounties: handleResetSelectedCounties,
  };
};
