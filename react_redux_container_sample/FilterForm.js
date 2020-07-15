import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Card, Col, Form, Row, Select } from 'antd';

import ReduxPagination from 'components/ReduxPagination';
import ExportFile from 'components/ExportFile';
import UploadFile from 'components/UploadFile';

import { ToJS } from 'components/ToJs';
import ASelect from 'components/ASelect';
import ASearch from 'components/ASearch';
import {
  ANI_LIST_CONTENTS_FILTER_FORM,
  FILTER_FORM_INITIAL_VALUES,
  EXPORT_API_URL,
  UPLOAD_API_URL,
} from './constants';
import { LIST_NAMES } from '../AniLists/constants';

const { Option } = Select;

class FilterForm extends React.Component {
  componentWillMount() {
    const { initialize } = this.props;
    initialize(FILTER_FORM_INITIAL_VALUES);
  }

  // this function expect an array of lower case strings
  // returns error string
  // error === null => valid otherwise invalid
  validateFile = headers => {
    let error = null;
    const validHeaders = new Set([
      'value',
      'listvalue',
      'list_value',
      'list value',
      'effective',
      'effective date',
      'effectivedate',
      'effective_date',
      'expires',
      'expirydate',
      'expiry date',
      'expiry_date',
    ]);
    if (headers.length > 3 || headers.length < 2) {
      error = 'Invalid number of columns.';
    } else if (headers.length === 2) {
      if (!headers.every(h => validHeaders.has(h))) {
        error = `'Value' and 'Effective Date' must be included.`;
      }
    } else if (
      !headers.includes('expires') &&
      !headers.includes('expiry_date') &&
      !headers.includes('expirydate') &&
      !headers.includes('expiry date')
    ) {
      error = `'Expiry Date' is not present in the columns.`;
    }
    return error;
  };

  render() {
    const {
      change,
      filterFormValues,
      total,
      type,
      listId,
      fetchList,
    } = this.props;
    return (
      <Form onSubmit={() => {}}>
        <Card
          style={{ marginBottom: 10, marginTop: 0, paddingTop: 4 }}
          className="card-sm"
        >
          <Row gutter={10}>
            <Col md={9} xl={7}>
              <Col span={5}>
                <Field
                  name="pageSize"
                  component={ASelect}
                  size="default"
                  onSelect={value => {
                    change('currentPage', 1);
                    fetchList({
                      list_id: listId,
                      list_type: type,
                      page: 1,
                      per_page: value,
                      search: filterFormValues.searchQuery,
                    });
                  }}
                >
                  <Option value={5}>5</Option>
                  <Option value={10}>10</Option>
                  <Option value={15}>15</Option>
                  <Option value={20}>20</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                </Field>
              </Col>
              <Col span={17}>
                <Field
                  placeholder="Search"
                  name="searchQuery"
                  component={ASearch}
                  onChange={e => {
                    change('currentPage', 1);
                    fetchList({
                      list_id: listId,
                      list_type: type,
                      page: 1,
                      per_page: filterFormValues.pageSize,
                      search: e.target.value,
                    });
                  }}
                />
              </Col>
            </Col>

            <UploadFile
              buttonStyle={{ float: 'right', marginRight: 4 }}
              api={UPLOAD_API_URL}
              title={`Upload ${LIST_NAMES[type]} List Contents`}
              params={{
                'upload[upload_type]': `list_${type}`,
                'upload[list_id]': this.props.listId,
              }}
              sampleSrc="https://api-dev.peeredge.com/sample_list.csv"
              validate={this.validateFile}
              uploadedMessage="The list is being uploaded. Please check Tools >> Upload Status for updates."
            />
            <ExportFile
              buttonStyle={{ float: 'right', marginRight: 10 }}
              api={EXPORT_API_URL}
              params={{
                list_type: `list_${type}`,
                list_id: this.props.listId, // todo: change this with listId
              }}
              title={`Export ${LIST_NAMES[type]} List Contents`}
              exportNameRequired
            />
            <Field
              name="currentPage"
              style={{ float: 'right', marginRight: 10 }}
              component={ReduxPagination}
              total={total}
              pageSize={filterFormValues.pageSize}
              onChange={(e, page) => {
                fetchList({
                  list_id: listId,
                  list_type: type,
                  page,
                  per_page: filterFormValues.pageSize,
                  search: filterFormValues.searchQuery,
                });
              }}
              smallOnIPad
            />
          </Row>
        </Card>
      </Form>
    );
  }
}

FilterForm.propTypes = {
  change: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  fetchList: PropTypes.func.isRequired,
  filterFormValues: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  listId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const withReduxForm = reduxForm({
  form: ANI_LIST_CONTENTS_FILTER_FORM,
})(FilterForm);

export default ToJS(withReduxForm);
