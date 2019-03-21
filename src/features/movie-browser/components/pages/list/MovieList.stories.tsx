import React from 'react';
import { centeredDecorator, routerDecorator, storiesOf } from '../../../../../common/storybook-utils';
import { MovieListPure } from './MovieList';
import { IListItem, IListItems } from '../../../../../common/aspects/list/types';
import { IMovieLite } from '../../../types/state';
import _ from 'lodash';

const itemFactory = () => {
  let c = 0;
  return {
    item: (): IListItem<IMovieLite> => {
      c++;
      return {
        error: undefined,
        loading: false,
        result: {
          title: 'movie ' + c,
          release_date: '2013-02-04'
        } as IMovieLite
      };
    },
    err: (): IListItem<IMovieLite> => {
      c++;
      return { error: 'some error', loading: false, result: undefined };
    },
    loading: (): IListItem<IMovieLite> => {
      c++;
      return { error: undefined, loading: true, result: undefined };
    }
  };
};

const gen = itemFactory();
const allLoaded: IListItems<IMovieLite> = _.range(0, 300).map(gen.item);

const gen2 = itemFactory();
const halfLoaded: IListItems<IMovieLite> = [..._.range(0, 20).map(gen2.item), ..._.range(0, 280).map(gen2.loading)];

storiesOf(module)
  .addDecorator(routerDecorator())
  .addDecorator(centeredDecorator)
  .add('default', () => <MovieListPure itemData={allLoaded} itemCount={300} />)
  .add('20 first loaded', () => <MovieListPure itemData={halfLoaded} itemCount={300} />);
