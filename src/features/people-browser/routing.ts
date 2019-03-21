import {useRouteParams} from '../../common/misc';

export const toPersonListPage = () => '/people';
export const toPersonViewPage = (id = ':id') => `${toPersonListPage()}/${id}`;

export const usePersonId = () => {
  const params = useRouteParams();
  return params.id ? parseInt(params.id) : undefined;
};
