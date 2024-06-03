import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";
import { postLogin } from '../../../helpers/backend_helper';
import { setAuthorization } from "../../../helpers/api_helper";

//Include Both Helper File with needed methods

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password,
    });

    if (response.type === "success") {
      yield put(loginSuccess(response));
      sessionStorage.setItem("authUser", JSON.stringify({
        data: {
          first_name: 'Admin',
          email: user.email,
        },
        token: response.token,
      }));
      // because i don't want to use dispatch
      setAuthorization(response.token);
      history('/user-manage');
    } else {
      yield put(apiError(response));
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser() {
  try {
    sessionStorage.removeItem("authUser");
    yield put(logoutUserSuccess(LOGOUT_USER, true));
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;