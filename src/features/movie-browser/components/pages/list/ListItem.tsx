import React from 'react';
import {ListChildComponentProps} from 'react-window';
import {toMovieViewPage} from '../../../routing';
import {Assign} from 'utility-types';
import {IMovie, IMovieListItems} from '../../../types/state';
import DefaultListItem from '../../../../../common/components/antd/DefaultListItem';
import {getPosterUrl} from '../../../../../common/api';
import {CountryTags} from '../../../../../common/components/ContryTags';
import {Rate} from 'antd';

export function ListItem(props: Assign<ListChildComponentProps, { data: IMovieListItems }>) {
  const { index, style, data } = props;

  const item = data[index] || {};
  const result: IMovie = item.result || ({} as IMovie);

  return (
    <DefaultListItem
      avatar={getPosterUrl(result.poster_path)}
      style={style}
      to={toMovieViewPage((result.id && result.id.toString()) || '')}
      title={result.title}
      tags={<CountryTags countries={result.production_countries} />}
      description={
        <span>
          <Rate allowHalf style={{ fontSize: 15, marginRight: 3 }} value={result.vote_average} count={10} disabled />
          <strong>{result.vote_average}</strong> | {result.vote_count} votes
        </span>
      }
    />
  );
}
