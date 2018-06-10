import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA, NEW_DATA } from 'containers/HomePage/constants';
import { dataLoaded, dataLoadingError, dataAdded } from 'containers/HomePage/actions';

import request from 'utils/request';

const BASE_URL = 'http://localhost:8080';

export function* getData(action) {

  const requestURL = `${BASE_URL}/polls/data`;

  try {
    const options = {
      method: 'GET',
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      //body: JSON.stringify(action.payload),
    };
    const data = yield call(request, requestURL, options);

    yield put(dataLoaded(data.data));
  } catch (err) {
    yield put(dataLoadingError(err.response));
  }
}

export function* genrateUrl(action) {

  const requestURL = `${BASE_URL}/generate_url`;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.payload),
    };
    const data = yield call(request, requestURL, options);
    action.callback && action.callback (data);

    yield put(dataLoaded(data.data));
  } catch (err) {
    yield put(dataLoadingError(err.response));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* hompageSaga() {
  yield takeLatest(LOAD_DATA, getData);
  yield takeLatest(NEW_DATA, genrateUrl);
}
