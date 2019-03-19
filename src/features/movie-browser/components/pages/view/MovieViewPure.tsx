import {IMovie} from '../../../types/state';
import React, {FunctionComponent} from 'react';
import {withFading} from '../../../../../common/misc';
import {getPosterUrl} from '../../../../../common/api';
import {Form, Rate, Tag, Typography} from 'antd';
import {FormProps} from 'antd/es/form';
import {formItemLayout} from '../../../../../common/layout-props';
import styled from 'styled-components';
import {CountryTags} from '../../../../../common/components/ContryTags';

const { Text } = Typography;

export interface MovieViewPureProps extends FormProps {
  entity?: IMovie;
}

const MovieViewPure: FunctionComponent<MovieViewPureProps> = ({ entity, ...rest }) => {
  const {
    poster_path,
    backdrop_path,
    genres,
    title,
    tagline,
    production_countries,
    id,
    overview,
    popularity,
    release_date,
    vote_average,
    vote_count
  } = entity || ({} as IMovie);
  return (
    <Form {...rest} labelAlign="left" layout="horizontal">
      <Form.Item label="Tagline" {...formItemLayout}>
        {<Typography>{tagline}</Typography> || <em>No tagline specified</em>}
      </Form.Item>
      <Form.Item label="Genres" {...formItemLayout}>
        {genres &&
          genres.map(value => (
            <Tag color={'#49be80'} key={value.id}>
              {value.name}
            </Tag>
          ))}
      </Form.Item>

      <Form.Item label="Countries" {...formItemLayout}>
        <CountryTags countries={production_countries}/>
      </Form.Item>
      <Form.Item label="Rank" {...formItemLayout}>
        <Rate allowHalf style={{ marginRight: 3 }} value={vote_average} count={10} disabled />
        <strong>{vote_average}</strong> | {vote_count} votes
      </Form.Item>

      <Form.Item label="Popularity" {...formItemLayout}>
        {popularity}
      </Form.Item>
      <Form.Item label="Release date" {...formItemLayout}>
        <Text>{release_date}</Text>
      </Form.Item>
      <Form.Item label="Description" {...formItemLayout}>
        <Text>{overview}</Text>
      </Form.Item>

      <Form.Item label="Media" {...formItemLayout}>
        <img src={getPosterUrl(poster_path)} />
        <img src={getPosterUrl(backdrop_path)} />
      </Form.Item>
    </Form>
  );
};

export default withFading<MovieViewPureProps>(false)(styled(MovieViewPure)`
  .ant-typography {
    margin-top: 10px;
    line-height: 22px;
    display: inline-block;
    text-align: justify;
  }

  .ant-row {
    margin: 0 0 4px;
  }

  img {
    margin-top: 10px;
    width: auto;
    height: 100px;
    border-radius: 4px;
    margin-right: 10px;
  }
`);
