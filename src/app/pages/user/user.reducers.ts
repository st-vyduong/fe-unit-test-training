import ACTION_TYPES from '@app/core/constants/types';

interface IAction {
  type: string,
  payload: any
}

interface IStateData {
  userList: any,
  userDetail: any
  isLoading: boolean;
  error: string;
  hasError: boolean;
}

const IInitUserProps = {
  userList: null,
  userDetail: null,
  isLoading: false,
  hasError: false,
  error: '',
};

export const userReducer = (
  state: IStateData = IInitUserProps,
  action: IAction
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_USER_LIST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_TYPES.GET_USER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userList: action.payload,
      };

    case ACTION_TYPES.GET_USER_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    case ACTION_TYPES.GET_USER_DETAIL:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_TYPES.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userDetail: action.payload,
      };

    case ACTION_TYPES.GET_USER_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
