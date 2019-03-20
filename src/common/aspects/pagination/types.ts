import {Observable} from 'rxjs';
import {ApiResponse} from '../../api';
import {ActionCreator} from 'typescript-fsa';

export type FindService<Entity> = (query: string, page?: number, year?: number) => Observable<ApiResponse<Entity>>;
export type PopularService<Entity> = (page?: number) => Observable<ApiResponse<Entity>>;

export interface IListItem<T> {
  loading: boolean;
  result?: T;
  error?: string;
}

export interface IPagination<Entity> {
  items: IListItems<Entity>;
  total: number | null;
}
export type IListItems<T> = (IListItem<T> | undefined)[];
export type SelectItems<T> = (state: any) => IListItems<T>;
export type PageRangeEnsurePayload = {
  startPage: number;
  stopPage: number;
  query?: string;
  year?: number;
};
export type PaginationActions<Entity extends object> = {
  pageRangeEnsure: ActionCreator<PageRangeEnsurePayload>;
  pageError: ActionCreator<{ page: number; error: string }>;
  reset: ActionCreator<void>;
  pageCancel: ActionCreator<{ pages: number[] }>;
  pageResponse: ActionCreator<{ response: ApiResponse<Entity> }>;
  pageRequest: ActionCreator<{ pages: number[] }>;
};