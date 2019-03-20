import {ActionCreatorFactory} from 'typescript-fsa';
import {IListActions} from './types';

export const createActions = <Entity extends object>(
  actionCreatorFactory: ActionCreatorFactory
): IListActions<Entity> => ({
    reset: actionCreatorFactory('LIST_RESET'),
    pageRangeEnsure: actionCreatorFactory('LIST_PAGE_DISPLAYED'),
    pageRequest: actionCreatorFactory('LIST_PAGE_REQUEST'),
    pageCancel: actionCreatorFactory('LIST_PAGE_CANCEL'),
    pageResponse: actionCreatorFactory('LIST_PAGE_RESPONSE'),
    pageError: actionCreatorFactory('LIST_PAGE_ERROR')
});
