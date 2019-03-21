import { ApiResponse } from '../../api';
import { ActionCreator } from 'typescript-fsa';
import { ReactNode } from 'react';
import { createUseSearchOptions } from './hooks/useSearchOptions';

export interface ITypeAheadActions<Entity> {
  typeOccured: ActionCreator<{ value: string | undefined }>;
  typeResponse: ActionCreator<{ value: ApiResponse<Entity> }>;
}

export interface ITypeAheadState<Entity> {
  options: ApiResponse<Entity>;
  loading: boolean;
}

export type ItemRenderer<Entity> = (item: Entity) => ReactNode;

export type SelectTypeAheadState<E> = (state: any) => ITypeAheadState<E>;

export type UseSearchOptions = ReturnType<typeof createUseSearchOptions>;
export type ToViewPage = (id?: string) => string;
