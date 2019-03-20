import React, {useEffect, useState} from 'react';
import {Form, InputNumber} from 'antd';
import {useMovieSearchValue, useMovieYear, useSetMovieYear} from '../../routing';
import {optional} from '../../../../common/utils';
import {useDebounce} from 'react-use';

export const YearInput = () => {
  const year = useMovieYear();
  const setYear = useSetMovieYear();
  const searchValue = useMovieSearchValue();

  const [value, setValue] = useState<string | undefined>(undefined);

  const displayedValue = optional(value, year === undefined ? year : year.toString());

  useEffect(() => {
    setValue(year === undefined ? year : year.toString());
  }, [year]);

  useDebounce(
    () => {
      if (displayedValue === undefined || displayedValue === '') {
        setYear(undefined);
      } else {
        const newYearValue = parseInt(displayedValue);
        if (!isNaN(newYearValue) && newYearValue <= new Date().getFullYear() && newYearValue > 0) {
          setYear(newYearValue);
        }
      }
    },
    400,
    [value]
  );

  return searchValue ? (
    <Form layout="inline">
      <Form.Item label="Released">
        <InputNumber value={displayedValue as any} onChange={value => setValue(value as any)} placeholder="anytime" />
      </Form.Item>
    </Form>
  ) : null;
};
