import {__RouterContext} from 'react-router';
import {useContext} from 'react';

export function useParams<T>(): T {
  const context = useContext(__RouterContext);
  return context.match.params as T;
}
