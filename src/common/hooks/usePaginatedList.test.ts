import {usePaginatedList} from './usePaginatedList';

jest.mock('redux-react-hook');
jest.mock('react');

describe('usePaginatedList', () => {
  let dispatchMock: ReturnType<typeof jest.fn>;
  beforeEach(() => {
    dispatchMock = jest.fn();
    require('redux-react-hook').useDispatch = jest.fn(() => dispatchMock);
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
    const onRowsRendered = usePaginatedList([], 100);
    onRowsRendered({ visibleStartIndex: 44, visibleStopIndex: 53 });

    expect(dispatchMock).toBeCalledWith(
      expect.objectContaining({ payload: expect.objectContaining({ pages: [1, 2, 3] }) })
    );
  });
});
