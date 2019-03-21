import React, {FunctionComponent} from 'react';
import {Store} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {StoreContext} from 'redux-react-hook';
import {ThemeProvider} from 'styled-components';
import baseTheme from '../../../common/components/antd/app-theme';

interface RootProps {
  store: Store;
}

const Root: FunctionComponent<RootProps> = ({ store, children }) => (
  <BrowserRouter basename="/imdb-hooks">
    <ThemeProvider theme={baseTheme}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </ThemeProvider>
  </BrowserRouter>
);

export default Root;
