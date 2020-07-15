/*
 *
 * AniListContents constants
 *
 */

import { Map } from 'immutable';

export const FETCH_LIST = 'app/AniListContents/FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'app/AniListContents/FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'app/AniListContents/FETCH_LIST_FAILURE';

export const CREATE_REQUEST = 'app/AniListContents/CREATE_REQUEST';
export const CREATE_SUCCESS = 'app/AniListContents/CREATE_SUCCESS';
export const CREATE_FAILURE = 'app/AniListContents/CREATE_FAILURE';

export const DELETE_REQUEST = 'app/AniListContents/DELETE_REQUEST';
export const DELETE_SUCCESS = 'app/AniListContents/DELETE_SUCCESS';
export const DELETE_FAILURE = 'app/AniListContents/DELETE_FAILURE';

export const UPDATE_REQUEST = 'app/AniListContents/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'app/AniListContents/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'app/AniListContents/UPDATE_FAILURE';

export const SET_SELECTED_ROW = 'app/AniListContents/SET_SELECTED_ROW';

export const RESET_STATE = 'app/AniListContents/RESET_STATE';

export const ANI_LIST_CONTENT_FORM = 'AniListContentForm';
export const ANI_LIST_CONTENTS_FILTER_FORM = 'AniListContentsFilterForm';

export const FILTER_FORM_INITIAL_VALUES = Map({
  searchQuery: '',
  currentPage: 1,
  pageSize: 10,
});

// network
export const ANI_LIST_CONTENT_API = '/list_anis';
export const DNIS_LIST_CONTENT_API = '/list_dnis';
export const IP_LIST_CONTENT_API = '/list_ips';
export const IP_LIST_CONTENT_PREFIX = '/list_prefixes';

export const EXPORT_API_URL = '/export_list_contents';
export const UPLOAD_API_URL = '/uploads';
