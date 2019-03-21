import React from 'react';
import { storiesOf } from '../../../../../common/storybook-utils';
import MovieViewPure from './MovieViewPure';
import { number, text } from '@storybook/addon-knobs';
import { IMovie } from '../../../types/state';
import DefaultPrimaryContent from '../../../../../common/components/antd/DefaultPrimaryContent';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../../../../../common/components/antd/app-theme';

storiesOf(module)
  .addDecorator(story => <DefaultPrimaryContent content={story()} title="Movie View Pure" />)
  .addDecorator(story => (
    <ThemeProvider theme={baseTheme}>
      <>{story()}</>
    </ThemeProvider>
  ))
  .add('default', () => (
    <MovieViewPure
      loading={false}
      entity={
        ({
          tagline: text('tagline', 'The tagline of a movie. It can be couple sentences.'),
          genres: [
            { name: 'Comedy', id: 'comedy' },
            { name: 'Drama', id: 'drama' },
            { name: 'Adventure', id: 'adventure' }
          ],
          production_countries: [
            { name: 'Poland' },
            { name: 'Germany' },
            { name: 'Belarus' },
            { name: 'United States' }
          ],
          vote_average: number('rank', 4.6),
          vote_count: 2546,
          popularity: 234,
          release_date: '2017-09-22',
          overview:
            'Brianne Sidonie Desaulniers (born October 1, 1989), known professionally as Brie Larson, is an American actress, director, and singer. Born in Sacramento, California, Larson was home-schooled before she studied acting at the American Conservatory Theater. She began her acting career in television, appearing as a regular on the 2001 sitcom Raising Dad, for which she was nominated for a Young Artist Award. As a teenager, Larson had brief roles in the 2004 films 13 Going on 30 and Sleepover. '
        } as unknown) as IMovie
      }
    />
  ))
  .add('loading', () => <MovieViewPure loading />);
