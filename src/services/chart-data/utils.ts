import dayjs from 'dayjs';

import {
  GetSummaryToCountry,
  SummaryToCountry,
  SummaryToCountryChartState,
  SummaryToCountryChartUnit,
} from 'services/chart-data/types';

export function parseResponseToChardData(arr: GetSummaryToCountry): SummaryToCountryChartState {
  const summaryToCountry: SummaryToCountryChartState = {
    Country: arr[0].Country,
    CountryCode: arr[0].CountryCode,
    data: arr.map((item, index, array) => ({
      ID: item.ID,
      Date: dayjs(item.Date).format("D MMM 'YY"),
      Active: item.Active,
      Confirmed: item.Confirmed,
      Deaths: item.Deaths,
      Recovered: item.Recovered,
      ConfirmedPerDay: calculatedDataPerDay(index, item, array, 'Confirmed'),
      DeathsPerDay: calculatedDataPerDay(index, item, array, 'Deaths'),
      ConfirmedAvgOverWeek: 0,
      DeathsAvgOverWeek: 0,
    })),
  };

  function calculatedDataPerDay(
    index: number,
    item: SummaryToCountry,
    array: SummaryToCountry[],
    type: 'Confirmed' | 'Deaths',
  ): number {
    const result = index ? item[type] - array[index - 1][type] : item[type];
    return result < 0 ? 0 : result;
  }

  function calculatedAverageOverWeek(): SummaryToCountryChartUnit[] {
    const WEEK_NUM = 7;
    const data = summaryToCountry.data;
    const result: SummaryToCountryChartUnit[] = [];

    for (let i = data.length - 1; i >= 0; i--) {
      let avgConfirmedPerDay = 0;
      let avgDeathsPerDay = 0;
      if (i >= WEEK_NUM) {
        avgConfirmedPerDay =
          data.slice(i - WEEK_NUM + 1, i + 1).reduce((acc, val) => acc + val.ConfirmedPerDay, 0) / WEEK_NUM;
        avgDeathsPerDay =
          data.slice(i - WEEK_NUM + 1, i + 1).reduce((acc, val) => acc + val.DeathsPerDay, 0) / WEEK_NUM;
      }
      result[i] = {
        ...data[i],
        ConfirmedAvgOverWeek: Math.round(avgConfirmedPerDay),
        DeathsAvgOverWeek: Math.round(avgDeathsPerDay),
      };
    }

    return result;
  }

  return {
    ...summaryToCountry,
    data: calculatedAverageOverWeek(),
  };
}
