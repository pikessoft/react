import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form/immutable';

import { initialState } from './reducer';
import {
  ANI_LIST_CONTENTS_FILTER_FORM,
  FILTER_FORM_INITIAL_VALUES,
} from './constants';

const aniListContentsDomain = state =>
  state.get('aniListContents', initialState);

export const filterFormValues = state =>
  getFormValues(ANI_LIST_CONTENTS_FILTER_FORM)(state) ||
  FILTER_FORM_INITIAL_VALUES;

export const makeSelectListLoading = () =>
  createSelector(aniListContentsDomain, state =>
    state.getIn(['list', 'loading']),
  );

export const makeSelectTotal = () =>
  createSelector(aniListContentsDomain, state =>
    state.getIn(['list', 'total']),
  );

export const makeSelectList = () =>
  createSelector(aniListContentsDomain, state => state.getIn(['list', 'data']));

export const makeSelectSelectedRow = () =>
  createSelector(aniListContentsDomain, state => state.get('selectedRow'));
