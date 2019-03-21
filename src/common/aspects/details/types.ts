import { ActionCreator } from 'typescript-fsa';

export interface IDetailsActions<Entity> {
  fetch: ActionCreator<{ id: number }>;
  fetchComplete: ActionCreator<{ result: Entity }>;
  fetchError: ActionCreator<{ error: string }>;
}

export interface IDetailsState<Entity> {
  loading: boolean;
  error?: string;
  result?: Entity;
}

export type SelectDetailsState<E> = (state: any) => IDetailsState<E>;
