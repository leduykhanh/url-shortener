/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOGIN_ACTION,
} from './constants';

const initialState = fromJS({});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return state.set('username', action.payload.username);
    default:
      return state;
  }
}

export default loginReducer;
