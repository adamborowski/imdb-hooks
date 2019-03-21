import React from 'react';
import { ListChildComponentProps } from 'react-window';
import { toMovieViewPage } from '../../../routing';
import { Assign } from 'utility-types';
import { IMovieLite } from '../../../types/state';
import DefaultListItem from '../../../../../common/components/antd/DefaultListItem';
import { getReleaseYear, getThumbUrl } from '../../../../../common/api';
import { Rate } from 'antd';
import { IListItem, IListItems } from '../../../../../common/aspects/list/types';

export function ListItem(props: Assign<ListChildComponentProps, { data: IListItems<IMovieLite> }>) {
  const { index, style, data } = props;

  const item = data[index] || ({ loading: true } as IListItem<IMovieLite>);

  const result: IMovieLite = item.result || ({} as IMovieLite);
  const loading = item.loading;

  return (
    <DefaultListItem
      avatar={getThumbUrl(result.poster_path)}
      style={style}
      to={toMovieViewPage((result.id && result.id.toString()) || '')}
      title={
        <>
          &#8203;{index + 1}. {result.title}
        </>
      }
      year={loading ? '...' : getReleaseYear(result.release_date)}
      popularity={loading ? '...' : result.popularity ? result.popularity.toFixed(2) : ''}
      description={
        <span>
          <Rate allowHalf style={{ fontSize: 15, marginRight: 3 }} value={result.vote_average} count={10} disabled />
          <strong>{result.vote_average}</strong> | {result.vote_count} votes
        </span>
      }
    />
  );
}
