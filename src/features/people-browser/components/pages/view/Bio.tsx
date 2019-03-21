import { detailsAspect } from '../../../aspects';
import React from 'react';
import { Card } from 'antd';
import { InlineSpinner } from '../../../../../common/components/InlineSpinner';

export const Bio = () => {
  const { result, loading } = detailsAspect.useDetails();

  return loading || !result ? (
    <InlineSpinner />
  ) : result!.biography ? (
    <Card>{result!.biography}</Card>
  ) : (
    <>Biography not found</>
  );
};
