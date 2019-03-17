import styled from 'styled-components';
import { ComponentType } from 'react';
import * as _ from 'lodash';

export interface ScrollbarStyleConfiguration {
  thumb: string;
}

export type DefaultThemeNames = 'light' | 'dark';

const defaultThemes: {
  [key in DefaultThemeNames]: ScrollbarStyleConfiguration
} = {
  light: {
    thumb: 'rgba(255,255,255,0.15)'
  },
  dark: {
    thumb: 'rgba(0,0,0,0.15)'
  }
};

const withSublimeScrollbar = (
  theme: ScrollbarStyleConfiguration | DefaultThemeNames = 'light'
) => {
  const actual: ScrollbarStyleConfiguration = _.isString(theme)
    ? defaultThemes[theme]
    : theme;

  return <P extends object>(c: ComponentType<P>) =>
    (styled(c)`
      ::-webkit-scrollbar {
        width: 22px;
      }
      ::-webkit-scrollbar-thumb {
        border: 6px solid transparent;
        border-radius: 30px;
        background-clip: padding-box;

        background-color: ${actual.thumb};
      }
    ` as unknown) as ComponentType<P>;
}; // todo fix
export default withSublimeScrollbar;
