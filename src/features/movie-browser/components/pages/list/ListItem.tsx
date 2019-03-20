import React from 'react';
import {ListChildComponentProps} from 'react-window';
import {toMovieViewPage} from '../../../routing';
import {Assign} from 'utility-types';
import {IMovie, IMovieListItem, IMovieListItems} from '../../../types/state';
import DefaultListItem from '../../../../../common/components/antd/DefaultListItem';
import {getPosterUrl, getReleaseYear} from '../../../../../common/api';
import {Rate} from 'antd';

export function ListItem(props: Assign<ListChildComponentProps, { data: IMovieListItems }>) {
  const { index, style, data } = props;

  const item = data[index] || ({loading: true } as IMovieListItem);

  const result: IMovie = item.result || ({ } as IMovie);
  const loading = item.loading;

  return (
    <DefaultListItem
      avatar={getPosterUrl(result.poster_path)}
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
