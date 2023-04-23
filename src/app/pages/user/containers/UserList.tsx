import { RootState } from '@app/app.reducers';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList } from '../user.actions';

const UserList = () => {
  const dispatch = useDispatch();
  const { userList, isLoading, error } = useSelector((state: RootState) => state.userReducer);

  const [users, setUsers] = useState([]);

  const handleDeleteUser = (id: string | number) => {
    setUsers(users?.filter((user) => user.id !== id));
  };

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  return (
    <>
      {isLoading && <p data-testid="loading">Loading...</p>}
      <h2
        className='txt-center users-title'
        data-testid="title">
        USERS LIST
      </h2>
      {error && <p data-testid="error">Error</p>}
      {users?.length ? (
        <table className='users' data-testid="user-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Website</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </td>
                <td>{user.phone}</td>
                <td>{user.username}</td>
                <td>{user.website}</td>
                <td>
                  <button
                    data-testid={`delete-user-${user.id}`}
                    onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default UserList;
