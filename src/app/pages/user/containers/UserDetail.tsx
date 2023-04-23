import { RootState } from '@app/app.reducers';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetail } from '../user.actions';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail, isLoading, error } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    dispatch(getUserDetail(id));
  }, []);

  return (
    <>
      {isLoading && <p data-testid="loading">Loading...</p>}
      <h2
        className='txt-center users-title'
        data-testid="title">
        USER DETAIL
      </h2>
      {error && <p data-testid="error">Error</p>}
      {userDetail ? (
        <table className='users user-detail' data-testid="user-detail">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{userDetail.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userDetail.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{userDetail.phone}</td>
            </tr>
            <tr>
              <td>Username</td>
              <td>{userDetail.username}</td>
            </tr>
            <tr>
              <td>Website</td>
              <td>{userDetail.website}</td>
            </tr>
          </tbody>
      </table>
      ) : null}
    </>
  );
};

export default UserDetail;
