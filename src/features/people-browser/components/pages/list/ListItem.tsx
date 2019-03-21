import React from 'react';
import { ListChildComponentProps } from 'react-window';
import { toPersonViewPage } from '../../../routing';
import { Assign } from 'utility-types';
import DefaultListItem from '../../../../../common/components/antd/DefaultListItem';
import { getThumbUrl } from '../../../../../common/api';
import { IListItem, IListItems } from '../../../../../common/aspects/list/types';
import { IPersonLite } from '../../../types/state';

export function ListItem(props: Assign<ListChildComponentProps, { data: IListItems<IPersonLite> }>) {
  const { index, style, data } = props;

  const item = data[index] || ({ loading: true } as IListItem<IPersonLite>);

  const result: IPersonLite = item.result || ({} as IPersonLite);
  const loading = item.loading;

  return (
    <DefaultListItem
      avatar={getThumbUrl(result.profile_path)}
      style={style}
      to={toPersonViewPage((result.id && result.id.toString()) || '')}
      title={
        <>
          &#8203;{index + 1}. {result.name}
        </>
      }
      popularity={loading ? '...' : result.popularity ? result.popularity.toFixed(2) : ''}
    />
  );
}
