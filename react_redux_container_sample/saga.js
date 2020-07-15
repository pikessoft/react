import { startSubmit, stopSubmit, initialize } from 'redux-form';
import { put, takeLatest, all } from 'redux-saga/effects';
import { Map } from 'immutable';
import { message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { throwServerError } from 'subscriber/utils/throwServerError';

import * as actions from './actions';
import * as constants from './constants';
import { apiTypeCreator } from './utils';
import { LIST_NAMES } from '../AniLists/constants';

function* workerFetchContentList(action) {
  const apiType = apiTypeCreator(action.params.list_type);
  try {
    const response = yield axios.get(apiType, {
      params: action.params,
    });
    const records = (response.data && response.data.data) || [];
    yield put(actions.fetchListSuccess(records, response.data.total));
  } catch (error) {
    yield put(actions.fetchListError(error.message));
    throwServerError(error);
  }
}

function* workerCreateAniListContent(action) {
  const listType = `list_${(action.data.type === 'dnis' && 'dni') ||
    action.data.type}`;
  const apiType = apiTypeCreator(action.data.type);
  try {
    yield put(startSubmit(constants.ANI_LIST_CONTENT_FORM));
    const response = yield axios.post(apiType, {
      [listType]: action.data,
    });
    yield put(actions.createSuccess(response.data));
    yield put(
      initialize(
        constants.ANI_LIST_CONTENT_FORM,
        Map({ effective_date: moment(new Date()).format('YYYY-MM-DD') }),
      ),
    );
    yield put(stopSubmit(constants.ANI_LIST_CONTENT_FORM));
    message.success(`${LIST_NAMES[action.data.type]} List Content created.`);
  } catch (error) {
    yield put(stopSubmit(constants.ANI_LIST_CONTENT_FORM));
    throwServerError(error);
  }
}

function* workerDeleteAniListContent(action) {
  const apiType = apiTypeCreator(action.params.type);
  try {
    yield axios.delete(`${apiType}/${action.params.id}`);
    yield put(actions.deleteSuccess(action.params.id));
    yield put(actions.setSelectedRow(Map({})));
    yield put(
      initialize(
        constants.ANI_LIST_CONTENT_FORM,
        Map({ effective_date: moment(new Date()).format('YYYY-MM-DD') }),
      ),
    );
    message.success(`${LIST_NAMES[action.params.type]} List Content deleted.`);
  } catch (error) {
    yield put(actions.deleteFailure(action.id));
    throwServerError(error);
  }
}

function* workerUpdateAniListContent(action) {
  const apiType = apiTypeCreator(action.data.type);
  try {
    yield put(startSubmit(constants.ANI_LIST_CONTENT_FORM));

    const response = yield axios.put(
      `${apiType}/${action.data.id}`,
      action.data,
    );
    yield put(stopSubmit(constants.ANI_LIST_CONTENT_FORM));
    message.success(`${LIST_NAMES[action.data.type]} List Content updated.`);

    yield put(actions.updateSuccess(response.data));
  } catch (error) {
    yield put(stopSubmit(constants.ANI_LIST_CONTENT_FORM));
    throwServerError(error);
  }
}

function* watchAll() {
  yield all([
    takeLatest(constants.FETCH_LIST, workerFetchContentList),
    takeLatest(constants.CREATE_REQUEST, workerCreateAniListContent),
    takeLatest(constants.DELETE_REQUEST, workerDeleteAniListContent),
    takeLatest(constants.UPDATE_REQUEST, workerUpdateAniListContent),
  ]);
}

export default watchAll;
