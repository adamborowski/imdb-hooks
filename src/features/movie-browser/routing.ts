import {useQueryParams, useSetQueryParams} from '../../common/misc';
import {useHistoryPush} from '../../common/hooks/useHistoryPush';

export const toMovieListPage = () => '/movies';
export const toMovieViewPage = (id = ':id') => `${toMovieListPage()}/${id}`;

export const useMovieSearchValue = () => useQueryParams().movies;
export const useSetMovieSearchValue = () => {
  const setSearchParams = useSetQueryParams();
  return (movies?: string) => setSearchParams({ movies: movies === '' ? undefined : movies });
};

export const useGoToMovieSearch = () => {
  const pushHistory = useHistoryPush();
  return (value?: string) => pushHistory(toMovieListPage(), { movies: value });
};
