import { useHistoryPush } from './useHistoryPush';
import { UseSetValue, UseValue } from '../types/hooks';
import { useQueryParams } from './routing';

export const createUseSearchValue = (queryParamName: string): UseValue => () => useQueryParams()[queryParamName];
export const createUseGoToSearch = (route: string, queryParamName: string): UseSetValue => () => {
  const pushHistory = useHistoryPush();
  return (value?: string) => pushHistory(route, { [queryParamName]: value });
};
