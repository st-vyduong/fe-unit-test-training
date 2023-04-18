import { AuthStorageService } from './authStorage.service';

describe('test auth service', () => {
  const authStorageService = new AuthStorageService();
  const keyLocal = 'token';
  const valueLocal = 'bearer';

  test('setToken should be called', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    authStorageService.setToken(valueLocal);
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith(keyLocal, valueLocal);
  });
  test('getToken should be called', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    authStorageService.getToken();
    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith(keyLocal);
  });
  test('removeToken should be called', () => {
    jest.spyOn(Storage.prototype, 'removeItem');
    authStorageService.removeToken();
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith(keyLocal);
  });
});
