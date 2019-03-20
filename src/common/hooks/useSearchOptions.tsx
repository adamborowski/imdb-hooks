import React, {useCallback} from 'react';
import {useMappedState} from 'redux-react-hook';
import {Select} from 'antd';
import {IState} from '../types/state';
import {ApiResponse, getReleaseYear, getThumbUrl} from '../api';
import SearchOptionContent from '../../features/movie-browser/components/header/SearchOptionContent';
import _ from 'lodash';
import {DataSourceItemType} from 'antd/es/auto-complete';
import {optional} from '../utils';

const { OptGroup, Option } = Select;

export const getSearchForSubjectOption = (
  currentValue: string | undefined,
  defaultValue: string | undefined,
  total: number,
  loading: boolean,
  subject: string
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

export const getBestMatchesOptions = <T extends any>(options: ApiResponse<T>, loading: boolean) => {
  const elements = options.results.slice(0, 5).map(result => (
    <Option style={loading ? { opacity: 0.5 } : {}} value={result.id.toString()} key={result.id}>
      <SearchOptionContent
        rank={result.vote_average}
        avatar={getThumbUrl(result.poster_path)}
        name={result.title}
        year={getReleaseYear(result.release_date)}
      />
    </Option>
  ));
  if (elements.length) {
    return <OptGroup key="best_matches" label="Best matches:" children={elements} />;
  }
  return undefined;
};

export const useSearchOptions = <T extends any>(
  value: string | undefined, // '' means 'search nothing', undefined means get value from URL
  defaultValue: string | undefined,
  subject: string,
  selectLoading: (state: IState) => boolean,
  selectOptions: (state: IState) => ApiResponse<T>
): DataSourceItemType[] => {
  const mapState = useCallback(
    state => ({
      options: selectOptions(state),
      loading: selectLoading(state)
    }),
    []
  );
  const { options, loading } = useMappedState(mapState);
  const searchOption = getSearchForSubjectOption(value, defaultValue, options.total_results, loading, subject);
  const bestMatches = getBestMatchesOptions(options, loading);
  return _.compact([searchOption, bestMatches]);
};
