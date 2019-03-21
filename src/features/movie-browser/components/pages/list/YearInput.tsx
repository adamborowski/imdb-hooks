import React from 'react';
import {Form, InputNumber} from 'antd';
import {listAspect} from '../../../aspects';

export const YearInput = () => {
  const { value, enabled, onChange } = listAspect.useYearInput();

  return enabled ? (
    <Form layout="inline">
      <Form.Item label="Released">
        <InputNumber value={value} onChange={onChange} placeholder="anytime" />
      </Form.Item>
    </Form>
  ) : null;
};
