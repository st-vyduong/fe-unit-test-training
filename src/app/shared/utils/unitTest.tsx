import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import appReducer from '@app/app.reducers';
import appMiddleware from '../../app.middleware';

const store = createStore(appReducer, applyMiddleware(createSagaMiddleware()));
const middleware = createSagaMiddleware();
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: typeof store;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  { store = createStore(appReducer, applyMiddleware(middleware, logger)), ...renderOptions }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => {
    middleware.run(appMiddleware);
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
