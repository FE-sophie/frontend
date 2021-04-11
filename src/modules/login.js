import { push } from 'connected-react-router';
import { createAction, handleActions } from 'redux-actions';
import * as loginAPI from './api/apiLogin';

const SET_LOGIN_AND_SET_LOGOUT = 'login/SET_LOGIN_AND_SET_LOGOUT';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'login/LOGOUT_SUCCESS';
const LOGIN_AND_OUT_FAIL = 'login/LOGIN_AND_OUT_FAIL';
const GET_MEMBER_INFO = 'login/GET_MEMBER_INFO';
const FIND_INFO = 'login/FIND_INFO';
const FIND_INFO_SUCCESS = 'login/FIND_INFO_SUCCESS';
const FIND_INFO_FAIL = 'login/FIND_INFO_FAIL';
const RESET_DATA = 'login/RESET_DATA';
export const setLogInAndOut = createAction(SET_LOGIN_AND_SET_LOGOUT);
export const logInSuccess = createAction(LOGIN_SUCCESS, token => token);
export const logOutSuccess = createAction(LOGOUT_SUCCESS, message => message);
export const loginAndOutFail = createAction(LOGIN_AND_OUT_FAIL, error => error);
export const findInfo = createAction(FIND_INFO);
export const findInfoSuccess = createAction(FIND_INFO_SUCCESS, info => info);
export const findInfoFail = createAction(FIND_INFO_FAIL, info => info);
export const resetData = createAction(RESET_DATA);
export const getMemberInfo = createAction(GET_MEMBER_INFO, info => info);
const setCookie = function (name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};
var deleteCookie = function (name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
};
export const loginAuthentication = user => async dispatch => {
  dispatch(setLogInAndOut());
  try {
    const res = await loginAPI.loginAuthentication(user);
    await setCookie('auth', res.data.token, 1);
    dispatch(logInSuccess(res.data));
    dispatch(getLoginMember(res.data.token));
    dispatch(push('/'));
  } catch (error) {
    dispatch(loginAndOutFail(error));
  }
};
export const getLoginMember = authToken => async (dispatch, getState) => {
  try {
    const info = await loginAPI.getLoginMember(authToken);
    dispatch(getMemberInfo(info.data));
  } catch (error) {
    dispatch(loginAndOutFail(error));
  }
};

export const findLoginInfo = (type, info) => async dispatch => {
  dispatch(findInfo());
  try {
    const res =
      type === 'id'
        ? await loginAPI.findLoginId(info)
        : type === 'pwd'
        ? await loginAPI.findLoginPassword(info)
        : await loginAPI.changePassword(info);
    dispatch(findInfoSuccess(res.data));
    type === 'changePwd' && dispatch(resetData());
  } catch (error) {
    dispatch(findInfoFail(error));
  }
};

export const logoutAuthentication = authToken => async dispatch => {
  dispatch(setLogInAndOut());
  try {
    const res = await loginAPI.setLogout(authToken);
    deleteCookie('auth');
    dispatch(resetData());
    dispatch(logOutSuccess(res.data.message));
  } catch (error) {
    dispatch(loginAndOutFail());
  }
};
const initialize = {
  loading: false,
  data: { token: '' },
  error: null,
  member: { grade: '', name: '', cartCnt: null, uid: '', token: '' },
  message: '',
  modalOpen: false,
  findInfo: { message: 'FAIL', uid: '', email: '', member_id: '' },
};

const login = handleActions(
  {
    [SET_LOGIN_AND_SET_LOGOUT]: state => ({
      ...state,
      modalOpen: false,
      loading: true,
    }),
    [LOGIN_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        data: payload,
      };
    },
    [LOGOUT_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        message: payload,
      };
    },
    [LOGIN_AND_OUT_FAIL]: (state, { payload }) => {
      return {
        ...state,
        error: payload,
        modalOpen: true,
      };
    },
    [GET_MEMBER_INFO]: (state, { payload }) => {
      return {
        ...state,
        listShow: true,
        data: { token: payload.token },
        member: { ...state.member, ...payload },
      };
    },
    [FIND_INFO]: state => ({
      ...state,
      loading: true,
      modalOpen: false,
    }),
    [FIND_INFO_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        findInfo: payload,
      };
    },
    [FIND_INFO_FAIL]: (state, { payload }) => ({
      ...state,
      modalOpen: true,
      error: payload,
    }),
    [RESET_DATA]: state => ({
      ...state,
      loading: false,
      data: { token: '' },
      error: null,
      member: {},
      message: '',
      modalOpen: false,
      findInfo: {},
    }),
  },
  initialize,
);

export default login;
