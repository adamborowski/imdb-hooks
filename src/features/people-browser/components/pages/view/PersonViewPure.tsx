import {IPerson} from '../../../types/state';
import React, {FunctionComponent} from 'react';
import {withFading} from '../../../../../common/misc';
import {getPosterUrl} from '../../../../../common/api';
import {Form, Icon, Typography} from 'antd';
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
      <Form.Item label="Popularity" {...formItemLayout}>
        <Icon type="like" theme="filled" /> {get('popularity')}
      </Form.Item>
      <Form.Item label="Birth" {...formItemLayout}>
        <Text>
          {get('birthday')} in {get('place_of_birth')}
        </Text>
      </Form.Item>
      {get('deathday') && (
        <Form.Item label="Death" {...formItemLayout}>
          <Text>{get('deathday')}</Text>
        </Form.Item>
      )}
      {get('profile_path') && (
        <Form.Item label="Media" {...formItemLayout}>
          <img src={getPosterUrl(get('profile_path'))} />
        </Form.Item>
      )}
    </Form>
  );
};

export default withFading<PersonViewPureProps>(false)(styled(PersonViewPure)`
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
