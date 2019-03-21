import { storiesOf as _storiesOf, StoryDecorator } from '@storybook/react';
import path from 'path';
import Module from 'module';
import styled from 'styled-components';
import * as React from 'react';
import { MemoryRouter, RouterProps } from 'react-router';

export const splitPath = (filepath: string) => {
  const segments = path.resolve(filepath).split(path.sep);
  const [dot, featuresOrCommon, root, ...rest] = segments;
  const storyName = rest[rest.length - 1]||'';
  const isNotFeature = featuresOrCommon!=='features';
  const kind = (isNotFeature ? featuresOrCommon : root).split('-').join(' ');

  return `${kind}|${(isNotFeature? [root] : []).concat(rest.slice(0, -1)).join('/')}/${storyName.split('.')[0]}`;
};

export const storiesOf = (module: Module) => {
  const storyPath = (window as any).__story__name__;
  return _storiesOf(splitPath(storyPath), module);
};

const Centered = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const centeredDecorator: StoryDecorator = story => <Centered>{story()}</Centered>;

export const routerDecorator = (props?: RouterProps): StoryDecorator => story => (
  <MemoryRouter {...props}>{story()}</MemoryRouter>
);
