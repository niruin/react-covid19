import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const DEFAULT_CONFIG: AxiosRequestConfig = {
  baseURL: 'https://api.covid19api.com/',
};

function get<Req, Res>(url: string): Promise<Res> {
  const config: AxiosRequestConfig = {
    method: 'GET',
    ...DEFAULT_CONFIG,
  };

  return axios.get<Req, AxiosResponse<Res>>(url, config).then(({data}) => data);
}

const http = {
  get,
};

export default http;
