import {combineReducers, Reducer} from 'redux';
import {ApiResponse, IMovie, IMovieBrowser, IMovieDetails, IMovieList, IMovieListItems} from '../types/state';
import {isType} from 'typescript-fsa';
import {
    movieDetailsFetch,
    movieDetailsFetchComplete,
    movieListPageCancel,
    movieListPageError,
    movieListPageRequest,
    movieListPageResponse,
    movieListReset,
    movieSearchOptionsType,
    movieSearchOptionsTypeResponse
} from './actions';
import {PAGE_SIZE} from '../../../common/api';

export const searchOptions: Reducer<ApiResponse<IMovie>> = (
  state = { results: [], page: 0, total_pages: 0, total_results: 0 },
  action
) => {
  if (isType(action, movieSearchOptionsTypeResponse)) {
    return { ...state, ...action.payload.value };
  }
  return state;
};

export const searchOptionsLoading: Reducer<boolean> = (state = false, action) => {
  if (isType(action, movieSearchOptionsType)) {
    return true;
  }
  if (isType(action, movieSearchOptionsTypeResponse)) {
    return false;
  }
  return state;
};

export const details: Reducer<IMovieDetails> = (state = { loading: false }, action) => {
  if (movieDetailsFetch.match(action)) {
    return { loading: true, error: undefined, result: undefined };
  }
  if (movieDetailsFetchComplete.match(action)) {
    return { loading: false, error: undefined, result: action.payload.result };
  }
  return state;
};

export const total: Reducer<number | null> = (state = null, action) => {
  if (movieListPageResponse.match(action)) {
    return action.payload.response.total_results;
  }
  if (movieListReset.match(action)) {
    return null;
  }
  return state;
};

const mapPageOntoList = <T extends any, U extends any>(
  state: U[],
  page: number,
  results: T[],
  map: (item: T, index: number, localIndex: number, oldItem: U) => U,
  pageSize: number = PAGE_SIZE
) => {
  const newState = [...state];
  const offset = page * pageSize;
  results.forEach(
    (movie, index) => (newState[index + offset] = map(movie, index + offset, index, newState[index + offset]))
  );
  return newState;
};

export const items: Reducer<IMovieListItems> = (state: IMovieListItems = [], action) => {
  if (movieListPageRequest.match(action)) {
    return action.payload.pages.reduce(
      (tmpState, page) =>
        mapPageOntoList(tmpState, page, new Array(PAGE_SIZE).fill(undefined), () => ({
          loading: true,
          error: undefined,
          result: undefined
        })),
      state
    );
  }
  if (movieListPageCancel.match(action)) {
    return action.payload.pages.reduce(
      (tmpState, page) =>
        mapPageOntoList(tmpState, page, new Array(PAGE_SIZE).fill(undefined), (result, index, localIndex, item) =>
          item && item.loading ? undefined : item
        ),
      state
    );
  }

  if (movieListPageResponse.match(action)) {
    return mapPageOntoList(state, action.payload.response.page, action.payload.response.results, item => ({
      loading: false,
      error: undefined,
      result: item
    }));
  }
  if (movieListPageError.match(action)) {
    return mapPageOntoList(state, action.payload.page, new Array(PAGE_SIZE).fill(undefined), item => ({
      loading: false,
      error: action.payload.error,
      result: undefined
    }));
  }
  if (movieListReset.match(action)) {
    return [];
  }
  return state;
};

export const list: Reducer<IMovieList> = combineReducers({ items, total });

export default combineReducers<IMovieBrowser>({
  searchOptions,
  searchOptionsLoading,
  details,
  list
});
