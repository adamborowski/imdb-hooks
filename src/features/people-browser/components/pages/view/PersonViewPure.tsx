import {IPerson} from '../../../types/state';
import React, {FunctionComponent} from 'react';
import {withFading} from '../../../../../common/misc';
import {getPosterUrl} from '../../../../../common/api';
import {Form, Typography} from 'antd';
import {FormProps} from 'antd/es/form';
import {formItemLayout} from '../../../../../common/layout-props';
import styled from 'styled-components';

const { Text } = Typography;

export interface PersonViewPureProps extends FormProps {
  entity?: IPerson;
}

const PersonViewPure: FunctionComponent<PersonViewPureProps> = ({ entity, ...rest }) => {
  const get = <X extends keyof IPerson>(field: X): IPerson[X] | undefined => entity && entity[field];

  return (
    <Form {...rest} labelAlign="left" layout="horizontal">
      {/*<Form.Item label="Tagline" {...formItemLayout}>*/}
      {/*{<Typography>{get('tagline')}</Typography> || <em>No tagline specified</em>}*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="Genres" {...formItemLayout}>*/}
      {/*{(get('genres') || []).map(value => (*/}
      {/*<Tag color={'#49be80'} key={value.id}>*/}
      {/*{value.name}*/}
      {/*</Tag>*/}
      {/*))}*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="Countries" {...formItemLayout}>*/}
      {/*<CountryTags countries={get('production_countries')} />*/}
      {/*</Form.Item>*/}
      {/*<Form.Item label="Rank" {...formItemLayout}>*/}
      {/*<Rate allowHalf style={{ marginRight: 3 }} value={get('vote_average')} count={10} disabled />*/}
      {/*<strong>{get('vote_average')}</strong> | {get('vote_count')} votes*/}
      {/*</Form.Item>*/}
      <Form.Item label="Popularity" {...formItemLayout}>
        {get('popularity')}
      </Form.Item>
      <Form.Item label="Birth" {...formItemLayout}>
        <Text>{get('birthday')}</Text>,<Text>{get('place_of_birth')}</Text>
      </Form.Item>
      <Form.Item label="Biography" {...formItemLayout}>
        <Text>{get('biography')}</Text>
      </Form.Item>
      <Form.Item label="Media" {...formItemLayout}>
        <img src={getPosterUrl(get('profile_path'))} />
        {/*<img src={getPosterUrl(get('backdrop_path'))} />*/}
      </Form.Item>
    </Form>
  );
};

export default withFading<PersonViewPureProps>(false)(styled(PersonViewPure)`
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
