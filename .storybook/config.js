import { configure } from '@storybook/react';

function loadStories() {
  const requireContext = require.context('../src', true, /\.stories.[tj]sx?/);
  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
