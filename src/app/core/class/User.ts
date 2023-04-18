import { AuthStorageService } from '../services/authStorage.service';

export class User {

  login() {
    const authService = new AuthStorageService();
    authService.setToken('token');
  }

  logout() {
    const authService = new AuthStorageService();
    authService.removeToken();
  }
}
