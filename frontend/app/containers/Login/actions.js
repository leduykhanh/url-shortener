/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_ACTION
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginAction(username, password) {
  return {
    type: LOGIN_ACTION,
    payload: {username, password}
  };
}
