import React, { FunctionComponent } from 'react';
import { Store } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

interface RootProps {
  store: Store;
}

const Root: FunctionComponent<RootProps> = ({ store, children }) => (
  <BrowserRouter>
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  </BrowserRouter>
);

export default Root;