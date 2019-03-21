import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, configure} from '@storybook/react';
import 'antd/dist/antd.min.css';

addDecorator(withKnobs);

function loadStories() {
  const requireContext = require.context('../src', true, /\.stories.[tj]sx?/);
  requireContext.keys().forEach(filename => {
    // we need to some hacking as module id is a number in production! see storybook storybook-utils for usage
    (window as any).__story__name__ = filename;

    requireContext(filename);
  });
}

configure(loadStories, module);
