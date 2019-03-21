import {ReactFragment} from 'react';
import {Reducer} from 'redux';
import {Epic} from 'redux-observable';

export interface IPlugin {
  reducers?: {
    [key: string]: Reducer;
  };
  routes?: {
    main?: ReactFragment;
    header?: ReactFragment;
  };
  epics?: Epic[];
}
