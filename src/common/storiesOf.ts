import {storiesOf as _storiesOf} from '@storybook/react';
import path from 'path';
import Module from 'module';

export const splitPath = (filepath: string) => {
  const segments = path.resolve(filepath).split(path.sep);
  const [dot, featuresOrCommon, root, ...rest] = segments;
  const storyName = rest[rest.length - 1];

  const kind = featuresOrCommon === 'common' ? featuresOrCommon : root;

  return `${kind}|${(kind === 'common' ? [root] : []).concat(rest.slice(0, -1)).join('/')}/${storyName.split('.')[0]}`;
};

export const storiesOf = (module: Module) => {
  const storyPath = (window as any).__story__name__;
  return _storiesOf(splitPath(storyPath), module);
};
