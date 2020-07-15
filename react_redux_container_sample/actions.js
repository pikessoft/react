/*
 *
 * AniListContents actions
 *
 */

import * as actions from './constants';

export function fetchList(params) {
  return {
    type: actions.FETCH_LIST,
    params,
  };
}

export function fetchListSuccess(payload, total) {
  return {
    type: actions.FETCH_LIST_SUCCESS,
    payload,
    total,
  };
}

export function fetchListError(error) {
  return {
    type: actions.FETCH_LIST_FAILURE,
    error,
  };
}

export function createRequest(data) {
  return {
    type: actions.CREATE_REQUEST,
    data,
  };
}

export function createSuccess(payload) {
  return {
    type: actions.CREATE_SUCCESS,
    payload,
  };
}

export function createFailure() {
  return {
    type: actions.CREATE_FAILURE,
  };
}

export function resetState() {
  return {
    type: actions.RESET_STATE,
  };
}

export function deleteRequest(params) {
  return {
    type: actions.DELETE_REQUEST,
    params,
  };
}

export function deleteSuccess(id) {
  return {
    type: actions.DELETE_SUCCESS,
    id,
  };
}

export function deleteFailure(id) {
  return {
    type: actions.DELETE_FAILURE,
    id,
  };
}

export function updateRequest(data) {
  return {
    type: actions.UPDATE_REQUEST,
    data,
  };
}

export function updateSuccess(payload) {
  return {
    type: actions.UPDATE_SUCCESS,
    payload,
  };
}

export function updateFailure() {
  return {
    type: actions.UPDATE_FAILURE,
  };
}

export function setSelectedRow(record) {
  return {
    type: actions.SET_SELECTED_ROW,
    record,
  };
}
