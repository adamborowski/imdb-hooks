import React, {FunctionComponent} from 'react';
import {ProductionCountries} from '../../features/movie-browser/types/state';
import {Tag} from 'antd';

export const CountryTags: FunctionComponent<{ countries: ProductionCountries | undefined }> = ({ countries }) => (
  <>
    {(countries || []).map(value => (
      <Tag color={'#687cbe'} key={value.name}>
        {value.name}
      </Tag>
    ))}
  </>
);
