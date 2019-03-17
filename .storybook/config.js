import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, configure} from '@storybook/react';
import 'antd/dist/antd.min.css';

addDecorator(withKnobs);

function loadStories() {
  const requireContext = require.context('../src', true, /\.stories.[tj]sx?/);
  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
