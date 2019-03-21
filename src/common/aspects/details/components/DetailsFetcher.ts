import {useDispatch} from 'redux-react-hook';
import {FunctionComponent, useEffect} from 'react';
import {UseValue} from '../../../types/hooks';
import {IDetailsActions} from '../types';

export const createDetailsFetcher = <Entity extends object>(
  actions: IDetailsActions<Entity>,
  useDetailsId: UseValue<number>
): FunctionComponent => () => {
  const detailsId = useDetailsId();
  const dispatch = useDispatch();

  useEffect(() => {
    detailsId && dispatch(actions.fetch({ id: detailsId }));
  }, [detailsId]);

  return null;
};
