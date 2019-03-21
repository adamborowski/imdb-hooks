import { IMovie } from '../../../types/state';
import React, { FunctionComponent } from 'react';
import { getPosterUrl } from '../../../../../common/api';
import { Form, Icon, Rate, Tag, Typography } from 'antd';
import { FormProps } from 'antd/es/form';
import { formItemLayout } from '../../../../../common/layout-props';
import styled from 'styled-components';
import { CountryTags } from '../../../../../common/components/CountryTags';
import { ImageThumbnail } from '../../../../../common/components/ImageThumbnail';
import withFading from '../../../../../common/components/withFading';

const { Text } = Typography;

export interface MovieViewPureProps extends FormProps {
  entity?: IMovie;
}

const MovieViewPure: FunctionComponent<MovieViewPureProps> = ({ entity, ...rest }) => {
  const get = <X extends keyof IMovie>(field: X): IMovie[X] | undefined => entity && entity[field];

  const poster = get('poster_path');
  const backdrop = get('backdrop_path');
  return (
    <Form {...rest} labelAlign="left" layout="horizontal">
      <Form.Item label="Tagline" {...formItemLayout}>
        {<Typography>{get('tagline')}</Typography> || <em>No tagline specified</em>}
      </Form.Item>
      <Form.Item label="Genres" {...formItemLayout}>
        {(get('genres') || []).map(value => (
          <Tag color={'#49be80'} key={value.id}>
            {value.name}
          </Tag>
        ))}
      </Form.Item>
      <Form.Item label="Countries" {...formItemLayout}>
        <CountryTags countries={get('production_countries')} />
      </Form.Item>
      <Form.Item label="Rank" {...formItemLayout}>
        <Rate allowHalf style={{ marginRight: 3 }} value={get('vote_average')} count={10} disabled />
        <strong>{get('vote_average')}</strong> | {get('vote_count')} votes
      </Form.Item>
      <Form.Item label="Popularity" {...formItemLayout}>
        <Icon type="like" theme="filled" /> {get('popularity')}
      </Form.Item>
      <Form.Item label="Release date" {...formItemLayout}>
        <Text>{get('release_date')}</Text>
      </Form.Item>
      <Form.Item label="Description" {...formItemLayout}>
        <Text>{get('overview')}</Text>
      </Form.Item>
      {(poster || backdrop) && (
        <Form.Item label="Media" {...formItemLayout}>
          {poster && <ImageThumbnail src={getPosterUrl(poster)} />}
          {backdrop && <ImageThumbnail src={getPosterUrl(backdrop)} />}
        </Form.Item>
      )}
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
    margin-right: 10px;
  }
`);
