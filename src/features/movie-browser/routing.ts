import {useQueryParams, useRouteParams} from '../../common/misc';
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
  return parseInt(queryParams.year);
};
export const useGoToMovieSearch = () => {
  const pushHistory = useHistoryPush();
  return (value?: string) => pushHistory(toMovieListPage(), { movies: value });
};
