import { useRouteParams } from '../../common/hooks/routing';

export const toPersonListPage = () => '/people';
export const toPersonViewPage = (id = ':id') => `${toPersonListPage()}/${id}`;

export const usePersonId = () => {
  const params = useRouteParams();
  return params.id ? parseInt(params.id) : undefined;
};

export const toPersonMovies = (id: string = ':id') => `${toPersonViewPage(id)}/movies`;
