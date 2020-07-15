import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, Card, Col, Form, Row } from 'antd';
import { Map } from 'immutable';

import { ToJS } from 'components/ToJs';
import AInput from 'components/AInput';
import ADatePicker from 'components/ADatePicker';
import {
  isValidIPAddress,
  isValidNumber,
  isAlphanumeric,
} from 'utils/regexValidations';

import { ANI_LIST_CONTENT_FORM } from './constants';

class AniListContentForm extends React.Component {
  componentWillMount() {
    this.props.initialize(
      Map({
        effective_date: moment(new Date()).format('YYYY-MM-DD'),
      }),
    );
  }
  submit = data => {
    const jsData = data.toJS();
    const { selectedRow, type } = this.props;
    if (selectedRow.id) {
      this.props.updateRequest({
        ...jsData,
        list_id: this.props.listId,
        id: selectedRow.id,
        type,
      });
    } else {
      this.props.createRequest({
        ...jsData,
        list_id: this.props.listId,
        type,
      });
    }
  };
  render() {
    const selectedRowId = this.props.selectedRow.id;
    return (
      <Form onSubmit={this.props.handleSubmit(this.submit)}>
        <Card
          style={{ marginBottom: 10, marginTop: 0, paddingTop: 2 }}
          className="card-sm"
        >
          <Row gutter={10}>
            <Col span={6}>
              <Col span={8}>
                <p className="input-label-custom">Value: </p>
              </Col>
              <Col span={16}>
                <Field
                  placeholder="Value"
                  name="list_value"
                  component={AInput}
                />
              </Col>
            </Col>
            <Col span={6}>
              <Col span={8}>
                <p className="input-label-custom">Effective: </p>
              </Col>
              <Col span={16}>
                <Field
                  placeholder="Effective"
                  name="effective_date"
                  component={ADatePicker}
                  allowClear={false}
                  showToday={false}
                />
              </Col>
            </Col>
            <Col span={6}>
              <Col span={8}>
                <p className="input-label-custom">Expires: </p>
              </Col>
              <Col span={16}>
                <Field
                  placeholder="Expires"
                  name="expiry_date"
                  component={ADatePicker}
                  allowClear={false}
                  showToday={false}
                />
              </Col>
            </Col>
            <Col span={6}>
              <Button
                style={{ float: 'right' }}
                loading={this.props.submitting}
                type={(selectedRowId && 'default') || 'primary'}
                size="default"
                htmlType="submit"
                ghost={!!selectedRowId}
              >
                {(selectedRowId && 'Modify') || 'Create'}
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    );
  }
}

AniListContentForm.propTypes = {
  selectedRow: PropTypes.object.isRequired,
  updateRequest: PropTypes.func.isRequired,
  createRequest: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  listId: PropTypes.number.isRequired,
};

// TODO: remove `no-unused-vars`
/* eslint-disable no-unused-vars */
const validate = (values, props) => {
  const errors = {};

  if (!values.get('list_value')) {
    errors.list_value = 'Required';
  }

  if (!values.get('effective_date')) {
    errors.effective_date = 'Required';
  }

  const { type } = props;
  if (type === 'ani') {
    if (!isAlphanumeric(values.get('list_value'))) {
      errors.list_value = 'Invalid';
    }
  }
  if (type === 'dnis') {
    if (!isValidNumber(values.get('list_value'))) {
      errors.list_value = 'Invalid';
    }
  }
  if (type === 'ip') {
    if (!isValidIPAddress(values.get('list_value'))) {
      errors.list_value = 'Invalid';
    }
  }
  if (type === 'prefix') {
    if (
      !isValidNumber(values.get('list_value')) ||
      values.get('list_value').length > 11
    ) {
      errors.list_value = 'Invalid';
    }
  }

  return errors;
};

const withReduxForm = reduxForm({
  form: ANI_LIST_CONTENT_FORM,
  validate,
})(AniListContentForm);

export default ToJS(withReduxForm);
