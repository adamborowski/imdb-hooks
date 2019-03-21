import {detailsAspect} from '../../../aspects';
import {Avatar, Card, Icon, List} from 'antd';
import React, {HTMLProps} from 'react';
import {ICast, ICrew} from '../../../types/state';
import {getPosterUrl, getThumbUrl} from '../../../../../common/api';
import {QueryLink} from '../../../../../common/hooks/useHistoryPush';
import {toMovieViewPage} from '../../../../movie-browser/routing';
import _ from 'lodash';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {ImageThumbnail} from '../../../../../common/components/ImageThumbnail';

interface IconTextProps extends HTMLProps<HTMLDivElement> {
  type: string;
  text: string;
}

const IconText = ({ type, text, ...rest }: IconTextProps) => (
  <span {...rest}>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
export const Movies = () => {
  const { result, loading } = detailsAspect.useDetails();

  const movies = result ? [...result.movie_credits.cast, ...result.movie_credits.crew] : [];

  return loading ? (
    <InlineSpinner />
  ) : (
    <Card>
      <List
        itemLayout="vertical"
        dataSource={movies}
        renderItem={(cast: ICast & ICrew) => (
          <List.Item
            key={cast.id.toString()}
            actions={[
              <IconText type="like-o" title="Popularity" text={cast.popularity.toFixed(2)} />,
              <IconText type="star-o" title="Rank" text={cast.vote_average.toFixed(2)} />,
              <IconText type="clock-circle" title="Release date" text={cast.release_date} />
            ]}
            extra={<ImageThumbnail height={153} alt="logo" src={getPosterUrl(cast.poster_path)} />}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" src={getThumbUrl(cast.backdrop_path)} />}
              title={<QueryLink to={toMovieViewPage(cast.id.toString())}>{cast.title}</QueryLink>}
              description={<>{_.compact([cast.department, cast.job]).join(', ')}</>}
            />
            {cast.overview}
          </List.Item>
        )}
      />
    </Card>
  );
};
