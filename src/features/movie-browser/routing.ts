import { useRouteParams } from '../../common/hooks/routing';

export const toMovieListPage = () => '/movies';
export const toMovieViewPage = (id = ':id') => `${toMovieListPage()}/${id}`;

export const useMovieId = () => {
  const params = useRouteParams();
  return params.id ? parseInt(params.id) : undefined;
};
