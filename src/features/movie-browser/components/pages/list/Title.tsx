import React, {useCallback} from 'react';
import {useMappedState} from 'redux-react-hook';
import {selectMovieListTotal} from '../../../state/selectors';
import {InlineSpinner} from '../../../../../common/components/InlineSpinner';
import {listAspect} from '../../../aspects';

export const Title = () => {
  const search = listAspect.useSearchValue();

  const mapState = useCallback(state => selectMovieListTotal(state), []);
  const total = useMappedState(mapState);

  return total === null ? (
    <InlineSpinner />
  ) : (
    <>{search ? `Found ${total} movies matching the criteria` : `Most popular movies`}</>
  );
};
