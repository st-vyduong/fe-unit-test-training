import React from 'react';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserService } from '../../../core/services/user.service';
import { renderWithProviders } from '@app/shared/utils/unitTest';
import UserList from './UserList';

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

const mockSuccessData = [{
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
}];

const mockListFunc = jest.spyOn(UserService.prototype, 'getUserList');
const mockUseNavigate = jest.fn();
const mockValue = { hash: '' };
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate, // mock hook return function
  useLocation: () => mockValue // mock hook return value
}));

describe('test <UserList />', () => {
  test('get user list successfully', async () => {
    mockListFunc.mockImplementation(() => Promise.resolve(mockSuccessData));
    renderWithProviders(<UserList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('user-list')).toBeInTheDocument());
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(mockListFunc).toBeCalled();
  });
  test('get user list failed', async () => {
    mockListFunc.mockImplementation(() => Promise.reject(mockErrorData));
    renderWithProviders(<UserList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('error')).toBeInTheDocument());
    expect(mockListFunc).toBeCalled();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
  test('user detail link is correct', async () => {
    mockListFunc.mockImplementation(() => Promise.resolve(mockSuccessData));
    renderWithProviders(<UserList />);
    await waitFor(() => expect(screen.getByTestId('user-list')).toBeInTheDocument());
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/users/1');
  });
  test('function delete user', async () => {
    mockListFunc.mockImplementation(() => Promise.resolve(mockSuccessData));
    renderWithProviders(<UserList />);
    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
  });
});
