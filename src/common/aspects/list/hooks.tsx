import {UseGoToSearch, UseSearchValue, UseSetYear, UseYear} from './types';
import {useQueryParams, useSetQueryParams} from '../../misc';
import {useHistoryPush} from '../../hooks/useHistoryPush';

export const createUseYear = (queryParamName: string): UseYear => () => {
  const queryParams = useQueryParams();
  return queryParams[queryParamName] ? parseInt(queryParams[queryParamName]) : undefined;
};

export const createUseSearchValue = (queryParamName: string): UseSearchValue => () => useQueryParams()[queryParamName];

export const createUseSetYear = (queryParamName: string): UseSetYear => () => {
  const setQP = useSetQueryParams();
  return (value?: number) => setQP({ [queryParamName]: value ? value.toString() : undefined });
};
export const createUseGoToSearch = (route: string, queryParamName: string): UseGoToSearch => () => {
  const pushHistory = useHistoryPush();
  return (value?: string) => pushHistory(route, { [queryParamName]: value });
};
