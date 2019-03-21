import { UseSetYear, UseYear } from './types';
import { useQueryParams, useSetQueryParams } from '../../common/hooks/routing';

export const createUseYear = (queryParamName: string): UseYear => () => {
  const queryParams = useQueryParams();
  return queryParams[queryParamName] ? parseInt(queryParams[queryParamName]) : undefined;
};

export const createUseSetYear = (queryParamName: string): UseSetYear => () => {
  const setQP = useSetQueryParams();
  return (value?: number) => setQP({ [queryParamName]: value ? value.toString() : undefined });
};
