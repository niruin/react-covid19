import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: 'https://covid-193.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': 'fdea477ca9mshef6edd73323fff4p15dd89jsne7d4a1f5261f',
    'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
  },
};

function get<Req, Res>(url: string, params?: Req): Promise<Res> {
  const config: AxiosRequestConfig = {
    ...DEFAULT_CONFIG,
    method: 'GET',
    params: params,
  };

  return axios.get<Req, AxiosResponse<Res>>(url, config).then(({data}) => data);
}

const http = {
  get,
};

export default http;
