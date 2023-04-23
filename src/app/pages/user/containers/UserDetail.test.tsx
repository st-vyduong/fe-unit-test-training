import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDetail from './UserDetail';
import { UserService } from '../../../core/services/user.service';
import { renderWithProviders } from '@app/shared/utils/unitTest';

const mockErrorData = {
  response: {
    data: {
      'name':'UNAUTHORIZED',
      'status':'40101',
      'message':'Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
      'errors':['Invalid email or password.']
    }
  }
};

const mockSuccessData = {
  'id': 1,
  'name': 'Leanne Graham',
  'username': 'Bret',
  'email': 'Sincere@april.biz',
  'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
          'lat': '-37.3159',
          'lng': '81.1496'
      }
  },
  'phone': '1-770-736-8031 x56442',
  'website': 'hildegard.org',
  'company': {
      'name': 'Romaguera-Crona',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
  }
};

const mockDetailFunc = jest.spyOn(UserService.prototype, 'getUserDetail');

describe('test <UserDetail />', () => {
  test('get user detail successfully', async () => {
    mockDetailFunc.mockImplementation(() => Promise.resolve(mockSuccessData));
    renderWithProviders(<UserDetail />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('user-detail')).toBeInTheDocument());
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(mockDetailFunc).toBeCalled();
  });
  test('get user detail error', async () => {
    mockDetailFunc.mockImplementation(() => Promise.reject(mockErrorData));
    renderWithProviders(<UserDetail />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
    expect(mockDetailFunc).toBeCalled();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
