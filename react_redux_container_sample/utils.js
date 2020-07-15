import * as constants from './constants';
export const apiTypeCreator = type => {
  if (type === 'ani') {
    return constants.ANI_LIST_CONTENT_API;
  } else if (type === 'dnis') {
    return constants.DNIS_LIST_CONTENT_API;
  } else if (type === 'ip') {
    return constants.IP_LIST_CONTENT_API;
  } else if (type === 'prefix') {
    return constants.IP_LIST_CONTENT_PREFIX;
  }
  return type;
};
