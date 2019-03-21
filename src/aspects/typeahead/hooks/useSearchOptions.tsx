import React from 'react';
import { useMappedState } from 'redux-react-hook';
import { Select } from 'antd';
import { ApiResponse } from '../../../common/api';
import _ from 'lodash';
import { DataSourceItemType } from 'antd/es/auto-complete';
import { optional } from '../../../common/utils';
import { ItemRenderer, SelectTypeAheadState } from '../types';

const { OptGroup, Option } = Select;

export const createUseSearchOptions = <Entity extends { id: number }>(
  renderOptionContent: ItemRenderer<Entity>,
  subject: string,
  selectState: SelectTypeAheadState<Entity>
) => {
  const getSearchForSubjectOption = (
    currentValue: string | undefined,
    defaultValue: string | undefined,
    total: number,
    loading: boolean
  ) => {
    const actualValue = optional(currentValue, defaultValue);

    return (
      <Option key="_go_to_search">
        {actualValue ? (
          <>
            Search for "
            <em>
              <strong>{actualValue}</strong>
            </em>
            " in all {subject}
          </>
        ) : (
          <>See most popular {subject}</>
        )}
        {!loading && <i style={{ float: 'right' }}>found {total}</i>}
      </Option>
    );
  };

  const getBestMatchesOptions = <T extends any>(options: ApiResponse<Entity>, loading: boolean) => {
    const elements = options.results.slice(0, 5).map(result => (
      <Option style={loading ? { opacity: 0.5 } : {}} value={result.id.toString()} key={result.id}>
        {renderOptionContent(result)}
      </Option>
    ));
    if (elements.length) {
      return <OptGroup key="best_matches" label="Best matches:" children={elements} />;
    }
    return undefined;
  };

  return (
    value: string | undefined, // '' means 'search nothing', undefined means get value from URL
    defaultValue: string | undefined
  ): DataSourceItemType[] => {
    const { options, loading } = useMappedState(selectState);
    const searchOption = getSearchForSubjectOption(value, defaultValue, options.total_results, loading);
    const bestMatches = getBestMatchesOptions(options, loading);
    return _.compact([searchOption, bestMatches]);
  };
};
