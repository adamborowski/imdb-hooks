import {createActions} from './actions';
import actionCreatorFactory from 'typescript-fsa';
import {createUsePaginatedList} from './hooks/usePaginatedList';

jest.mock('redux-react-hook');
jest.mock('react');
describe('hooks', () => {
  describe('usePaginatedList', () => {
    let dispatchMock: ReturnType<typeof jest.fn>;
    beforeEach(() => {
      dispatchMock = jest.fn();
      require('redux-react-hook').useDispatch = jest.fn(() => dispatchMock);
      require('redux-react-hook').useMappedState= jest.fn((selector) => selector());
      require('react').useCallback = (x: any) => x;
    });

    /*
  0 | 0  - 19
  1 | 20 - 39 (34: overscan start)
  2 | 40 - 59 (44: visible start)
  3 | 60 - 79 (53: visible stop) (63: overscan top)
  4 | 80 - 99

   */
    it('should calculate pages when no pages are loaded', () => {
      const {onItemsRendered} = createUsePaginatedList(
        createActions(actionCreatorFactory('test')),
        () => 2010,
        () => undefined,
        () => ({ total: 100, items: [] })
      )();
      onItemsRendered({ visibleStartIndex: 44, visibleStopIndex: 53 });

      expect(dispatchMock).toBeCalledWith(
        expect.objectContaining({ payload: expect.objectContaining({ pages: [1, 2, 3] }) })
      );
    });
  });
});
