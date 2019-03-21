import {applyMiddleware, combineReducers, compose, createStore, Middleware, Reducer, StoreEnhancer} from 'redux';
import _ from 'lodash';
import {IState} from './common/types/state';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import features from './features';
import {IPlugin} from './common/plugins';

export const rootReducerFactory = (pluginArray: IPlugin[]): Reducer<IState> => {
  const pluginReducers = pluginArray
    .map(p => p.reducers)
    .reduce(
      (finalReducers, reducers) => ({ ...finalReducers, ...reducers }),
      {}
    ) as { [p: string]: Reducer };

  return combineReducers(pluginReducers);
};

export default (preloadedState: IState) => {
  const epicMiddleware = createEpicMiddleware();

  const middlewares: Middleware[] = [epicMiddleware];

  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducerFactory(features),
    preloadedState,
    composeEnhancers(...enhancers)
  );

  const epics = _.flatten(_.compact(features.map(p => p.epics)));
  epicMiddleware.run(combineEpics(...epics));

  return store;
};
