/**
 *
 * AniListContents
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators as _ } from 'redux';
import { Col, Row, Table } from 'antd';
import { initialize } from 'redux-form/immutable';
import { Map } from 'immutable';
import moment from 'moment';

import { ToJS } from 'components/ToJs';
import injectSaga from 'subscriber/utils/injectSaga';
import injectReducer from 'subscriber/utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { Columns } from './columns';
import * as selectors from './selectors';
import * as actions from './actions';
import FilterForm from './FilterForm';
import AniListContentForm from './AniListContentForm';
import { ANI_LIST_CONTENT_FORM, FILTER_FORM_INITIAL_VALUES } from './constants';
import { DATE_PICKER_CLASSES } from '../../appConstants';
import { LIST_NAMES } from '../AniLists/constants';

export class AniListContents extends React.Component {
  componentDidMount() {
    const { listId, type } = this.props;
    this.props.fetchList({
      list_id: listId,
      list_type: type,
      page: FILTER_FORM_INITIAL_VALUES.get('currentPage'),
      per_page: FILTER_FORM_INITIAL_VALUES.get('pageSize'),
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      listLoading,
      list,
      selectedRow,
      setSelectedRow,
      initializeForm,
      type,
    } = this.props;
    return (
      <div>
        <Row gutter={20}>
          <Col span={24}>
            <h3>{LIST_NAMES[type]} List Contents</h3>
            <AniListContentForm {...this.props} />
      	    <FilterForm {...this.props} />
            <Table
		loading={listLoading}
		columns={Columns(this)}
		scroll={{ y: 350 }}
		dataSource={list}
		size="small"
		rowKey="id"
		pagination={false}
		rowClassName={record =>
		  record.id === selectedRow.id ? 'select-row' : ''
		}
		onRow={record => ({
		  onClick: e => {
		    if (e.target.tagName !== 'TD') return;
		    if (record.id !== selectedRow.id) {
		      setSelectedRow(record);
		      initializeForm(ANI_LIST_CONTENT_FORM, Map(record));
		    } else {
		      setSelectedRow({});
		      initializeForm(ANI_LIST_CONTENT_FORM, Map({}));
		    }
		  },
		})}
	     />
          </Col>
        </Row>
      </div>
    );
  }
}

AniListContents.propTypes = {
  filterFormValues: PropTypes.object.isRequired,
  setSelectedRow: PropTypes.func.isRequired,
  initializeForm: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  selectedRow: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  updateRequest: PropTypes.func.isRequired,
  listLoading: PropTypes.bool.isRequired,
  resetState: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  listId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  selectedRow: selectors.makeSelectSelectedRow()(state),
  listLoading: selectors.makeSelectListLoading()(state),
  filterFormValues: selectors.filterFormValues(state),
  total: selectors.makeSelectTotal()(state),
  list: selectors.makeSelectList()(state),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedRow: _(actions.setSelectedRow, dispatch),
    createRequest: _(actions.createRequest, dispatch),
    deleteRequest: _(actions.deleteRequest, dispatch),
    updateRequest: _(actions.updateRequest, dispatch),
    resetState: _(actions.resetState, dispatch),
    fetchList: _(actions.fetchList, dispatch),
    initializeForm: _(initialize, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'aniListContents',
  reducer,
});
const withSaga = injectSaga({ key: 'aniListContents', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ToJS(AniListContents));
