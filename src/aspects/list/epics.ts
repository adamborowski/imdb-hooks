import { Epic } from 'redux-observable';
import _ from 'lodash';
import { catchError, debounce, filter, map, mergeMap, skip, take } from 'rxjs/operators';
import { concat, merge, of, race, timer } from 'rxjs';
import { FindService, PAGE_SIZE, PopularService } from '../../common/api';
import { IListActions, IListItems, SelectList } from './types';

export const createEpics = <Entity extends object>(
  actions: IListActions<Entity>,
  findService: FindService<Entity>,
  popularService: PopularService<Entity>,
  selectList: SelectList<Entity>
): Epic => {
  const selectPageNeedsToBeLoaded$ = (items: IListItems<Entity>, page: number) => {
    const firstInPage = page * PAGE_SIZE;
    const item = items[firstInPage];
    return item === undefined || item.error !== undefined;
  };

  const getFetchPageAction = (requestAction: ReturnType<typeof actions.pageRangeEnsure>, page: number) =>
    requestAction.payload.query
      ? findService(requestAction.payload.query, page, requestAction.payload.year)
      : popularService(page);

  const requestAllPages = (pages: number[], ensureAction: ReturnType<typeof actions.pageRangeEnsure>) =>
    merge(
      ...pages.map(page =>
        getFetchPageAction(ensureAction, page).pipe(
          map(response => actions.pageResponse({ response })),
          catchError(err => of(actions.pageError({ page, error: err })))
        )
      )
    );

  return (action$, state$) => {
    const pagesToLoad$ = action$.pipe(filter(actions.pageRangeEnsure.match));

    return pagesToLoad$.pipe(
      debounce(() => timer(100)),
      mergeMap(ensureAction => {
        const data = selectList(state$.value).items;
        const pagesToLoad = _.range(ensureAction.payload.startPage, ensureAction.payload.stopPage + 1, 1).filter(page =>
          selectPageNeedsToBeLoaded$(data, page)
        );
        return concat(
          of(actions.pageRequest({ pages: pagesToLoad })),
          race(
            requestAllPages(pagesToLoad, ensureAction),
            pagesToLoad$.pipe(
              skip(1), // fixme effectively disables cancellation, problem needs to be investigated before turning cancellation on back again
              // maybe not use redux at all, just store some download cache info?
              take(1),
              map(() => actions.pageCancel({ pages: pagesToLoad }))
            ),
            action$.pipe(
              filter(actions.reset.match),
              take(1),
              map(() => actions.pageCancel({ pages: pagesToLoad }))
            )
          )
        );
      })
    );
  };
};
