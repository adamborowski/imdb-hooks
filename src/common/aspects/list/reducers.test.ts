import { createReducers } from './reducers';
import { createActions } from './actions';
import actionCreatorFactory from 'typescript-fsa';

type Data = { x: string };
const data = (x: string): Data => ({ x });

describe('reducers', () => {
  const actions = createActions<Data>(actionCreatorFactory('test'));
  const reducer = createReducers<Data>(actions, 3);

  it('has proper default state', () => {
    expect(reducer(undefined, { type: '' })).toMatchObject({ items: [], total: null });
  });

  it('when page loads, all rows are marked as being loaded, when completes, all are marked as loaded and contain data', () => {
    const afterPagesRequest = reducer(undefined, actions.pageRequest({ pages: [0, 2] }));
    expect(afterPagesRequest).toMatchSnapshot();
    const afterPagesFirstResponse = reducer(
      afterPagesRequest,
      actions.pageResponse({
        response: { page: 2, total_results: 3000, total_pages: 1000, results: [data('d0'), data('d1'), data('d2')] }
      })
    );

    expect(afterPagesFirstResponse).toMatchSnapshot();
    expect(afterPagesFirstResponse.total).toBe(3000);
  });
  it('when page loads fails, all page rows are marked as error', () => {
    const afterPagesRequest = reducer(undefined, actions.pageError({ page: 2, error: 'test error' }));
    expect(afterPagesRequest).toMatchSnapshot();
  });
});
