import React from 'react';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {listAspect} from '../../../aspects';

export const Title = () => {
  const { query, total } = listAspect.useListData();

  return total === null ? (
    <InlineSpinner />
  ) : (
    <>{query ? `Found ${total} movies matching the criteria` : `Most popular movies`}</>
  );
};
