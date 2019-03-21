import { IList, IListActions, IListItems } from './types';
import { combineReducers, Reducer } from 'redux';
import { PAGE_SIZE } from '../../common/api';

export const createReducers = <Entity extends object>(actions: IListActions<Entity>, pageSize = PAGE_SIZE) => {
  const total: Reducer<number | null> = (state = null, action) => {
    if (actions.pageResponse.match(action)) {
      return action.payload.response.total_results;
    }
    if (actions.reset.match(action)) {
      return null;
    }
    return state;
  };

  const mapPageOntoList = <T extends any, U extends any>(
    state: U[],
    page: number,
    results: T[],
    map: (item: T, index: number, localIndex: number, oldItem: U) => U
  ) => {
    const newState = [...state];
    const offset = page * pageSize;
    results.forEach(
      (movie, index) => (newState[index + offset] = map(movie, index + offset, index, newState[index + offset]))
    );
    return newState;
  };

  const items: Reducer<IListItems<Entity>> = (state: IListItems<Entity> = [], action) => {
    if (actions.pageRequest.match(action)) {
      return action.payload.pages.reduce(
        (tmpState, page) =>
          mapPageOntoList(tmpState, page, new Array(pageSize).fill(undefined), () => ({
            loading: true,
            error: undefined,
            result: undefined
          })),
        state
      );
    }
    if (actions.pageCancel.match(action)) {
      return action.payload.pages.reduce(
        (tmpState, page) =>
          mapPageOntoList(tmpState, page, new Array(pageSize).fill(undefined), (result, index, localIndex, item) =>
            item && item.loading ? undefined : item
          ),
        state
      );
    }

    if (actions.pageResponse.match(action)) {
      return mapPageOntoList(state, action.payload.response.page, action.payload.response.results, item => ({
        loading: false,
        error: undefined,
        result: item
      }));
    }
    if (actions.pageError.match(action)) {
      return mapPageOntoList(state, action.payload.page, new Array(pageSize).fill(undefined), () => ({
        loading: false,
        error: action.payload.error,
        result: undefined
      }));
    }
    if (actions.reset.match(action)) {
      return [];
    }
    return state;
  };

  return combineReducers<IList<Entity>>({ items, total });
};
