import {IMovie} from '../../../types/state';
import React, {FunctionComponent, HTMLProps} from 'react';
import {withFading} from '../../../../../common/misc';
import {getPosterUrl} from '../../../../../common/api';
import _ from 'lodash';

export interface MovieViewPureProps extends HTMLProps<HTMLDivElement> {
  entity?: IMovie;
}

const MovieViewPure: FunctionComponent<MovieViewPureProps> = ({ entity, ...rest }) => (
  <div {...rest}>
    <img src={getPosterUrl(_.get(entity, 'poster_path'))} />
    Hello
  </div>
);

export default withFading<MovieViewPureProps>(false)(MovieViewPure);
