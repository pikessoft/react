/* eslint-disable no-param-reassign,no-plusplus */
/*
 *
 * AniListContents reducer
 *
 */

import { fromJS } from 'immutable';
import moment from 'moment';

import * as actions from './constants';

export const initialState = fromJS({
  list: { loading: false, data: [], total: 0 },
  selectedRow: {},
});

function aniListContentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_LIST:
      return state
        .setIn(['list', 'loading'], true)
        .setIn(['list', 'data'], fromJS([]))
        .setIn(['list', 'total'], 0);

    case actions.FETCH_LIST_SUCCESS:
      return state
        .setIn(
          ['list', 'data'],
          fromJS(
            action.payload.map(item => ({
              ...item,
              deleteLoading: false,
              effective_date_original: item.effective_date,
              effective_date: moment(item.effective_date).format('YYYY-MM-DD'),
              expiry_date_original: item.expiry_date,
              expiry_date:
                (item.expiry_date &&
                  moment(item.expiry_date).format('YYYY-MM-DD')) ||
                '',
            })),
          ),
        )
        .setIn(['list', 'total'], action.total)
        .setIn(['list', 'loading'], false);

    case actions.FETCH_LIST_FAILURE:
      return state.setIn(['list', 'loading'], false);

    case actions.CREATE_SUCCESS:
      return state.updateIn(['list', 'data'], list =>
        list.push(
          fromJS({
            ...action.payload,
            deleteLoading: false,
            effective_date_original: action.payload.effective_date,
            effective_date: moment(action.payload.effective_date).format(
              'YYYY-MM-DD',
            ),
            expiry_date_original: action.payload.expiry_date,
            expiry_date:
              (action.payload.expiry_date &&
                moment(action.payload.expiry_date).format('YYYY-MM-DD')) ||
              '',
          }),
        ),
      );

    case actions.DELETE_REQUEST: {
      const index = state
        .getIn(['list', 'data'])
        .findIndex(item => item.get('id') === action.params.id);
      return state.updateIn(['list', 'data', index], record =>
        record.set('deleteLoading', true),
      );
    }

    case actions.DELETE_FAILURE: {
      const index = state
        .getIn(['list', 'data'])
        .findIndex(item => item.get('id') === action.id);
      return state.updateIn(['list', 'data', index], record =>
        record.set('deleteLoading', false),
      );
    }

    case actions.DELETE_SUCCESS: {
      const index = state
        .getIn(['list', 'data'])
        .findIndex(item => item.get('id') === action.id);
      return state.deleteIn(['list', 'data', index]);
    }

    case actions.UPDATE_SUCCESS: {
      const index = state
        .getIn(['list', 'data'])
        .findIndex(item => item.get('id') === action.payload.id);
      return state.updateIn(['list', 'data', index], () =>
        fromJS({
          ...action.payload,
          deleteLoading: false,
          effective_date_original: action.payload.effective_date,
          effective_date: moment(action.payload.effective_date).format(
            'YYYY-MM-DD',
          ),
          expiry_date_original: action.payload.expiry_date,
          expiry_date:
            (action.payload.expiry_date &&
              moment(action.payload.expiry_date).format('YYYY-MM-DD')) ||
            '',
        }),
      );
    }

    case actions.SET_SELECTED_ROW:
      return state.set('selectedRow', action.record);

    case actions.RESET_STATE:
      return initialState;

    default:
      return state;
  }
}

export default aniListContentsReducer;
