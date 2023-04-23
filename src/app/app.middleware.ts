import { all } from 'redux-saga/effects';

import { watchAuth } from '@app/core/auth/auth.middleware';
import { watchUsers } from './pages/user/user.middlewares';

export default function* appMiddleware() {
  yield all([
    watchAuth(),
    watchUsers()
  ]);
}
