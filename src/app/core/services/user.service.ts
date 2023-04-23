import { ENDPOINT } from '@config/endpoint';
import { ApiService } from './api.service';

export class UserService {
  http = new ApiService();

  // eslint-disable-next-line
  constructor() {}

  getUserList() {
    return this.http.get([`${ENDPOINT.users.index}`]);
  }

  getUserDetail(id: string | number) {
    return this.http.get([`${ENDPOINT.users.index}/${id}`]);
  }
}
