interface CountryResponse {
  Country: string;
  Slug: string;
  ISO2: string;
}

export interface ListCountriesState {
  countries: Country[];
  loading: boolean;
  error: boolean;
}

export type GetCountriesResponse = CountryResponse[];

export type Country = CountryResponse & {
  selected: boolean;
};
