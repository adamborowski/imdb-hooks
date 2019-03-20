import {ActionCreatorFactory} from 'typescript-fsa';
import {ApiResponse} from '../../api';
import {IListActions, PageRangeEnsurePayload} from './types';

export const createActions = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory
): IListActions<Entity> => {
  return {
    reset: actionCreatorFactory('LIST_RESET'),
    pageRangeEnsure: actionCreatorFactory<PageRangeEnsurePayload>('LIST_PAGE_DISPLAYED'),
    pageRequest: actionCreatorFactory<{ pages: number[] }>('LIST_PAGE_REQUEST'),
    pageCancel: actionCreatorFactory<{ pages: number[] }>('LIST_PAGE_CANCEL'),
    pageResponse: actionCreatorFactory<{ response: ApiResponse<Entity> }>('LIST_PAGE_RESPONSE'),
    pageError: actionCreatorFactory<{ page: number; error: string }>('LIST_PAGE_ERROR')
  };
};
