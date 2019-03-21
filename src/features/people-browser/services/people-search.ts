import {ApiResponse, FindService, getApiUrl, GetService, PopularService} from '../../../common/api';
import {ajax} from 'rxjs/ajax';
import {map} from 'rxjs/operators';
import {IPerson, IPersonLite} from '../types/state';

const shiftPageNumber = <T extends ApiResponse<any>>(response: T): T => {
  return { ...response, page: response.page - 1 };
};

export const findPeople: FindService<IPersonLite> = (query, page = 0, year) =>
  ajax(
    getApiUrl('search/person', {
      page: (page + 1).toString(),
      query
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const findPopularPeople: PopularService<IPersonLite> = (page = 0) =>
  ajax(
    getApiUrl('person/popular', {
      page: (page + 1).toString()
    })
  ).pipe(map(value => shiftPageNumber(value.response)));

export const getPerson: GetService<IPerson> = id =>
  ajax(getApiUrl(`person/${id}`, {})).pipe(map(value => shiftPageNumber(value.response)));
