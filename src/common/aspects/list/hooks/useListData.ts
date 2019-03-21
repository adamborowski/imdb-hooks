import { IListActions, SelectList } from '../types';
import { useMappedState } from 'redux-react-hook';
import { UseValue } from '../../../types/hooks';

export const createUseListData = <Entity extends object>(
  action: IListActions<Entity>,
  useSearchValue: UseValue,
  selectList: SelectList<Entity>
) => () => {
  const query = useSearchValue();
  const { total, items } = useMappedState(selectList);
  return { total, items, query };
};
