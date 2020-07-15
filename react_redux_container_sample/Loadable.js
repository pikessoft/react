/**
 *
 * Asynchronously loads the component for AniListContents
 *
 */

import Loadable from 'react-loadable';
import Loading from 'components/Loading';
import { importAsync } from 'utils/importAsync';

export default Loadable({
  loader: () => importAsync(() => import('./index')),
  loading: Loading,
});
