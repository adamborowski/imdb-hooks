import React, {useEffect, useState} from 'react';
import {optional} from '../../../utils';
import {useDebounce} from 'react-use';
import {UseSetYear, UseYear} from '../types';
import {UseValue} from '../../../types/hooks';

export const createUseYearInput = (useYear: UseYear, useSetYear: UseSetYear, useSearchValue: UseValue) => {
  return () => {
    const year = useYear();
    const setYear = useSetYear();
    const searchValue = useSearchValue();

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

    return { enabled: !!searchValue, value: displayedValue as any, onChange: (value: any) => setValue(value as any) };
  };
};
