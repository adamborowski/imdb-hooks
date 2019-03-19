import React, {FunctionComponent} from 'react';
import {IMovie} from '../../features/movie-browser/types/state';
import {Tag} from 'antd';

export const CountryTags: FunctionComponent<{ countries: IMovie['production_countries'] }> = ({ countries }) => (
  <>
    {(countries || []).map(value => (
      <Tag color={'#687cbe'} key={value.name}>
        {value.name}
      </Tag>
    ))}
  </>
);
