import {useQueryParams, useRouteParams, useSetQueryParams} from '../../common/misc';
import {useHistoryPush} from '../../common/hooks/useHistoryPush';

export const toMovieListPage = () => '/movies';
export const toMovieViewPage = (id = ':id') => `${toMovieListPage()}/${id}`;

export const useMovieId = (): number | undefined => {
  const params = useRouteParams();
  return params.id ? parseInt(params.id) : undefined;
};

export const useMovieSearchValue = () => useQueryParams().movies;
export const useMovieYear = () => {
  const queryParams = useQueryParams();
  return queryParams.year ? parseInt(queryParams.year) : undefined;
};

export const useSetMovieYear = () => {
  const setQP = useSetQueryParams();
  return (year?: number) => setQP({ year: year ? year.toString() : undefined });
};
export const useGoToMovieSearch = () => {
  const pushHistory = useHistoryPush();
  return (value?: string) => pushHistory(toMovieListPage(), { movies: value });
};
