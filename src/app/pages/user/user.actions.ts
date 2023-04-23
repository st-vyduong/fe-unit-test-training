import ACTION_TYPES from '@app/core/constants/types';

export const getUserDetail = (payload: any) => ({
  type: ACTION_TYPES.GET_USER_DETAIL,
  payload,
});

export const getUserDetailSuccess = (data: any) => ({
  type: ACTION_TYPES.GET_USER_DETAIL_SUCCESS,
  payload: data,
});

export const getUserDetailError = (error: any) => ({
  type: ACTION_TYPES.GET_USER_DETAIL_ERROR,
  payload: error,
});

export const getUserList = () => {
  return {
    type: ACTION_TYPES.GET_USER_LIST
  };
};

export const getUserListSuccess = (data: any) => {
  return {
    type: ACTION_TYPES.GET_USER_LIST_SUCCESS,
    payload: data
  };
};

export const getUserListError = (error: any) => {
  return {
    type: ACTION_TYPES.GET_USER_LIST_ERROR,
    payload: error
  };
};
