export interface SummaryToCountry {
  ID: string;
  Country: string;
  CountryCode: string;
  Province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Date: string;
}

export type GetSummaryToCountry = SummaryToCountry[];

export interface SummaryToCountryChartUnit {
  ID: string;
  Date: string;
  Active: number;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  ConfirmedPerDay: number;
  DeathsPerDay: number;
  ConfirmedAvgOverWeek: number;
  DeathsAvgOverWeek: number;
}

export interface SummaryToCountryChartState {
  Country: string;
  CountryCode: string;
  data: SummaryToCountryChartUnit[];
}
