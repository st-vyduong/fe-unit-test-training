import { environment } from './environment';

const RESOURCES = {
  auth: 'auth',
  users: environment.apiUser
};

export const ENDPOINT = {
  auth: {
    index: `${RESOURCES.auth}`,
    login: `${RESOURCES.auth}/login`
  },
  users: {
    index: `${RESOURCES.users}`
  },
};
