interface SummaryGlobal {
  Date: string;
  NewConfirmed: string;
  NewDeaths: number;
  NewRecovered: number;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
}

export interface SummaryCountry {
  Country: string;
  CountryCode: string;
  Date: string;
  ID: string;
  NewConfirmed: string;
  NewDeaths: number;
  NewRecovered: number;
  Slug: string;
  TotalConfirmed: number;
  TotalDeaths: number;
  TotalRecovered: number;
  Premium?: any;
}

export interface GetSummaryResponse {
  Countries: SummaryCountry[];
  Date: string;
  Global: SummaryGlobal;
  ID: string;
  Message: string;
}

export type Summary = GetSummaryResponse;
