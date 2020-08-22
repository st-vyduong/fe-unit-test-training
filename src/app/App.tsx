import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';

import { Footer, Header } from '@shared/components/layout/index';
import appRoutes from './app.routes';
import appMiddleware from './app.middleware';
import appReducer from './app.reducers';

const middleware = createSagaMiddleware();
const store = createStore(
  appReducer,
  applyMiddleware(middleware, logger)
);

middleware.run(appMiddleware);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        {
          appRoutes.map((route: any, index: number) => (
            <Route
              key={index}
              path={route.path}
              element={<route.element />}
            >
              {
                route?.children?.map((subRoute: any, subIndex: number) => (
                  <Route
                    key={subIndex}
                    path={subRoute.path}
                    element={<subRoute.element />}
                  />
                ))
              }
            </Route>
          ))
        }
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
