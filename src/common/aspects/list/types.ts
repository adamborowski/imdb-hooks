import { ApiResponse } from '../../api';
import { ActionCreator } from 'typescript-fsa';

export interface IListItem<T> {
  loading: boolean;
  result?: T;
  error?: string;
}

export interface IList<Entity> {
  items: IListItems<Entity>;
  total: number | null;
}
export type IListItems<T> = (IListItem<T> | undefined)[];
export type PageRangeEnsurePayload = {
  startPage: number;
  stopPage: number;
  query?: string;
  year?: number;
};
export type IListActions<Entity extends object> = {
  pageRangeEnsure: ActionCreator<PageRangeEnsurePayload>;
  pageError: ActionCreator<{ page: number; error: string }>;
  reset: ActionCreator<void>;
  pageCancel: ActionCreator<{ pages: number[] }>;
  pageResponse: ActionCreator<{ response: ApiResponse<Entity> }>;
  pageRequest: ActionCreator<{ pages: number[] }>;
};

export type UseYear = () => number | undefined;
export type UseSetYear = () => (value?: number) => void;
export type SelectList<Entity> = (state: any) => IList<Entity>;
