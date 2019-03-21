import {SelectDetailsState} from '../types';
import {useMappedState} from 'redux-react-hook';

export const createUseDetails = <Entity extends object>(stateSelector: SelectDetailsState<Entity>) => () =>
  useMappedState(stateSelector);
